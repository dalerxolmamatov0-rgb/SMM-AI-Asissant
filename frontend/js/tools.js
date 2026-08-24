/**
 * 7 AI Tools Engine & Event Handlers
 */

let lastGeneratedPlanData = null;

function initTools() {
  // Tool Sub-tabs
  const toolNavBtns = document.querySelectorAll(".tool-nav-btn");
  toolNavBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const toolId = btn.getAttribute("data-tool-panel");
      activateToolTab(toolId);
    });
  });

  // Generator Forms
  document.getElementById("formGenPost")?.addEventListener("submit", handlePostGen);
  document.getElementById("formGenReels")?.addEventListener("submit", handleReelsGen);
  document.getElementById("formGenPlan")?.addEventListener("submit", handlePlanGen);
  document.getElementById("formGenHashtags")?.addEventListener("submit", handleHashtagGen);
  document.getElementById("formGenAdCopy")?.addEventListener("submit", handleAdCopyGen);
  document.getElementById("formGenImagePrompt")?.addEventListener("submit", handleImagePromptGen);
  document.getElementById("formGenAudience")?.addEventListener("submit", handleAudienceGen);
}

function activateToolTab(toolPanelId) {
  const panels = ["toolPanelPost", "toolPanelReels", "toolPanelPlan", "toolPanelHashtags", "toolPanelAdCopy", "toolPanelImagePrompt", "toolPanelAudience"];
  panels.forEach(p => {
    const el = document.getElementById(p);
    if (el) el.classList.add("hidden");
  });

  const activePanel = document.getElementById(toolPanelId);
  if (activePanel) activePanel.classList.remove("hidden");

  // Highlight tool tab button
  const toolNavBtns = document.querySelectorAll(".tool-nav-btn");
  toolNavBtns.forEach(btn => {
    if (btn.getAttribute("data-tool-panel") === toolPanelId) {
      btn.classList.add("bg-indigo-600", "text-white", "shadow-lg");
      btn.classList.remove("bg-slate-800/60", "text-slate-400");
    } else {
      btn.classList.remove("bg-indigo-600", "text-white", "shadow-lg");
      btn.classList.add("bg-slate-800/60", "text-slate-400");
    }
  });
}

