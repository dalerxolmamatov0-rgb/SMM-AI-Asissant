/**
 * Dashboard & Navigation Manager
 */

function initDashboard() {
  // Navigation Sidebar items
  const sidebarLinks = document.querySelectorAll(".sidebar-nav-item");
  sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
      const view = link.getAttribute("data-view");
      switchAppView(view);
    });
  });

  // Quick Action Buttons
  const quickBtns = document.querySelectorAll(".quick-action-btn");
  quickBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const toolId = btn.getAttribute("data-tool");
      switchAppView("toolsView");
      if (typeof activateToolTab === "function") {
        activateToolTab(toolId);
      }
    });
  });
}

function switchAppView(viewId) {
  const views = ["dashboardHomeView", "toolsView", "proView", "chatView", "historyView", "profileView", "settingsView"];
  views.forEach(v => {
    const el = document.getElementById(v);
    if (el) el.classList.add("hidden");
  });

  const activeView = document.getElementById(viewId);
  if (activeView) activeView.classList.remove("hidden");

  // Highlight sidebar
  const sidebarLinks = document.querySelectorAll(".sidebar-nav-item");
  sidebarLinks.forEach(link => {
    if (link.getAttribute("data-view") === viewId) {
      link.classList.add("sidebar-link-active");
      link.classList.remove("text-slate-400");
    } else {
      link.classList.remove("sidebar-link-active");
      link.classList.add("text-slate-400");
    }
  });

  if (viewId === "dashboardHomeView") loadDashboardData();
  if (viewId === "historyView" && typeof loadHistoryData === "function") loadHistoryData();
  if (viewId === "profileView" && typeof loadBusinessProfileData === "function") loadBusinessProfileData();
  if (viewId === "chatView" && typeof loadChatHistory === "function") loadChatHistory();
}

async function loadDashboardData() {
  refreshUsage();
  loadRecentGenerations();
}

async function loadRecentGenerations() {
  const container = document.getElementById("recentGenerationsList");
  if (!container) return;

  try {
    const history = await API.getHistory({ limit: 5 });
    if (!history || history.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 text-slate-500 text-xs">
          Hozircha hech qanday generatsiya yo'q. Yuqoridagi tugmalar orqali birinchi kontentingizni yarating! 🚀
        </div>
      `;
      return;
    }

    let html = `<div class="space-y-3">`;
    history.forEach(item => {
      const dateStr = new Date(item.created_at).toLocaleDateString("uz-UZ", {
        month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
      });

      let typeBadge = getToolBadge(item.type);
      let previewText = "";
      if (item.type === "post") previewText = item.output_data?.title || item.output_data?.content;
      else if (item.type === "reels") previewText = item.output_data?.idea_title || item.output_data?.hook;
      else if (item.type === "content_plan") previewText = `${item.output_data?.duration_days || 7} kunlik kontent reja: ${item.output_data?.business_type}`;
      else if (item.type === "hashtags") previewText = (item.output_data?.all_hashtags || []).slice(0, 5).join(" ");
      else if (item.type === "ad_copy") previewText = item.output_data?.short_version?.hook;
      else if (item.type === "image_prompt") previewText = item.output_data?.prompts?.instagram_post;
      else if (item.type === "audience") previewText = item.output_data?.ideal_customer;

      html += `
        <div class="glass-card p-3.5 rounded-2xl flex items-center justify-between gap-3 text-xs border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group" onclick="openHistoryItemTask('${item.id}')">
          <div class="flex items-center gap-3 overflow-hidden">
            ${typeBadge}
            <div class="truncate">
              <p class="font-medium text-slate-200 group-hover:text-white truncate transition-colors">${previewText || "Natija..."}</p>
              <span class="text-[10px] text-slate-500">${dateStr}</span>
            </div>
          </div>
          <button onclick="event.stopPropagation(); openHistoryItemTask('${item.id}')" class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] whitespace-nowrap transition-all shadow-md shadow-indigo-600/30">
            Vazifaga o'tish 🚀
          </button>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;
  } catch (err) {
    console.log("Recent items error:", err);
  }
}

