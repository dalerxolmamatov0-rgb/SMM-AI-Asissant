/**
 * Generation History Controller
 */

let allHistoryItems = [];

function initHistory() {
  document.getElementById("historyFilterType")?.addEventListener("change", (e) => {
    loadHistoryData(e.target.value);
  });
}

async function loadHistoryData(typeFilter = "") {
  const container = document.getElementById("historyListContainer");
  if (!container) return;

  container.innerHTML = `<div class="p-8 text-center text-slate-400 text-xs">Tarix yuklanmoqda... ⏳</div>`;

  try {
    const params = { limit: 50 };
    if (typeFilter) params.type = typeFilter;

    const data = await API.getHistory(params);
    allHistoryItems = data || [];

    if (allHistoryItems.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 text-slate-500 text-xs">
          Hech qanday generatsiya topilmadi.
        </div>
      `;
      return;
    }

    let html = `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
    allHistoryItems.forEach(item => {
      const dateStr = new Date(item.created_at).toLocaleDateString("uz-UZ", {
        month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
      });

      let preview = JSON.stringify(item.output_data);
      if (item.type === "post") preview = item.output_data?.title || item.output_data?.content;
      else if (item.type === "reels") preview = item.output_data?.idea_title;
      else if (item.type === "content_plan") preview = `${item.output_data?.duration_days} kunlik reja (${item.output_data?.business_type})`;
      else if (item.type === "hashtags") preview = (item.output_data?.all_hashtags || []).slice(0, 8).join(" ");
      else if (item.type === "ad_copy") preview = item.output_data?.short_version?.hook;
      else if (item.type === "image_prompt") preview = item.output_data?.prompts?.instagram_post;
      else if (item.type === "audience") preview = item.output_data?.ideal_customer;

      html += `
        <div class="glass-card p-4 rounded-2xl flex flex-col justify-between space-y-3 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group" onclick="openHistoryItemTask('${item.id}')">
          <div>
            <div class="flex items-center justify-between pb-2 border-b border-slate-700/60">
              <span class="text-[11px] text-slate-400 font-semibold">${dateStr}</span>
              ${getToolBadge(item.type)}
            </div>
            <p class="text-xs text-slate-200 mt-2 line-clamp-3 leading-relaxed group-hover:text-white transition-colors">${preview}</p>
          </div>
          <div class="flex items-center justify-between gap-2 pt-2 border-t border-slate-800" onclick="event.stopPropagation()">
            <button onclick="deleteHistoryEntry('${item.id}')" class="p-1.5 rounded-lg bg-rose-900/40 text-rose-300 hover:bg-rose-800 text-xs transition-all border border-rose-800/40" title="O'chirish">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
            <button onclick="openHistoryItemTask('${item.id}')" class="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5">
              <span>Vazifaga o'tish 🚀</span>
            </button>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;
  } catch (err) {}
}

/**
 * Tarixdagi vazifani to'g'ridan-to'g'ri o'zining asbobiga ochib berish
 */
function openHistoryItemTask(id) {
  const item = allHistoryItems.find(i => i.id === id);
  if (!item) return;

  const type = item.type;
  const data = item.output_data;

  if (type === "chat") {
    switchAppView("chatView");
    if (typeof scrollChatBottom === "function") scrollChatBottom();
    showToast("AI Marketing Chat ochildi! 💬", "info");
    return;
  }

  // Tools paneliga o'tish
  switchAppView("toolsView");

  if (type === "post") {
    activateToolTab("toolPanelPost");
    if (typeof renderPostResult === "function") renderPostResult(data);
    setTimeout(() => document.getElementById("postResultContainer")?.scrollIntoView({ behavior: "smooth" }), 100);
  } else if (type === "reels") {
    activateToolTab("toolPanelReels");
    if (typeof renderReelsResult === "function") renderReelsResult(data);
    setTimeout(() => document.getElementById("reelsResultContainer")?.scrollIntoView({ behavior: "smooth" }), 100);
  } else if (type === "content_plan") {
    activateToolTab("toolPanelPlan");
    if (typeof lastGeneratedPlanData !== "undefined") lastGeneratedPlanData = data;
    if (typeof renderPlanResult === "function") renderPlanResult(data);
    setTimeout(() => document.getElementById("planResultContainer")?.scrollIntoView({ behavior: "smooth" }), 100);
  } else if (type === "hashtags") {
    activateToolTab("toolPanelHashtags");
    if (typeof renderHashtagsResult === "function") renderHashtagsResult(data);
    setTimeout(() => document.getElementById("hashtagsResultContainer")?.scrollIntoView({ behavior: "smooth" }), 100);
  } else if (type === "ad_copy") {
    activateToolTab("toolPanelAdCopy");
    if (typeof renderAdCopyResult === "function") renderAdCopyResult(data);
    setTimeout(() => document.getElementById("adCopyResultContainer")?.scrollIntoView({ behavior: "smooth" }), 100);
  } else if (type === "image_prompt") {
    activateToolTab("toolPanelImagePrompt");
    if (typeof renderImagePromptResult === "function") renderImagePromptResult(data);
    setTimeout(() => document.getElementById("imagePromptResultContainer")?.scrollIntoView({ behavior: "smooth" }), 100);
  } else if (type === "audience") {
    activateToolTab("toolPanelAudience");
    if (typeof renderAudienceResult === "function") renderAudienceResult(data);
    setTimeout(() => document.getElementById("audienceResultContainer")?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  showToast("Qilingan vazifa natijasi ochildi! 🚀", "success");
}

function viewHistoryItemDetails(id) {
  openHistoryItemTask(id);
}

function closeHistoryModal() {
  document.getElementById("historyDetailModal")?.classList.add("hidden");
}

async function deleteHistoryEntry(id) {
  if (confirm("Ushbu yozuvni o'chirmoqchimisiz?")) {
    try {
      await API.deleteHistoryItem(id);
      showToast("Yozuv o'chirildi", "info");
      loadHistoryData(document.getElementById("historyFilterType")?.value || "");
    } catch (err) {}
  }
}
