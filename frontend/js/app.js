/**
 * Main Application Logic for AI SMM Assistant
 */

// Global State
window.currentPlan = null;
let currentModalPostIndex = null;

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();
  loadSavedSettings();
  
  // Initial demo or empty render
  checkInitialState();
});

function initEventListeners() {
  // Navigation Tabs
  const navTabs = document.querySelectorAll(".nav-tab-btn");
  navTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");
      switchTab(target);
    });
  });

  // Creative Lab Sub-tabs
  const creativeSubTabs = document.querySelectorAll(".creative-subtab-btn");
  creativeSubTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const subTarget = btn.getAttribute("data-subtab");
      switchCreativeSubTab(subTarget);
    });
  });

  // Form Submission
  const planForm = document.getElementById("planGenerateForm");
  if (planForm) {
    planForm.addEventListener("submit", handlePlanGeneration);
  }

  // Niche Preset Chips
  const presetChips = document.querySelectorAll(".niche-preset-chip");
  presetChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const nicheInput = document.getElementById("inputNiche");
      const targetAudienceInput = document.getElementById("inputAudience");
      const toneInput = document.getElementById("inputTone");
      
      const niche = chip.getAttribute("data-niche");
      const audience = chip.getAttribute("data-audience");
      const tone = chip.getAttribute("data-tone");

      if (nicheInput) nicheInput.value = niche || "";
      if (targetAudienceInput && audience) targetAudienceInput.value = audience;
      if (toneInput && tone) toneInput.value = tone;
      
      showToast(`${niche} sozlamalari tanlandi ✨`, "info");
    });
  });

  // Export Buttons
  document.getElementById("btnExportPDF")?.addEventListener("click", exportPlanAsPDF);
  document.getElementById("btnExportJSON")?.addEventListener("click", exportPlanAsJSON);
  document.getElementById("btnCopyFullPlan")?.addEventListener("click", copyFullPlanToClipboard);

  // Creative Lab Buttons
  document.getElementById("btnGenReels")?.addEventListener("click", handleGenerateReels);
  document.getElementById("btnGenStories")?.addEventListener("click", handleGenerateStories);
  document.getElementById("btnGenHooks")?.addEventListener("click", handleGenerateHooks);
  document.getElementById("btnOptimizeCaption")?.addEventListener("click", handleOptimizeCaption);

  // Settings Save
  document.getElementById("btnSaveSettings")?.addEventListener("click", saveSettings);
}

// Switch between main tabs
function switchTab(tabId) {
  const tabs = ["plannerTab", "creativeTab", "calendarTab", "settingsTab"];
  tabs.forEach(t => {
    const el = document.getElementById(t);
    if (el) el.classList.add("hidden");
  });

  const activeEl = document.getElementById(tabId);
  if (activeEl) activeEl.classList.remove("hidden");

  // Update nav buttons
  const navTabs = document.querySelectorAll(".nav-tab-btn");
  navTabs.forEach(btn => {
    if (btn.getAttribute("data-tab") === tabId) {
      btn.classList.add("tab-active");
      btn.classList.remove("text-slate-400", "hover:text-white");
    } else {
      btn.classList.remove("tab-active");
      btn.classList.add("text-slate-400", "hover:text-white");
    }
  });

  if (tabId === "calendarTab") {
    renderCalendarView(window.currentPlan);
  }
}

// Switch between Creative Lab sub-sections
function switchCreativeSubTab(subTabId) {
  const subPanels = ["reelsPanel", "storiesPanel", "hooksPanel", "optimizerPanel"];
  subPanels.forEach(p => {
    const el = document.getElementById(p);
    if (el) el.classList.add("hidden");
  });

  const activeSub = document.getElementById(subTabId);
  if (activeSub) activeSub.classList.remove("hidden");

  const subTabs = document.querySelectorAll(".creative-subtab-btn");
  subTabs.forEach(btn => {
    if (btn.getAttribute("data-subtab") === subTabId) {
      btn.classList.add("bg-indigo-600", "text-white");
      btn.classList.remove("bg-slate-800/80", "text-slate-400");
    } else {
      btn.classList.remove("bg-indigo-600", "text-white");
      btn.classList.add("bg-slate-800/80", "text-slate-400");
    }
  });
}