function getToolBadge(type) {
  const badges = {
    post: '<span class="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold">📝 Post</span>',
    reels: '<span class="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">🎬 Reels</span>',
    content_plan: '<span class="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">📅 Reja</span>',
    hashtags: '<span class="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">🏷 Hashtag</span>',
    ad_copy: '<span class="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">📣 Reklama</span>',
    image_prompt: '<span class="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">🎨 Rasm Prompt</span>',
    audience: '<span class="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold">🎯 Auditoriya</span>'
  };
  return badges[type] || '<span class="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[10px] font-bold">AI Tool</span>';
}

// ----------------- PRO PRICING & CHECKOUT CONTROLLERS -----------------
let selectedCheckoutPlan = { title: "Standart Pro", price: "50 000 so'm" };
let selectedPaymentApp = "Payme";

function showPricingModal(price = "50 000 so'm", plan = "Standart Pro") {
  const modal = document.getElementById("pricingModal");
  if (modal) modal.classList.remove("hidden");
}

function closePricingModal() {
  const modal = document.getElementById("pricingModal");
  if (modal) modal.classList.add("hidden");
}

function openCheckoutModal(title, price) {
  closePricingModal();
  selectedCheckoutPlan = { title, price };
  selectedPaymentApp = "Payme";
  const modal = document.getElementById("checkoutModal");
  const titleEl = document.getElementById("checkoutPlanTitle");
  const priceEl = document.getElementById("checkoutPlanPrice");
  const cardAmountEl = document.getElementById("cardDeductAmount");
  
  if (titleEl) titleEl.innerText = title;
  if (priceEl) priceEl.innerText = price + " / oy";
  if (cardAmountEl) cardAmountEl.innerText = price;
  
  selectPaymentApp("Payme", false);
  
  if (modal) modal.classList.remove("hidden");

  // Admin Telegram Botiga darhol xarid niyati xabari va [Tasdiqlash] tugmasini yuborish
  try {
    const curUser = (typeof API !== "undefined" && API.getUser) ? API.getUser() : null;
    const name = curUser?.name || localStorage.getItem("smm_last_name") || "Foydalanuvchi";
    const email = curUser?.email || localStorage.getItem("smm_last_email") || "user@example.com";
    const token = (typeof API !== "undefined" && API.getToken) ? API.getToken() : null;
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    fetch("/api/feedback", {
      method: "POST",
      headers,
      body: JSON.stringify({
        name,
        email,
        telegram_username: localStorage.getItem("smm_telegram_username") || "@ac_1Daler",
        type: "payment",
        is_payment: true,
        with_buttons: true,
        subject: `💳 Yangi Pro Xarid So'rovi: ${title} (${price})`,
        message: `Foydalanuvchi saytda ${title} (${price}) ta'rifini xarid qilish oynasini ochdi va to'lov qilmoqda.\nKarta: 4916 9903 6131 4013`
      })
    }).catch(() => {});
  } catch (e) {}
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.add("hidden");
}

function selectPaymentApp(appName, showUserToast = true) {
  selectedPaymentApp = appName;
  
  // Update button visual styles
  document.querySelectorAll(".pay-app-btn").forEach(btn => {
    btn.classList.remove("border-indigo-500", "bg-indigo-950/60", "shadow-md", "shadow-indigo-500/20");
    btn.classList.add("border-slate-700/80", "bg-slate-900/90");
  });

  const btnId = "payAppBtn-" + appName.replace(/\s+/g, "");
  const activeBtn = document.getElementById(btnId);
  if (activeBtn) {
    activeBtn.classList.remove("border-slate-700/80", "bg-slate-900/90");
    activeBtn.classList.add("border-indigo-500", "bg-indigo-950/60", "shadow-md", "shadow-indigo-500/20");
  }

  const badge = document.getElementById("selectedPaymentAppBadge");
  if (badge) {
    badge.innerHTML = `<span class="text-indigo-400 font-bold">✓ ${appName} tanlandi</span>`;
  }

  // Copy card number to clipboard
  copyCardNumberToClipboard("4916990361314013", false);

  if (showUserToast) {
    showToast(`📱 ${appName} tanlandi! Karta raqami (4916 9903 6131 4013) nusxalandi. Ilovada to'lovni amalga oshiring! 📋`, "info");
  }
}