function setBtnLoading(btnId, isLoading, text = "Generatsiya...") {
  const btn = document.getElementById(btnId);
  if (!btn) return;

  if (isLoading) {
    btn.disabled = true;
    btn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span>${text}</span>
    `;
  } else {
    btn.disabled = false;
    btn.innerHTML = `
      <svg class="w-4 h-4 inline-block mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      <span>Generatsiya Qilish</span>
    `;
  }
}

// ----------------- 1. AI POST GENERATOR -----------------
async function handlePostGen(e) {
  e.preventDefault();
  const payload = {
    business_name: document.getElementById("postBizName")?.value || "",
    business_type: document.getElementById("postBizType")?.value || "Biznes",
    product_service: document.getElementById("postProduct")?.value || "Mahsulot",
    platform: document.getElementById("postPlatform")?.value || "Instagram",
    goal: document.getElementById("postGoal")?.value || "Sotuv",
    audience: document.getElementById("postAudience")?.value || "Yoshlar",
    tone: document.getElementById("postTone")?.value || "Do'stona",
    topic: document.getElementById("postTopic")?.value || "Yangi mahsulot"
  };

  setBtnLoading("btnSubmitPost", true, "AI Post Yozmoqda...");
  try {
    const res = await API.generatePost(payload);
    renderPostResult(res.output);
    refreshUsage();
    showToast("Post tayyor! ✨", "success");
  } catch (err) {}
  finally { setBtnLoading("btnSubmitPost", false); }
}

function renderPostResult(data) {
  const container = document.getElementById("postResultContainer");
  if (!container) return;

  const fullText = `📌 ${data.title}\n\n${data.content}\n\n🎯 ${data.cta}\n\n${(data.hashtags || []).join(" ")}`;

  container.innerHTML = `
    <div class="glass-panel p-5 rounded-3xl border border-indigo-500/40 space-y-4 animate-fade-in">
      <div class="flex items-center justify-between pb-3 border-b border-slate-700/60">
        <h4 class="font-bold text-white text-sm flex items-center gap-2">
          <span>📝</span> ${data.title}
        </h4>
        <span class="text-[11px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">⏰ ${data.best_time || "18:30"}</span>
      </div>

      <div class="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed">
        ${data.content}
      </div>

      <div class="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300">
        <strong>🎯 Harakatga chaqiruv (CTA):</strong> ${data.cta}
      </div>

      <div class="flex flex-wrap gap-1.5 text-xs text-slate-400">
        ${(data.hashtags || []).map(h => `<span class="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-indigo-400">${h}</span>`).join("")}
      </div>

      <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
        <span class="text-[11px] text-slate-400">Emojilar: ${(data.emoji_recommendations || []).join(" ")}</span>
        <button onclick="copyToClipboard('${fullText.replace(/'/g, "\\'").replace(/\n/g, "\\n")}')" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all">
          Postni Nusxalash 📋
        </button>
      </div>
    </div>
  `;
}

// ----------------- 2. REELS GENERATOR -----------------
async function handleReelsGen(e) {
  e.preventDefault();
  const payload = {
    business_type: document.getElementById("reelsBizType")?.value || "Biznes",
    product_service: document.getElementById("reelsProduct")?.value || "Mahsulot",
    goal: document.getElementById("reelsGoal")?.value || "Viral reach",
    platform: "Instagram Reels",
    topic: document.getElementById("reelsTopic")?.value || ""
  };

  setBtnLoading("btnSubmitReels", true, "Reels Ssenariysi Tuzilmoqda...");
  try {
    const res = await API.generateReels(payload);
    renderReelsResult(res.output);
    refreshUsage();
    showToast("Reels ssenariysi tayyor! 🎬", "success");
  } catch (err) {}
  finally { setBtnLoading("btnSubmitReels", false); }
}

function renderReelsResult(data) {
  const container = document.getElementById("reelsResultContainer");
  if (!container) return;

  let timelineHtml = "";
  (data.timeline_scenes || []).forEach(sc => {
    timelineHtml += `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
        <div class="md:col-span-2 font-bold text-indigo-400">${sc.time}</div>
        <div class="md:col-span-4 text-slate-300"><strong>Kadr:</strong> ${sc.visual_action}</div>
        <div class="md:col-span-3 text-amber-300"><strong>Yozuv:</strong> ${sc.text_on_screen}</div>
        <div class="md:col-span-3 text-purple-300"><strong>Ovoz:</strong> ${sc.voice_over}</div>
      </div>
    `;
  });

  const fullReelsText = `🎬 REELS: ${data.idea_title}\n🎣 Hook: ${data.hook}\n\n🎙 Voice-over:\n${data.voice_over}\n\n📄 Caption:\n${data.caption}\n\n🎯 CTA: ${data.cta}\n🏷 ${(data.hashtags || []).join(" ")}`;

  container.innerHTML = `
    <div class="glass-panel p-5 rounded-3xl border border-rose-500/40 space-y-4 animate-fade-in">
      <div class="flex items-center justify-between pb-3 border-b border-slate-700/60">
        <div>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">Viral Ssenariy</span>
          <h4 class="font-bold text-white text-base mt-1">${data.idea_title}</h4>
        </div>
        <button onclick="copyToClipboard('${fullReelsText.replace(/'/g, "\\'").replace(/\n/g, "\\n")}')" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700">
          Nusxalash 📋
        </button>
      </div>

      <div class="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-xs">
        <span class="font-extrabold text-rose-400 uppercase tracking-wider text-[10px]">🎣 3 Soniyalik Hook:</span>
        <p class="text-rose-200 font-bold mt-1 text-sm">${data.hook}</p>
      </div>

      <div class="space-y-2">
        <h5 class="text-xs font-bold text-slate-300 uppercase tracking-wider">⏱ Kadrlar va Montaj:</h5>
        ${timelineHtml}
      </div>

      <div class="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        <strong>🎙 To'liq Voice-over:</strong>
        <p class="mt-1 leading-relaxed text-slate-200">${data.voice_over}</p>
      </div>

      <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
        <span>🎵 <strong>Musiqa:</strong> ${data.audio_suggestion}</span>
        <span>🎯 <strong>CTA:</strong> ${data.cta}</span>
      </div>
    </div>
  `;
}

// ----------------- 3. CONTENT PLAN GENERATOR -----------------
async function handlePlanGen(e) {
  e.preventDefault();
  const payload = {
    business_type: document.getElementById("planBizType")?.value || "Biznes",
    platform: "Instagram",
    goal: document.getElementById("planGoal")?.value || "Sotuv",
    duration_days: parseInt(document.getElementById("planDuration")?.value || "7"),
    business_name: document.getElementById("planBizName")?.value || "",
    audience: document.getElementById("planAudience")?.value || "",
    tone: document.getElementById("planTone")?.value || ""
  };

  setBtnLoading("btnSubmitPlan", true, `${payload.duration_days} Kunlik Reja Tuzilmoqda...`);
  try {
    const res = await API.generateContentPlan(payload);
    lastGeneratedPlanData = res.output;
    renderPlanResult(res.output);
    refreshUsage();
    showToast(`${payload.duration_days} kunlik reja tayyor! 📅`, "success");
  } catch (err) {}
  finally { setBtnLoading("btnSubmitPlan", false); }
}

function renderPlanResult(data) {
  const container = document.getElementById("planResultContainer");
  if (!container) return;

  let tableRows = "";
  (data.days || []).forEach((d, idx) => {
    tableRows += `
      <tr class="border-b border-slate-800 hover:bg-slate-800/40 text-xs transition-colors">
        <td class="p-3 font-bold text-indigo-400 whitespace-nowrap">${d.date_label}</td>
        <td class="p-3 whitespace-nowrap"><span class="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-semibold">${d.content_type}</span></td>
        <td class="p-3 font-medium text-white">${d.topic}</td>
        <td class="p-3 text-indigo-300 italic">"${d.hook}"</td>
        <td class="p-3 text-slate-300 max-w-xs truncate">${d.caption}</td>
        <td class="p-3 text-rose-300 whitespace-nowrap">${d.cta}</td>
        <td class="p-3 text-slate-400 whitespace-nowrap">${d.recommended_time}</td>
      </tr>
    `;
  });

  container.innerHTML = `
    <div class="glass-panel p-5 rounded-3xl border border-purple-500/40 space-y-4 animate-fade-in">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
        <div>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">${data.duration_days} Kunlik Kontent Kalendar</span>
          <h4 class="font-bold text-white text-base mt-1">${data.business_type} — Strategik Reja</h4>
          <p class="text-xs text-slate-400 mt-0.5">${data.strategy_summary}</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="exportContentPlanToPDF(lastGeneratedPlanData)" class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all">
            PDF Yuklash 📄
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <th class="p-3">Kun</th>
              <th class="p-3">Format</th>
              <th class="p-3">Mavzu</th>
              <th class="p-3">Hook</th>
              <th class="p-3">Matn Qisqacha</th>
              <th class="p-3">CTA</th>
              <th class="p-3">Vaqt</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ----------------- 4. HASHTAG GENERATOR -----------------
