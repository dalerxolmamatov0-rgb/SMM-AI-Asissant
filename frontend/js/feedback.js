/**
 * Shikoyat va Takliflar (Feedback) boshqaruvi
 */

let selectedFeedbackType = "suggestion";

// Qurilmadagi ma'lum hisoblar ro'yxati (Fallback / Device profile)
const KNOWN_DEVICE_EMAILS = [
  "dalerxolmamatov0@gmail.com",
  "robloxgamee1227@gmail.com",
  "robloxgamee100@gmail.com",
  "xolmamatovdaler0@gmail.com",
  "xolmamatovdaler6@gmail.com",
  "dalerbee173@gmail.com"
];

function initFeedback() {
  const form = document.getElementById("feedbackForm");
  if (form) {
    form.addEventListener("submit", handleFeedbackSubmit);
  }

  // Type selection buttons
  const typeBtns = document.querySelectorAll(".feedback-type-btn");
  typeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      typeBtns.forEach(b => b.classList.remove("border-indigo-500", "bg-indigo-600/20", "text-indigo-300"));
      typeBtns.forEach(b => b.classList.add("border-slate-700", "bg-slate-900/60", "text-slate-400"));

      btn.classList.remove("border-slate-700", "bg-slate-900/60", "text-slate-400");
      btn.classList.add("border-indigo-500", "bg-indigo-600/20", "text-indigo-300");

      selectedFeedbackType = btn.dataset.type || "suggestion";
    });
  });
}

function showFeedbackModal(defaultType = "suggestion") {
  const modal = document.getElementById("feedbackModal");
  if (!modal) return;

  modal.classList.remove("hidden");

  // Qurilmadagi foydalanuvchi ma'lumotlarini avtomatik tahlil qilib to'ldirish
  const user = getCurrentUser();
  const nameInput = document.getElementById("feedbackName");
  const emailInput = document.getElementById("feedbackEmail");
  const tgInput = document.getElementById("feedbackTelegram");

  if (user) {
    if (nameInput && !nameInput.value) nameInput.value = user.name || "Daler";
    if (emailInput && !emailInput.value) emailInput.value = user.email || "dalerxolmamatov0@gmail.com";
  } else {
    const savedEmail = localStorage.getItem("smm_last_email") || KNOWN_DEVICE_EMAILS[0];
    const savedName = localStorage.getItem("smm_last_name") || "Daler";
    if (nameInput && !nameInput.value) nameInput.value = savedName;
    if (emailInput && !emailInput.value) emailInput.value = savedEmail;
  }

  const savedTg = localStorage.getItem("smm_telegram_username");
  if (tgInput && !tgInput.value && savedTg) {
    tgInput.value = savedTg;
  }

  // Tanlangan toifani faollashtirish
  selectedFeedbackType = defaultType;
  const typeBtns = document.querySelectorAll(".feedback-type-btn");
  typeBtns.forEach(btn => {
    if (btn.dataset.type === defaultType) {
      btn.classList.remove("border-slate-700", "bg-slate-900/60", "text-slate-400");
      btn.classList.add("border-indigo-500", "bg-indigo-600/20", "text-indigo-300");
    } else {
      btn.classList.remove("border-indigo-500", "bg-indigo-600/20", "text-indigo-300");
      btn.classList.add("border-slate-700", "bg-slate-900/60", "text-slate-400");
    }
  });
}

