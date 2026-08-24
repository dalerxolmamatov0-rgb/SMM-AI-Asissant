let googleTokenClient = null;
let googleClientId = "1084877712345-gsiwebclientappforaismm.apps.googleusercontent.com";

function initAuth() {
  const token = API.getToken();
  if (token) {
    API.getMe().then(user => {
      API.setUser(user);
      updateAuthUI(true, user);
      refreshUsage();
    }).catch(() => {
      API.clearToken();
      updateAuthUI(false);
    });
  } else {
    updateAuthUI(false);
  }

  // Bind Form Submit Handlers
  document.getElementById("loginForm")?.addEventListener("submit", handleLoginSubmit);
  document.getElementById("registerForm")?.addEventListener("submit", handleRegisterSubmit);
  document.getElementById("google-login")?.addEventListener("click", handleGoogleLogin);
  document.getElementById("btnLogout")?.addEventListener("click", handleLogout);

  // Initialize Google Identity Services (GIS)
  initGoogleGIS();
}

/**
 * Initialize Google Identity Services (GIS)
 */
async function initGoogleGIS() {
  try {
    const res = await fetch("/api/auth/config");
    if (res.ok) {
      const cfg = await res.json();
      if (cfg && cfg.google_client_id) {
        googleClientId = cfg.google_client_id;
      }
    }
  } catch (e) {
    // fallback to default
  }

  setupGoogleGISLibrary();
}

function setupGoogleGISLibrary() {
  if (typeof google !== "undefined" && google.accounts) {
    try {
      // 1. Google ID One Tap & Credential response
      google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleGISCredential,
        auto_select: false,
        cancel_on_tap_outside: true
      });

      // 2. Render official Google buttons if containers exist
      const loginBtnContainer = document.getElementById("googleGisLoginBtn");
      if (loginBtnContainer) {
        google.accounts.id.renderButton(loginBtnContainer, {
          theme: "filled_black",
          size: "large",
          shape: "pill",
          text: "continue_with",
          width: 320
        });
      }

      const regBtnContainer = document.getElementById("googleGisRegisterBtn");
      if (regBtnContainer) {
        google.accounts.id.renderButton(regBtnContainer, {
          theme: "filled_black",
          size: "large",
          shape: "pill",
          text: "continue_with",
          width: 320
        });
      }

      // 3. OAuth 2.0 Token Client with prompt: 'select_account'
      if (google.accounts.oauth2) {
        googleTokenClient = google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: "openid email profile",
          prompt: "select_account",
          callback: async (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
              await fetchGoogleUserInfo(tokenResponse.access_token);
            } else if (tokenResponse && tokenResponse.error) {
              handleGoogleAuthError(tokenResponse.error);
            }
          },
          error_callback: (err) => {
            handleGoogleAuthError(err);
          }
        });
      }
    } catch (err) {
      console.warn("Google GIS init:", err);
    }
  } else {
    // Retry loading GIS SDK
    setTimeout(setupGoogleGISLibrary, 800);
  }
}

/**
 * Handle Google Login Button Click
 */
function handleGoogleLogin() {
  setGoogleButtonLoading(true);

  if (googleTokenClient) {
    try {
      googleTokenClient.requestAccessToken({ prompt: "select_account" });
    } catch (err) {
      handleGoogleAuthError(err);
      setGoogleButtonLoading(false);
    }
  } else if (typeof google !== "undefined" && google.accounts && google.accounts.id) {
    try {
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setGoogleButtonLoading(false);
        }
      });
    } catch (err) {
      handleGoogleAuthError(err);
      setGoogleButtonLoading(false);
    }
  } else {
    showToast("Google xizmati yuklanmoqda, iltimos qayta urinib ko'ring", "info");
    setGoogleButtonLoading(false);
  }
}

function setGoogleButtonLoading(isLoading) {
  const loginBtn = document.getElementById("btnGoogleAuthLogin");
  const regBtn = document.getElementById("btnGoogleAuthRegister");
  const loginText = document.getElementById("googleLoginBtnText");
  const regText = document.getElementById("googleRegisterBtnText");

  if (isLoading) {
    if (loginBtn) loginBtn.disabled = true;
    if (regBtn) regBtn.disabled = true;
    if (loginText) loginText.innerText = "Google ochilmoqda...";
    if (regText) regText.innerText = "Google ochilmoqda...";
  } else {
    if (loginBtn) loginBtn.disabled = false;
    if (regBtn) regBtn.disabled = false;
    if (loginText) loginText.innerText = "Google orqali davom etish";
    if (regText) regText.innerText = "Google orqali davom etish";
  }
}

function handleGoogleAuthError(err) {
  setGoogleButtonLoading(false);
  console.log("Google Auth error:", err);
  if (err === "popup_closed_by_user" || (err && err.type === "popup_closed")) {
    showToast("Google orqali kirish bekor qilindi", "info");
  } else if (err === "access_denied") {
    showToast("Google akkauntiga ruxsat berilmadi", "error");
  } else {
    showToast("Google orqali kirishda xatolik yuz berdi. Qayta urinib ko'ring.", "error");
  }
}