async function handleHashtagGen(e) {
  e.preventDefault();
  const payload = {
    business_type: document.getElementById("hashBizType")?.value || "Biznes",
    product_service: document.getElementById("hashProduct")?.value || "Xizmat",
    city: document.getElementById("hashCity")?.value || "Toshkent",
    platform: "Instagram"
  };

  setBtnLoading("btnSubmitHashtags", true, "Hashtaglar Saralanmoqda...");
  try {
    const res = await API.generateHashtags(payload);
    renderHashtagsResult(res.output);
    refreshUsage();
    showToast("Hashtaglar tayyor! 🏷", "success");
  } catch (err) {}
  finally { setBtnLoading("btnSubmitHashtags", false); }
}

function renderHashtagsResult(data) {
  const container = document.getElementById("hashtagsResultContainer");
  if (!container) return;

  const cats = data.categories || {};
  const catNames = [
    { key: "high_competition", label: "🔥 Yuqori Qamrovli (High Competition)", color: "text-rose-400" },
    { key: "medium_competition", label: "⚡ O'rta Raqobatli (Medium Competition)", color: "text-amber-400" },
    { key: "niche", label: "🎯 Tor Sohaviy (Niche)", color: "text-indigo-400" },
    { key: "local", label: "📍 Mahalliy / Shahar (Local)", color: "text-emerald-400" },
    { key: "branded", label: "✨ Brendli (Branded)", color: "text-purple-400" }
  ];

  let catsHtml = "";
  catNames.forEach(c => {
    const list = cats[c.key] || [];
    const listText = list.join(" ");
    catsHtml += `
      <div class="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
        <div class="flex items-center justify-between">
          <span class="font-bold text-xs ${c.color}">${c.label} (${list.length})</span>
          <button onclick="copyToClipboard('${listText}')" class="text-[11px] text-slate-400 hover:text-white font-semibold">Nusxalash 📋</button>
        </div>
        <div class="flex flex-wrap gap-1.5">
          ${list.map(t => `<span class="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 cursor-pointer hover:border-indigo-500" onclick="copyToClipboard('${t}', '${t} nusxalandi')">${t}</span>`).join("")}
        </div>
      </div>
    `;
  });

  const allText = (data.all_hashtags || []).join(" ");

  container.innerHTML = `
    <div class="glass-panel p-5 rounded-3xl border border-cyan-500/40 space-y-4 animate-fade-in">
      <div class="flex items-center justify-between pb-3 border-b border-slate-700/60">
        <div>
          <h4 class="font-bold text-white text-base">Toifalangan Hashtaglar To'plami</h4>
          <p class="text-xs text-slate-400 mt-0.5">${data.summary}</p>
        </div>
        <button onclick="copyToClipboard('${allText}')" class="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all">
          Hammasini Nusxalash (${data.all_hashtags?.length || 0}) 📋
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${catsHtml}
      </div>
    </div>
  `;
}

