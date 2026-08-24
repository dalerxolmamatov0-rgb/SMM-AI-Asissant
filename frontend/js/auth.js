/**
 * Authentication and User Session Controller
 * Dedicated Email/Password Register & Login + Optional Google OAuth
 */

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
  document.getElementById("googleDirectLoginForm")?.addEventListener("submit", handleGoogleDirectSubmit);
  document.getElementById("btnLogout")?.addEventListener("click", handleLogout);
}

/**
 * Open Email/Password Auth Modal with specific mode
 * @param {'login'|'register'} mode 
 */
function showAuthModal(mode = "login") {
  closeAuthModal();
  showGoogleAuthModal();
}

function closeAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) modal.classList.add("hidden");
}

/**
 * Open Google OAuth Account Chooser Modal
 */
function openGoogleChooserModal() {
  closeAuthModal();
  showGoogleAuthModal();
}

function handleGoogleLogin() {
  openGoogleChooserModal();
}

function showGoogleAuthModal() {
  const modal = document.getElementById("googleAuthModal");
  if (modal) {
    modal.classList.remove("hidden");
    const inputSection = document.getElementById("googleCustomInputSection");
    if (inputSection) inputSection.classList.add("hidden");
  }
}

function closeGoogleAuthModal() {
  const modal = document.getElementById("googleAuthModal");
  if (modal) modal.classList.add("hidden");
}

function toggleDirectGoogleForm() {
  const section = document.getElementById("googleCustomInputSection");
  if (section) {
    section.classList.toggle("hidden");
    if (!section.classList.contains("hidden")) {
      document.getElementById("googleDirectEmail")?.focus();
    }
  }
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
 * Handle Google Quick Login from Chooser
 */
async function quickLoginGoogle(email, name) {
  showToast(`Google hisob tanlandi: ${email}...`, "info");
  await executeGoogleLogin({ email, name });
}

/**
 * Handle Direct Google Email Input Submit
 */
async function handleGoogleDirectSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("googleDirectEmail")?.value.trim();
  const name = document.getElementById("googleDirectName")?.value.trim() || email.split("@")[0];

  if (!email) {
    showToast("Google elektron pochtangizni kiriting!", "error");
    return;
  }

  await executeGoogleLogin({ email, name });
}

/**
 * Execute Google Auth API Call
 */
async function executeGoogleLogin(payload) {
  try {
    const data = await API.googleAuth(payload);
    API.setToken(data.access_token);
    API.setUser(data.user);
    closeAuthModal();
    closeGoogleAuthModal();
    updateAuthUI(true, data.user);
    refreshUsage();
    showToast(`Google orqali kirdingiz, ${data.user.name}! 🚀`, "success");
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