// 7 Kunlik reja generatsiya qilish
async function handlePlanGeneration(e) {
  e.preventDefault();
  
  const brandName = document.getElementById("inputBrandName")?.value || "";
  const niche = document.getElementById("inputNiche")?.value || "Restoran";
  const audience = document.getElementById("inputAudience")?.value || "20-35 yoshli yoshlar";
  const tone = document.getElementById("inputTone")?.value || "Do'stona va samimiy";
  const goal = document.getElementById("inputGoal")?.value || "Sotuv va yangi obunachilar";
  const language = document.getElementById("inputLanguage")?.value || "uz";
  const apiKey = localStorage.getItem("smm_ai_api_key") || "";

  // Loading state
  setLoadingState(true);

  try {
    const res = await fetch("/api/generate-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        niche,
        target_audience: audience,
        tone,
        goal,
        language,
        brand_name: brandName,
        api_key: apiKey
      })
    });

    const data = await res.json();
    if (data.success && data.data) {
      window.currentPlan = data.data;
      renderContentPlan(window.currentPlan);
      showToast("7 kunlik kontent-reja muvaffaqiyatli yaratildi! 🎉", "success");
    } else {
      throw new Error(data.detail || "Generatsiyada xatolik yuz berdi");
    }
  } catch (err) {
    console.error("Plan error:", err);
    showToast("Server bilan bog'lanishda xatolik yuz berdi", "error");
  } finally {
    setLoadingState(false);
  }
}

function setLoadingState(isLoading) {
  const btn = document.getElementById("btnGeneratePlan");
  const loadingOverlay = document.getElementById("planLoadingState");
  const planResults = document.getElementById("planResultsContainer");

  if (isLoading) {
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        AI Reja Tuzmoqda...
      `;
    }
    if (loadingOverlay) loadingOverlay.classList.remove("hidden");
    if (planResults) planResults.classList.add("hidden");
  } else {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `
        <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        7 Kunlik Rejani Generatsiya Qilish
      `;
    }
    if (loadingOverlay) loadingOverlay.classList.add("hidden");
    if (planResults) planResults.classList.remove("hidden");
  }
}

// 7 Kunlik kartochkalarni render qilish
function renderContentPlan(plan) {
  const container = document.getElementById("cardsContainer");
  const metaHeader = document.getElementById("planMetaHeader");
  if (!container) return;

  if (metaHeader) {
    metaHeader.innerHTML = `
      <div class="glass-panel p-5 rounded-2xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Faol Reja</span>
            <h2 class="text-xl font-bold text-white">${plan.brand_name || plan.niche}</h2>
          </div>
          <p class="text-xs text-slate-300 mt-1 flex flex-wrap gap-x-4 gap-y-1">
            <span>🎯 <strong>Maqsad:</strong> ${plan.goal}</span>
            <span>🎭 <strong>Ohang:</strong> ${plan.tone_of_voice}</span>
            <span>👥 <strong>Auditoriya:</strong> ${plan.target_audience}</span>
          </p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <button onclick="copyFullPlanToClipboard()" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md">
            <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            Hammasini Nusxalash
          </button>
          <button onclick="exportPlanAsPDF()" class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-600/30">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            PDF Yuklash
          </button>
        </div>
      </div>
    `;
  }

  let cardsHtml = "";
  plan.content_plan.forEach((post, idx) => {
    const isReels = post.type.toLowerCase().includes("reels");
    const isCarousel = post.type.toLowerCase().includes("karusel");
    const isStories = post.type.toLowerCase().includes("stories");
    
    let badgeStyle = "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
    if (isReels) badgeStyle = "bg-rose-500/20 text-rose-300 border-rose-500/30";
    else if (isCarousel) badgeStyle = "bg-amber-500/20 text-amber-300 border-amber-500/30";
    else if (isStories) badgeStyle = "bg-purple-500/20 text-purple-300 border-purple-500/30";

    cardsHtml += `
      <div class="post-card glass-panel rounded-2xl border border-slate-800 p-5 flex flex-col justify-between" id="postCard_${idx}">
        <div>
          <!-- Card Top Bar -->
          <div class="flex items-center justify-between pb-3 border-b border-slate-700/60">
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs text-white font-extrabold shadow-md">${idx + 1}</span>
              <div>
                <h3 class="font-bold text-white text-base">${post.day_name}</h3>
                <span class="text-[11px] text-slate-400">${post.best_time || "18:00"}</span>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeStyle}">${post.type}</span>
          </div>

          <!-- Post Topic & Hook -->
          <div class="mt-3.5 space-y-2.5">
            <h4 class="font-semibold text-slate-100 text-sm">${post.title}</h4>
            
            <!-- Hooks Box -->
            <div class="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3">
              <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                🎣 Asosiy Ilmoq (Hook)
              </span>
              <p class="text-xs text-indigo-200 mt-1 font-medium leading-relaxed">${post.hooks ? post.hooks[0] : ""}</p>
            </div>

            <!-- Caption Preview -->
            <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">📄 Post Matni:</span>
              <p class="text-xs text-slate-300 mt-1 line-clamp-4 whitespace-pre-line leading-relaxed">${post.caption}</p>
            </div>

            <!-- CTA -->
            <div class="text-xs text-slate-300 flex items-start gap-1.5 bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40">
              <span class="text-rose-400 font-bold">🎯 CTA:</span>
              <span class="line-clamp-1">${post.cta}</span>
            </div>

            <!-- Visual Prompt -->
            <div class="text-xs text-slate-400 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
              <span class="text-purple-400 font-semibold">🎨 Vizual g'oya:</span>
              <p class="line-clamp-2 mt-0.5 text-[11px] text-slate-400 italic">${post.visual_prompt}</p>
            </div>
          </div>
        </div>

        <!-- Card Bottom Actions -->
        <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          <button onclick="regenerateDayPost(${idx})" class="p-2 rounded-xl bg-slate-800/80 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-300 text-xs font-semibold transition-all border border-slate-700 flex items-center gap-1" title="Faqat shu kunni yangilash">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            <span class="hidden sm:inline">Qayta tuzish</span>
          </button>
          <div class="flex items-center gap-2">
            <button onclick="copyPostToClipboard(${idx})" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700 flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>Nusxalash</span>
            </button>
            <button onclick="openPostModal(${idx})" class="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md flex items-center gap-1">
              Batafsil / Tahrir
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = cardsHtml;
}