// ----------------- 5. AD COPY GENERATOR -----------------
async function handleAdCopyGen(e) {
  e.preventDefault();
  const payload = {
    business_type: document.getElementById("adBizType")?.value || "Biznes",
    product_service: document.getElementById("adProduct")?.value || "Mahsulot",
    target_audience: document.getElementById("adAudience")?.value || "Mijozlar",
    offer: document.getElementById("adOffer")?.value || "20% chegirma"
  };

  setBtnLoading("btnSubmitAdCopy", true, "Reklama Matnlari Yozilmoqda...");
  try {
    const res = await API.generateAdCopy(payload);
    renderAdCopyResult(res.output);
    refreshUsage();
    showToast("Reklama matnlari tayyor! 📣", "success");
  } catch (err) {}
  finally { setBtnLoading("btnSubmitAdCopy", false); }
}

function renderAdCopyResult(data) {
  const container = document.getElementById("adCopyResultContainer");
  if (!container) return;

  const renderCard = (title, badge, verData, borderCol) => {
    const text = `${verData.hook}\n\n${verData.body}\n\n🎯 ${verData.cta}`;
    return `
      <div class="glass-card p-4 rounded-2xl border ${borderCol} flex flex-col justify-between space-y-3">
        <div>
          <div class="flex items-center justify-between pb-2 border-b border-slate-700/60">
            <h5 class="font-bold text-white text-xs">${title}</h5>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${badge}">${title.split(" ")[0]}</span>
          </div>
          <div class="mt-2 space-y-2 text-xs">
            <p class="font-bold text-indigo-300">🎣 ${verData.hook}</p>
            <p class="text-slate-300 whitespace-pre-line leading-relaxed">${verData.body}</p>
            <p class="text-rose-300 font-semibold">🎯 ${verData.cta}</p>
          </div>
        </div>
        <button onclick="copyToClipboard('${text.replace(/'/g, "\\'").replace(/\n/g, "\\n")}')" class="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-semibold transition-all">
          Ushbu Variantni Nusxalash 📋
        </button>
      </div>
    `;
  };

  container.innerHTML = `
    <div class="glass-panel p-5 rounded-3xl border border-amber-500/40 space-y-4 animate-fade-in">
      <div class="pb-3 border-b border-slate-700/60">
        <h4 class="font-bold text-white text-base">3 Xil Variantdagi Reklama Matnlari (A/B Test)</h4>
        <p class="text-xs text-slate-400 mt-0.5">💡 Targeting tavsiyasi: ${data.target_recommendations}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${renderCard("Short (Qisqa)", "bg-emerald-500/20 text-emerald-300", data.short_version, "border-emerald-500/30")}
        ${renderCard("Medium (O'rtacha)", "bg-amber-500/20 text-amber-300", data.medium_version, "border-amber-500/30")}
        ${renderCard("Long (Batafsil)", "bg-purple-500/20 text-purple-300", data.long_version, "border-purple-500/30")}
      </div>
    </div>
  `;
}