/**
 * Handle Google One-Tap / ID Token Callback
 */
async function handleGoogleGISCredential(response) {
  if (response && response.credential) {
    try {
      setGoogleButtonLoading(true);
      await executeGoogleLogin({ credential: response.credential });
    } catch (err) {
      handleGoogleAuthError(err);
    } finally {
      setGoogleButtonLoading(false);
    }
  }
}

/**
 * Fetch Google Profile via UserInfo endpoint after token received
 */
async function fetchGoogleUserInfo(accessToken) {
  try {
    setGoogleButtonLoading(true);
    showToast("Google hisobingiz tasdiqlanmoqda... ⏳", "info");
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (res.ok) {
      const profile = await res.json();
      await executeGoogleLogin({
        email: profile.email,
        name: profile.name || profile.given_name || profile.email.split("@")[0],
        avatar_url: profile.picture
      });
    } else {
      throw new Error("Google ma'lumotlarini olib bo'lmadi");
    }
  } catch (err) {
    handleGoogleAuthError(err);
  } finally {
    setGoogleButtonLoading(false);
  }
}

/**
 * Open Email/Password Auth Modal with specific mode
 * @param {'login'|'register'} mode 
 */
function showAuthModal(mode = "login") {
  const modal = document.getElementById("authModal");
  const loginView = document.getElementById("authModalLogin");
  const regView = document.getElementById("authModalRegister");
  
  if (!modal) return;
  modal.classList.remove("hidden");
  
  if (mode === "register") {
    loginView?.classList.add("hidden");
    regView?.classList.remove("hidden");
  } else {
    loginView?.classList.remove("hidden");
    regView?.classList.add("hidden");
  }
}

function closeAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) modal.classList.add("hidden");
}

/**
 * Handle Login Form Submit
 */
async function handleLoginSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById("loginEmail");
  const passInput = document.getElementById("loginPassword");
  const submitBtn = document.getElementById("btnLoginSubmit");

  const email = emailInput?.value.trim();
  const password = passInput?.value;

  if (!email || !password) {
    showToast("Elektron pochta va parolni kiriting", "error");
    return;
  }

  // Loading state
  const originalBtnContent = submitBtn ? submitBtn.innerHTML : "";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Kirilmoqda...
    `;
  }

  try {
    const data = await API.login({ email, password });
    API.setToken(data.access_token);
    API.setUser(data.user);
    
    closeAuthModal();
    updateAuthUI(true, data.user);
    refreshUsage();
    showToast(`Xush kelibsiz, ${data.user.name}! 👋`, "success");

    // Clear form
    if (emailInput) emailInput.value = "";
    if (passInput) passInput.value = "";
  } catch (err) {
    // Handled by API.request
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }
  }
}

/**
 * Handle Register Form Submit
 */
async function handleRegisterSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("registerName");
  const emailInput = document.getElementById("registerEmail");
  const passInput = document.getElementById("registerPassword");
  const confirmPassInput = document.getElementById("registerConfirmPassword");
  const submitBtn = document.getElementById("btnRegisterSubmit");
  const errorText = document.getElementById("registerPasswordError");

  const name = nameInput?.value.trim();
  const email = emailInput?.value.trim();
  const password = passInput?.value;
  const confirmPassword = confirmPassInput?.value;

  if (errorText) {
    errorText.classList.add("hidden");
    errorText.innerText = "";
  }

  // Client-side Validations
  if (!name || name.length < 2) {
    showToast("Ismingiz kamida 2 ta belgidan iborat bo'lishi kerak", "error");
    nameInput?.focus();
    return;
  }

  if (!email || !email.includes("@")) {
    showToast("To'g'ri elektron pochta manzilini kiriting", "error");
    emailInput?.focus();
    return;
  }

  if (!password || password.length < 8) {
    const msg = "Parol kamida 8 ta belgidan iborat bo'lishi kerak";
    if (errorText) {
      errorText.innerText = msg;
      errorText.classList.remove("hidden");
    }
    showToast(msg, "error");
    passInput?.focus();
    return;
  }

  if (password !== confirmPassword) {
    const msg = "Parol va tasdiqlash paroli bir xil emas!";
    if (errorText) {
      errorText.innerText = msg;
      errorText.classList.remove("hidden");
    }
    showToast(msg, "error");
    confirmPassInput?.focus();
    return;
  }

  // Loading state
  const originalBtnContent = submitBtn ? submitBtn.innerHTML : "";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Ro'yxatdan o'tilmoqda...
    `;
  }

  try {
    const data = await API.register({
      name,
      email,
      password,
      confirm_password: confirmPassword
    });
    API.setToken(data.access_token);
    API.setUser(data.user);

    closeAuthModal();
    updateAuthUI(true, data.user);
    refreshUsage();
    showToast("Ro'yxatdan muvaffaqiyatli o'tdingiz! Oyiga 10 ta AI generatsiya tayyor 🎉", "success");

    // Clear form
    if (nameInput) nameInput.value = "";
    if (emailInput) emailInput.value = "";
    if (passInput) passInput.value = "";
    if (confirmPassInput) confirmPassInput.value = "";
  } catch (err) {
    // Handled by API.request
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }
  }
}