// Faqat bitta kunni qayta generatsiya qilish
async function regenerateDayPost(idx) {
  if (!window.currentPlan || !window.currentPlan.content_plan) return;
  const post = window.currentPlan.content_plan[idx];
  
  const card = document.getElementById(`postCard_${idx}`);
  if (card) card.classList.add("opacity-50", "pointer-events-none");

  showToast(`${post.day_name} posti qayta tuzilmoqda... ⏳`, "info");

  try {
    const res = await fetch("/api/regenerate-day", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day_number: idx + 1,
        niche: window.currentPlan.niche || "Biznes",
        target_audience: window.currentPlan.target_audience || "Auditoriya",
        tone: window.currentPlan.tone_of_voice || "Do'stona",
        goal: window.currentPlan.goal || "Sotuv",
        language: window.currentPlan.language || "uz",
        brand_name: window.currentPlan.brand_name || "",
        content_type: post.type,
        api_key: localStorage.getItem("smm_ai_api_key") || ""
      })
    });

    const data = await res.json();
    if (data.success && data.data) {
      window.currentPlan.content_plan[idx] = data.data;
      renderContentPlan(window.currentPlan);
      showToast(`${post.day_name} posti yangilandi! ✨`, "success");
    }
  } catch (err) {
    showToast("Qayta tuzishda xatolik", "error");
  }
}

// Post Modalini ochish (Batafsil ko'rish va tahrirlash)
function openPostModal(idx) {
  if (!window.currentPlan || !window.currentPlan.content_plan) return;
  const post = window.currentPlan.content_plan[idx];
  currentModalPostIndex = idx;

  const modal = document.getElementById("postModal");
  const modalTitle = document.getElementById("modalPostTitle");
  const modalCaption = document.getElementById("modalPostCaption");
  const modalHooks = document.getElementById("modalPostHooks");
  const modalCta = document.getElementById("modalPostCta");
  const modalVisual = document.getElementById("modalPostVisual");
  const modalHashtags = document.getElementById("modalPostHashtags");

  if (modalTitle) modalTitle.innerText = `${post.day_name} — ${post.title} (${post.type})`;
  if (modalCaption) modalCaption.value = post.caption;
  if (modalCta) modalCta.value = post.cta;
  if (modalVisual) modalVisual.value = post.visual_prompt;
  if (modalHashtags) modalHashtags.value = (post.hashtags || []).join(" ");

  if (modalHooks) {
    let hooksHtml = "";
    (post.hooks || []).forEach((h, hIdx) => {
      hooksHtml += `
        <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200">
          <span>${h}</span>
          <button onclick="copyTextDirect('${h.replace(/'/g, "\\'")}')" class="text-indigo-400 hover:text-indigo-300 font-semibold text-[11px] ml-2">Nusxalash</button>
        </div>
      `;
    });
    modalHooks.innerHTML = hooksHtml;
  }

  if (modal) modal.classList.remove("hidden");
}