// ----------------- 6. AI IMAGE PROMPT GENERATOR -----------------
async function handleImagePromptGen(e) {
  e.preventDefault();
  const payload = {
    product_or_post_description: document.getElementById("imgDesc")?.value || "Mahsulot fotosurati",
    style_preference: document.getElementById("imgStyle")?.value || "Photorealistic, 8k",
    brand_colors: document.getElementById("imgColors")?.value || ""
  };

  setBtnLoading("btnSubmitImagePrompt", true, "Promptlar Yaratilmoqda...");
  try {
    const res = await API.generateImagePrompt(payload);
    renderImagePromptResult(res.output);
    refreshUsage();
    showToast("Image promptlar tayyor! 🎨", "success");
  } catch (err) {}
  finally { setBtnLoading("btnSubmitImagePrompt", false); }
}

function renderImagePromptResult(data) {
  const container = document.getElementById("imagePromptResultContainer");
  if (!container) return;

  const prompts = data.prompts || {};
  const promptList = [
    { label: "📸 Instagram Post (1:1)", text: prompts.instagram_post },
    { label: "📱 Instagram Story (9:16)", text: prompts.instagram_story },
    { label: "🎬 Reels Cover (9:16)", text: prompts.reels_cover },
    { label: "🛍 Product Studio Shot (1:1)", text: prompts.product_photo },
    { label: "📣 Advertisement (4:5)", text: prompts.advertisement },
    { label: "✨ Lifestyle Photo (4:5)", text: prompts.lifestyle_photo }
  ];

  let itemsHtml = "";
  promptList.forEach(p => {
    itemsHtml += `
      <div class="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
        <div class="flex items-center justify-between">
          <span class="font-bold text-xs text-emerald-400">${p.label}</span>
          <button onclick="copyToClipboard('${p.text.replace(/'/g, "\\'")}', 'Prompt nusxalandi')" class="text-[11px] text-slate-400 hover:text-white font-semibold">Copy 📋</button>
        </div>
        <p class="text-xs text-slate-300 font-mono bg-slate-900/80 p-2 rounded-lg border border-slate-800/80 select-all">${p.text}</p>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="glass-panel p-5 rounded-3xl border border-emerald-500/40 space-y-4 animate-fade-in">
      <div class="pb-3 border-b border-slate-700/60">
        <h4 class="font-bold text-white text-base">Professional AI Rasm Promptlari (Midjourney / DALL-E 3)</h4>
        <p class="text-xs text-slate-400 mt-0.5">💡 ${data.lighting_and_camera_tips}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${itemsHtml}
      </div>

      <div class="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-xs">
        <div class="flex items-center justify-between">
          <span class="font-bold text-rose-400">🚫 Negative Prompt:</span>
          <button onclick="copyToClipboard('${data.negative_prompt.replace(/'/g, "\\'")}')" class="text-[11px] text-slate-400 hover:text-white font-semibold">Copy 📋</button>
        </div>
        <p class="text-slate-300 font-mono mt-1 text-[11px] select-all">${data.negative_prompt}</p>
      </div>
    </div>
  `;
}

// ----------------- 7. AUDIENCE ANALYZER -----------------
async function handleAudienceGen(e) {
  e.preventDefault();
  const payload = {
    business_name: document.getElementById("audBizName")?.value || "",
    business_type: document.getElementById("audBizType")?.value || "Biznes",
    product_service: document.getElementById("audProduct")?.value || "Xizmat",
    price_segment: document.getElementById("audSegment")?.value || "O'rtacha",
    location: "O'zbekiston"
  };

  setBtnLoading("btnSubmitAudience", true, "Auditoriya Tahlil Qilinmoqda...");
  try {
    const res = await API.generateAudience(payload);
    renderAudienceResult(res.output);
    refreshUsage();
    showToast("Auditoriya tahlili tayyor! 🎯", "success");
  } catch (err) {}
  finally { setBtnLoading("btnSubmitAudience", false); }
}

function renderAudienceResult(data) {
  const container = document.getElementById("audienceResultContainer");
  if (!container) return;

  container.innerHTML = `
    <div class="glass-panel p-6 rounded-3xl border border-blue-500/40 space-y-5 animate-fade-in">
      <div class="pb-3 border-b border-slate-700/60">
        <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">Targeting Report</span>
        <h4 class="font-bold text-white text-lg mt-1">Ideal Mijoz Portreti (Customer Avatar)</h4>
        <p class="text-xs text-slate-300 mt-1 leading-relaxed">${data.ideal_customer}</p>
        <div class="mt-2 text-xs text-blue-400 font-semibold">Yosh segmenti: ${data.age_segment}</div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div class="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
          <h5 class="font-bold text-rose-400 flex items-center gap-1.5"><span>⚡</span> Asosiy Og'riqlar (Pain Points):</h5>
          <ul class="space-y-1 text-slate-300 list-disc list-inside">
            ${(data.pain_points || []).map(p => `<li>${p}</li>`).join("")}
          </ul>
        </div>

        <div class="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
          <h5 class="font-bold text-emerald-400 flex items-center gap-1.5"><span>🎯</span> Asosiy Ehtiyojlar (Core Needs):</h5>
          <ul class="space-y-1 text-slate-300 list-disc list-inside">
            ${(data.core_needs || []).map(n => `<li>${n}</li>`).join("")}
          </ul>
        </div>

        <div class="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
          <h5 class="font-bold text-amber-400 flex items-center gap-1.5"><span>🔥</span> Sotib Olishga Undovchi Omillar (Triggers):</h5>
          <ul class="space-y-1 text-slate-300 list-disc list-inside">
            ${(data.buying_triggers || []).map(t => `<li>${t}</li>`).join("")}
          </ul>
        </div>

        <div class="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
          <h5 class="font-bold text-purple-400 flex items-center gap-1.5"><span>💡</span> Marketing Burchaklari (Marketing Angles):</h5>
          <ul class="space-y-1 text-slate-300 list-disc list-inside">
            ${(data.marketing_angles || []).map(a => `<li>${a}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  `;
}