function closeFeedbackModal() {
  const modal = document.getElementById("feedbackModal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

async function handleFeedbackSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("feedbackName")?.value.trim() || "";
  const email = document.getElementById("feedbackEmail")?.value.trim() || "";
  const tgValue = document.getElementById("feedbackTelegram")?.value.trim() || "";
  const subject = document.getElementById("feedbackSubject")?.value.trim() || "";
  const message = document.getElementById("feedbackMessage")?.value.trim() || "";

  // 1. Majburiy maydonlarni tekshirish (Telegram username ham talab qilinadi)
  if (!name || !email || !tgValue || !subject || !message) {
    showToast("Iltimos, ma'lumotlaringizni to'g'ri kiriting!", "error");
    return;
  }

  // 2. Email formatini tekshirish
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Malumot mos kelmayapti", "error");
    return;
  }

  // 3. Telegram username formatini tekshirish
  const cleanTg = tgValue.replace(/^@/, "").trim();
  if (cleanTg.length < 2 || !/^[a-zA-Z0-9_]+$/.test(cleanTg)) {
    showToast("Malumot mos kelmayapti", "error");
    return;
  }
  const formattedTelegram = "@" + cleanTg;

  // 4. Foydalanuvchining qurilmasidagi ma'lumotlar bilan tahlil qilish
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.email) {
    const matchesUser = email.toLowerCase() === currentUser.email.toLowerCase();
    const matchesDevice = KNOWN_DEVICE_EMAILS.some(e => e.toLowerCase() === email.toLowerCase());
    if (!matchesUser && !matchesDevice) {
      showToast("Malumot mos kelmayapti", "error");
      return;
    }
  }

  // Ma'lumotlarni qurilmaga saqlash
  localStorage.setItem("smm_last_name", name);
  localStorage.setItem("smm_last_email", email);
  localStorage.setItem("smm_telegram_username", formattedTelegram);

  const submitBtn = document.getElementById("btnSubmitFeedback");
  const originalHtml = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg>
    Yuborilmoqda...
  `;

  try {
    const payload = {
      name,
      email,
      telegram_username: formattedTelegram,
      type: selectedFeedbackType,
      subject,
      message
    };

    const headers = {
      "Content-Type": "application/json"
    };
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      let errDetail = "Malumot mos kelmayapti";
      try {
        const err = await res.json();
        errDetail = err.detail || errDetail;
      } catch {
        // Fallback
      }
      throw new Error(errDetail);
    }

    showToast("Rahmat! Sizning murojaatingiz muvaffaqiyatli qabul qilindi. Tez orada ko'rib chiqamiz! 🚀", "success");
    document.getElementById("feedbackForm").reset();
    closeFeedbackModal();
  } catch (error) {
    showToast(error.message || "Malumot mos kelmayapti", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHtml;
  }
}

/**
 * Telegram tugmasi orqali to'g'ridan-to'g'ri avtomatik yuborish va botni ochish
 */
async function handleDirectTelegramSend() {
  const name = document.getElementById("feedbackName")?.value.trim() || "";
  const email = document.getElementById("feedbackEmail")?.value.trim() || "";
  const tgValue = document.getElementById("feedbackTelegram")?.value.trim() || "";
  const subject = document.getElementById("feedbackSubject")?.value.trim() || "Telegram orqali to'g'ridan-to'g'ri murojaat";
  const message = document.getElementById("feedbackMessage")?.value.trim() || "Foydalanuvchi Telegram bot orqali bog'lanish va savol yo'llash uchun murojaat qildi.";

  // Agar ma'lumotlar to'liq yoki to'g'ri kiritilmagan bo'lsa, xabar yuborilmaydi
  if (!name || !email || !tgValue) {
    showToast("Iltimos, ma'lumotlaringizni to'g'ri kiriting!", "error");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Malumot mos kelmayapti", "error");
    return;
  }

  const cleanTg = tgValue.replace(/^@/, "").trim();
  if (cleanTg.length < 2 || !/^[a-zA-Z0-9_]+$/.test(cleanTg)) {
    showToast("Malumot mos kelmayapti", "error");
    return;
  }
  const formattedTelegram = "@" + cleanTg;

  try {
    const payload = {
      name,
      email,
      telegram_username: formattedTelegram,
      type: selectedFeedbackType,
      subject,
      message
    };

    const headers = { "Content-Type": "application/json" };
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      showToast("Murojaatingiz Telegram botga yuborildi! 🚀", "success");
      closeFeedbackModal();
    }
  } catch {
    // Continue
  }

  // Telegram botni ochish
  window.open("https://t.me/taklif_va_shikoyat_qabul_bot", "_blank");
}
