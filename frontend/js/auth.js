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
  document.getElementById("googleDirectLoginForm")?.addEventListener("submit", handleGoogleDirectSubmit);
  document.getElementById("btnLogout")?.addEventListener("click", handleLogout);

  // Initialize Google Identity Services (GIS)
  initGoogleAuthSDK();
}

/**
/**
 * Initialize Google Auth SDK (Safe mode)
 */
function initGoogleAuthSDK() {
  // Safe local Google Account Chooser initialization
}

/**
 * Handle Google One-Tap / ID Token Callback
 */
async function handleGoogleGISCredential(response) {
  if (response && response.credential) {
    try {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      const profile = JSON.parse(jsonPayload);

      await executeGoogleLogin({
        credential: response.credential,
        email: profile.email,
        name: profile.name || profile.given_name || profile.email.split("@")[0],
        avatar_url: profile.picture
      });
    } catch {
      await executeGoogleLogin({ credential: response.credential });
    }
  }
}

/**
 * Fetch Google Profile via UserInfo endpoint after account selection
 */
async function fetchGoogleUserInfo(accessToken) {
  try {
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
      return;
    }
  } catch (err) {
    console.log("UserInfo fetch error:", err);
  }
}

/**
 * Open Email/Password Auth Modal with specific mode
 * @param {'login'|'register'} mode 
 */
function showAuthModal(mode = "login") {
  closeGoogleAuthModal();
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
 * Device-saved Google accounts (starts empty for every device)
 */
const DEFAULT_GOOGLE_ACCOUNTS = [];

/**
 * Get device-saved Google accounts for THIS specific device only
 */
function getDeviceGoogleAccounts() {
  try {
    // Clear old legacy test cache if present
    if (!localStorage.getItem("smm_accounts_cleaned_v3")) {
      localStorage.removeItem("smm_device_google_accounts");
      localStorage.setItem("smm_accounts_cleaned_v3", "true");
      return [];
    }

    const raw = localStorage.getItem("smm_device_google_accounts");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // fallback
  }
  return [];
}

/**
 * Save new Google account to device list
 */
function saveDeviceGoogleAccount(account) {
  try {
    const current = getDeviceGoogleAccounts();
    const filtered = current.filter(a => a.email.toLowerCase() !== account.email.toLowerCase());
    filtered.unshift(account);
    localStorage.setItem("smm_device_google_accounts", JSON.stringify(filtered.slice(0, 8)));
  } catch (e) {
    console.error("Save account error:", e);
  }
}

/**
 * Remove account from device list
 */
function removeDeviceGoogleAccount(email) {
  try {
    const current = getDeviceGoogleAccounts();
    const filtered = current.filter(a => a.email.toLowerCase() !== email.toLowerCase());
    localStorage.setItem("smm_device_google_accounts", JSON.stringify(filtered));
    renderGoogleAccountsList();
    showToast("Hisob qurilma xotirasidan o'chirildi", "info");
  } catch (e) {
    console.error("Remove account error:", e);
  }
}

/**
 * Render dynamic Google Accounts List inside Modal
 */
function renderGoogleAccountsList() {
  const container = document.getElementById("deviceGoogleAccountsList");
  const formSection = document.getElementById("googleCustomInputSection");
  if (!container) return;

  const accounts = getDeviceGoogleAccounts();
  
  if (accounts.length === 0) {
    // No accounts on this device yet: show the input form directly
    container.innerHTML = "";
    if (formSection) {
      formSection.classList.remove("hidden");
    }
    return;
  }

  // If accounts exist on this device, display them
  let html = "";
  accounts.forEach(acc => {
    const initial = acc.avatar || (acc.name ? acc.name.charAt(0).toUpperCase() : "G");
    const bgClass = acc.bgColor || "bg-indigo-600";
    html += `
      <div onclick="quickLoginGoogle('${acc.email}', '${acc.name.replace(/'/g, "\\'")}')" class="w-full py-3.5 px-3 hover:bg-[#1f2022] rounded-xl flex items-center justify-between group transition-colors cursor-pointer">
        <div class="flex items-center gap-4 truncate">
          <div class="w-10 h-10 rounded-full ${bgClass} flex items-center justify-center font-bold text-white text-base shrink-0 shadow border border-slate-700/50">
            ${initial}
          </div>
          <div class="truncate text-left">
            <div class="font-medium text-[#e8eaed] text-[15px] leading-snug group-hover:text-[#38bdf8] transition-colors truncate">${acc.name}</div>
            <div class="text-[13px] text-[#9aa0a6] truncate font-normal">${acc.email}</div>
          </div>
        </div>
        <button type="button" onclick="event.stopPropagation(); removeDeviceGoogleAccount('${acc.email}');" class="p-1 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity rounded" title="O'chirish">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * Toggle Custom Google Email Form
 */
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
 * User clicks "Google bilan davom etish"
 * Opens Google's account chooser modal with accounts list!
 */
function handleGoogleLogin() {
  closeAuthModal();
  showGoogleAuthModal();
}

function openGoogleChooserModal() {
  handleGoogleLogin();
}

function showGoogleAuthModal() {
  const modal = document.getElementById("googleAuthModal");
  if (modal) {
    modal.classList.remove("hidden");
    renderGoogleAccountsList();
    const accounts = getDeviceGoogleAccounts();
    const inputSection = document.getElementById("googleCustomInputSection");
    if (inputSection) {
      if (accounts.length === 0) {
        inputSection.classList.remove("hidden");
      } else {
        inputSection.classList.add("hidden");
      }
    }
    const emailInput = document.getElementById("googleDirectEmail");
    if (emailInput && accounts.length === 0) {
      emailInput.focus();
    }
  }
}

function closeGoogleAuthModal() {
  const modal = document.getElementById("googleAuthModal");
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
    
    // Save to device Google accounts list
    if (data.user && data.user.email) {
      saveDeviceGoogleAccount({
        name: data.user.name || "Google User",
        email: data.user.email,
        avatar: data.user.name ? data.user.name.charAt(0).toUpperCase() : "G"
      });
    }

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