function copyCardNumberToClipboard(cardNum = "4916990361314013", showUserToast = true) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(cardNum).then(() => {
      if (showUserToast) showToast("Karta raqami nusxalandi: 4916 9903 6131 4013 📋", "success");
    }).catch(() => fallbackCopyText(cardNum, showUserToast));
  } else {
    fallbackCopyText(cardNum, showUserToast);
  }
}

function fallbackCopyText(text, showUserToast = true) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    if (showUserToast) showToast("Karta raqami nusxalandi: 4916 9903 6131 4013 📋", "success");
  } catch (err) {
    if (showUserToast) showToast("Karta raqami: 4916 9903 6131 4013", "info");
  }
  document.body.removeChild(textArea);
}

async function sendReceiptViaTelegram() {
  const curUser = (typeof API !== "undefined" && API.getUser) ? API.getUser() : null;
  const name = curUser?.name || localStorage.getItem("smm_last_name") || "Foydalanuvchi";
  const email = curUser?.email || localStorage.getItem("smm_last_email") || "user@example.com";
  
  const tgInput = document.getElementById("checkoutTelegramInput");
  const noteInput = document.getElementById("checkoutReceiptNote");
  
  let telegram = tgInput?.value.trim() || localStorage.getItem("smm_telegram_username") || "@ac_1Daler";
  if (telegram) localStorage.setItem("smm_telegram_username", telegram);
  
  const note = noteInput?.value.trim() || "";

  const payload = {
    name,
    email,
    telegram_username: telegram,
    type: "payment",
    is_payment: true,
    with_buttons: true,
    subject: `💳 Pro Ta'rif To'lovi: ${selectedCheckoutPlan.title} (${selectedCheckoutPlan.price})`,
    message: `Foydalanuvchi ${selectedPaymentApp} orqali ${selectedCheckoutPlan.title} ta'rifiga ${selectedCheckoutPlan.price} to'lov qildi.\nKarta: 4916 9903 6131 4013\nTo'lov ilovasi: ${selectedPaymentApp}${note ? `\nIzoh/Tranzaksiya: ${note}` : ""}`
  };

  try {
    const token = (typeof API !== "undefined" && API.getToken) ? API.getToken() : null;
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    await fetch("/api/feedback", {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });
  } catch {
    // Continue
  }

  showToast(`${selectedPaymentApp} to'lov ma'lumoti botga yuborildi. Chekni botga tashlang! ✈️`, "success");
  closeCheckoutModal();
  window.open("https://t.me/taklif_va_shikoyat_qabul_bot", "_blank");
}

async function confirmPaymentAndNotify() {
  const curUser = (typeof API !== "undefined" && API.getUser) ? API.getUser() : null;
  const name = curUser?.name || localStorage.getItem("smm_last_name") || "Foydalanuvchi";
  const email = curUser?.email || localStorage.getItem("smm_last_email") || "user@example.com";
  
  const tgInput = document.getElementById("checkoutTelegramInput");
  const noteInput = document.getElementById("checkoutReceiptNote");
  
  let telegram = tgInput?.value.trim() || localStorage.getItem("smm_telegram_username") || "@ac_1Daler";
  if (telegram) localStorage.setItem("smm_telegram_username", telegram);
  
  const note = noteInput?.value.trim() || "";

  const payload = {
    name,
    email,
    telegram_username: telegram,
    type: "payment",
    is_payment: true,
    with_buttons: true,
    subject: `💳 To'lov Tasdiqlash So'rovi: ${selectedCheckoutPlan.title} (${selectedCheckoutPlan.price})`,
    message: `Foydalanuvchi ${selectedPaymentApp} orqali ${selectedCheckoutPlan.title} (${selectedCheckoutPlan.price}) to'lovini bajarganini bildirdi.\nKarta: 4916 9903 6131 4013\nTo'lov ilovasi: ${selectedPaymentApp}${note ? `\nIzoh/Tranzaksiya: ${note}` : ""}`
  };

  try {
    const token = (typeof API !== "undefined" && API.getToken) ? API.getToken() : null;
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    await fetch("/api/feedback", {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });
  } catch {
    // Continue
  }

  closeCheckoutModal();
  showToast(`To'lov so'rovingiz qabul qilindi. Chekingiz tekshirilishi bilan 1 oylik Pro obunangiz faollashtiriladi! 🌟`, "info");
}

// Close modals on Escape key press
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCheckoutModal();
    closePricingModal();
  }
});