function closePostModal() {
  const modal = document.getElementById("postModal");
  if (modal) modal.classList.add("hidden");
  currentModalPostIndex = null;
}

// Modalda tahrirlangan postni saqlash
function saveModalPostChanges() {
  if (currentModalPostIndex === null || !window.currentPlan) return;
  const post = window.currentPlan.content_plan[currentModalPostIndex];

  const modalCaption = document.getElementById("modalPostCaption");
  const modalCta = document.getElementById("modalPostCta");
  const modalVisual = document.getElementById("modalPostVisual");
  const modalHashtags = document.getElementById("modalPostHashtags");

  if (modalCaption) post.caption = modalCaption.value;
  if (modalCta) post.cta = modalCta.value;
  if (modalVisual) post.visual_prompt = modalVisual.value;
  if (modalHashtags) post.hashtags = modalHashtags.value.split(" ").filter(h => h.trim());

  renderContentPlan(window.currentPlan);
  closePostModal();
  showToast("O'zgarishlar muvaffaqiyatli saqlandi! 💾", "success");
}

function copyTextDirect(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Nusxalandi! 📋", "success");
  });
}

// ================= KREATIV LABORATORIYA HANDLERS =================

async function handleGenerateReels() {
  const topic = document.getElementById("reelsTopicInput")?.value || "";
  const niche = document.getElementById("inputNiche")?.value || "Biznes";
  const container = document.getElementById("reelsResultsContainer");

  if (container) container.innerHTML = `<div class="p-8 text-center text-slate-400">Viral Reels ssenariylari yaratilmoqda... 🎬</div>`;

  try {
    const res = await fetch("/api/creative/reels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, niche, language: "uz" })
    });
    const data = await res.json();
    if (data.success && data.data) {
      renderReelsResults(data.data);
    }
  } catch (err) {
    showToast("Reels ssenariylarini yaratishda xatolik", "error");
  }
}