/**
 * Execute Google Auth API Call to Backend
 */
async function executeGoogleLogin(payload) {
  try {
    const data = await API.googleAuth(payload);
    API.setToken(data.access_token);
    API.setUser(data.user);

    closeAuthModal();
    updateAuthUI(true, data.user);
    refreshUsage();
    showToast(`Google orqali muvaffaqiyatli kirdingiz, ${data.user.name}! 🚀`, "success");
  } catch (err) {
    // Handled by API.request
  }
}

/**
 * Show Logout Confirmation Modal
 */
function handleLogout() {
  showLogoutConfirmModal();
}

function showLogoutConfirmModal() {
  const modal = document.getElementById("logoutConfirmModal");
  if (modal) modal.classList.remove("hidden");
}

function closeLogoutConfirmModal() {
  const modal = document.getElementById("logoutConfirmModal");
  if (modal) modal.classList.add("hidden");
}

/**
 * Confirmed Logout Action
 */
async function confirmLogoutAction() {
  closeLogoutConfirmModal();
  try {
    await API.logout();
  } catch {
    // Ignore error
  }
  API.clearToken();
  updateAuthUI(false);
  showToast("Hisobingizdan muvaffaqiyatli chiqildi 👋", "info");
}

/**
 * Update UI according to Login / Guest State
 */
function updateAuthUI(isLoggedIn, user = null) {
  const landingHero = document.getElementById("landingView");
  const dashboardApp = document.getElementById("dashboardAppView");
  const navAuthGuest = document.getElementById("navAuthGuest");
  const navAuthUser = document.getElementById("navAuthUser");
  const userNameEl = document.getElementById("headerUserName");

  if (isLoggedIn && user) {
    landingHero?.classList.add("hidden");
    dashboardApp?.classList.remove("hidden");
    navAuthGuest?.classList.add("hidden");
    navAuthUser?.classList.remove("hidden");
    if (userNameEl) userNameEl.innerText = user.name;
    
    // Load Dashboard Tools & History
    if (typeof loadDashboardData === "function") loadDashboardData();
  } else {
    landingHero?.classList.remove("hidden");
    dashboardApp?.classList.add("hidden");
    navAuthGuest?.classList.remove("hidden");
    navAuthUser?.classList.add("hidden");
  }
}

/**
 * Refresh Monthly Usage Statistics & Sync Pro Activation
 */
let lastKnownProStatus = null;

async function refreshUsage() {
  const token = API.getToken();
  if (!token) return;

  try {
    const usage = await API.getUsage();
    const usedCountEl = document.getElementById("statUsageCount");
    const remainCountEl = document.getElementById("statRemainingCount");
    const progressEl = document.getElementById("usageProgressBar");
    const headerLimitEl = document.getElementById("headerUsageBadge");

    if (usage.is_pro) {
      if (usedCountEl) usedCountEl.innerText = "∞";
      if (remainCountEl) remainCountEl.innerText = "Cheksiz";
      if (headerLimitEl) headerLimitEl.innerHTML = `<span class="text-amber-300 font-extrabold">👑 ${usage.pro_plan || "PRO"}</span>`;
      if (progressEl) {
        progressEl.style.width = "100%";
        progressEl.classList.remove("bg-indigo-600");
        progressEl.classList.add("bg-gradient-to-r", "from-amber-400", "to-orange-500");
      }

      // If just confirmed by admin in Telegram!
      if (lastKnownProStatus === false) {
        showToast(`🎉 Tabriklaymiz! To'lovingiz admin tomonidan tasdiqlandi va ${usage.pro_plan || "Pro"} obunangiz saytda to'liq faollashtirildi! 🌟`, "success");
      }
      lastKnownProStatus = true;
    } else {
      if (usedCountEl) usedCountEl.innerText = usage.used;
      if (remainCountEl) remainCountEl.innerText = usage.remaining;
      if (headerLimitEl) headerLimitEl.innerText = `${usage.used} / ${usage.limit}`;

      if (progressEl) {
        const pct = Math.min(100, (usage.used / usage.limit) * 100);
        progressEl.style.width = `${pct}%`;
      }
      lastKnownProStatus = false;
    }
  } catch (err) {
    console.log("Usage load error:", err);
  }
}

// Periodic auto-sync for instant Pro activation without page refresh
setInterval(() => {
  if (API.getToken()) {
    refreshUsage();
  }
}, 4000);