function renderReelsResults(reelsList) {
  const container = document.getElementById("reelsResultsContainer");
  if (!container) return;

  let html = `<div class="space-y-6">`;
  reelsList.forEach((reel, i) => {
    html += `
      <div class="glass-panel p-5 rounded-2xl border border-slate-700">
        <div class="flex items-center justify-between pb-3 border-b border-slate-700">
          <div>
            <span class="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">${reel.category}</span>
            <h3 class="text-lg font-bold text-white mt-1">${reel.title}</h3>
          </div>
          <span class="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">⏱ ${reel.duration}</span>
        </div>

        <div class="mt-4 space-y-3">
          ${reel.timeline.map(step => `
            <div class="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div class="md:col-span-2 font-extrabold text-indigo-400 flex items-center">${step.time}</div>
              <div class="md:col-span-4 text-slate-300"><strong>Harakat:</strong> ${step.action}</div>
              <div class="md:col-span-3 text-amber-300"><strong>Ekranda yozuv:</strong> ${step.text_on_screen}</div>
              <div class="md:col-span-3 text-purple-300"><strong>Audio:</strong> ${step.audio}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

async function handleGenerateStories() {
  const product = document.getElementById("storiesProductInput")?.value || "Mahsulot/Xizmat";
  const niche = document.getElementById("inputNiche")?.value || "Biznes";
  const container = document.getElementById("storiesResultsContainer");

  if (container) container.innerHTML = `<div class="p-8 text-center text-slate-400">Stories voronkasi tuzilmoqda... 📱</div>`;

  try {
    const res = await fetch("/api/creative/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_or_service: product, niche, language: "uz" })
    });
    const data = await res.json();
    if (data.success && data.data) {
      renderStoriesResults(data.data);
    }
  } catch (err) {
    showToast("Stories voronkasini yaratishda xatolik", "error");
  }
}

function renderStoriesResults(storiesData) {
  const container = document.getElementById("storiesResultsContainer");
  if (!container) return;

  const funnel = storiesData[0];
  let html = `
    <div class="glass-panel p-5 rounded-2xl border border-slate-700">
      <h3 class="text-lg font-bold text-white mb-4">📱 ${funnel.title}</h3>
      <div class="space-y-4">
  `;

  funnel.steps.forEach(st => {
    html += `
      <div class="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">${st.step}</span>
            <h4 class="font-bold text-slate-200 text-sm">${st.type}</h4>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">${st.description}</p>
          <p class="text-[11px] text-amber-400">💡 <em>Maslahat:</em> ${st.tip}</p>
        </div>
        <div class="px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium whitespace-nowrap">
          Sticker: ${st.interactive_element}
        </div>
      </div>
    `;
  });

  html += `</div></div>`;
  container.innerHTML = html;
}

async function handleGenerateHooks() {
  const topic = document.getElementById("hooksTopicInput")?.value || "Biznes va sotuv";
  const niche = document.getElementById("inputNiche")?.value || "Umumiy";
  const container = document.getElementById("hooksResultsContainer");

  if (container) container.innerHTML = `<div class="p-8 text-center text-slate-400">10 ta viral ilmoqlar generatsiya qilinmoqda... 🎣</div>`;

  try {
    const res = await fetch("/api/creative/hooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, niche, count: 10, language: "uz" })
    });
    const data = await res.json();
    if (data.success && data.data) {
      let html = `<div class="grid grid-cols-1 md:grid-cols-2 gap-3">`;
      data.data.forEach(item => {
        html += `
          <div class="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-start justify-between gap-3 group">
            <div>
              <span class="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">${item.type}</span>
              <p class="text-xs text-slate-200 mt-1 font-medium">${item.hook}</p>
            </div>
            <button onclick="copyTextDirect('${item.hook.replace(/'/g, "\\'")}')" class="p-2 rounded-lg bg-slate-800 group-hover:bg-indigo-600 text-slate-300 group-hover:text-white transition-all text-xs" title="Nusxalash">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            </button>
          </div>
        `;
      });
      html += `</div>`;
      container.innerHTML = html;
    }
  } catch (err) {
    showToast("Ilmoqlarni yaratishda xatolik", "error");
  }
}

async function handleOptimizeCaption() {
  const draftText = document.getElementById("optimizerInputText")?.value || "";
  const container = document.getElementById("optimizerResultBox");
  if (!draftText.trim()) {
    showToast("Iltimos, avval xomaki matningizni kiriting", "error");
    return;
  }

  if (container) container.innerHTML = `<div class="p-4 text-slate-400 text-sm">AIDA formulasi bilan matn qayta ishlanmoqda... ✨</div>`;

  try {
    const res = await fetch("/api/creative/optimize-caption", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ draft_text: draftText, tone: "Sotuvchan va Jozibador" })
    });
    const data = await res.json();
    if (data.success && data.data) {
      container.innerHTML = `
        <div class="space-y-3">
          <div class="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 text-slate-200 text-xs whitespace-pre-line leading-relaxed">
            ${data.data.optimized}
          </div>
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-slate-400">Tavsiya etilgan: ${data.data.cta_suggestion}</span>
            <button onclick="copyTextDirect('${data.data.optimized.replace(/'/g, "\\'").replace(/\n/g, "\\n")}')" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold">
              Matnni Nusxalash 📋
            </button>
          </div>
        </div>
      `;
      showToast("Matn muvaffaqiyatli optimizatsiya qilindi! ✨", "success");
    }
  } catch (err) {
    showToast("Optimizatsiyada xatolik", "error");
  }
}

// Sozlamalarni saqlash va yuklash
function saveSettings() {
  const apiKey = document.getElementById("inputApiKey")?.value || "";
  const modelProvider = document.getElementById("selectModelProvider")?.value || "auto";

  localStorage.setItem("smm_ai_api_key", apiKey.trim());
  localStorage.setItem("smm_ai_model_provider", modelProvider);
  showToast("Sozlamalar saqlandi! ⚙️", "success");
}

function loadSavedSettings() {
  const savedApiKey = localStorage.getItem("smm_ai_api_key") || "";
  const savedModel = localStorage.getItem("smm_ai_model_provider") || "auto";

  const keyInput = document.getElementById("inputApiKey");
  const modelSelect = document.getElementById("selectModelProvider");

  if (keyInput) keyInput.value = savedApiKey;
  if (modelSelect) modelSelect.value = savedModel;
}

// Boshlang'ich holatda avtomatik demo reja yuklash
async function checkInitialState() {
  // Avtomatik restoran uchun namunaviy 7 kunlik reja yuklaymiz
  try {
    const res = await fetch("/api/generate-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        niche: "Restoran va Kafexona",
        target_audience: "20-35 yoshli oilalar va do'stlar",
        tone: "Do'stona va samimiy",
        goal: "Sotuv va yangi obunachilar",
        language: "uz",
        brand_name: "Gusto Lounge"
      })
    });
    const data = await res.json();
    if (data.success && data.data) {
      window.currentPlan = data.data;
      renderContentPlan(window.currentPlan);
    }
  } catch (e) {
    console.log("Demo load fallback:", e);
  }
}
