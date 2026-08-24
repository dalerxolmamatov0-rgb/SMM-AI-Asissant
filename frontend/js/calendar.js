/**
 * Calendar and Interactive Schedule Module for AI SMM Assistant
 */

function renderCalendarView(plan) {
  const calendarContainer = document.getElementById("calendarContainer");
  if (!calendarContainer) return;

  if (!plan || !plan.content_plan || plan.content_plan.length === 0) {
    calendarContainer.innerHTML = `
      <div class="text-center py-16 text-slate-400">
        <svg class="w-16 h-16 mx-auto mb-4 text-slate-500 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <p class="text-lg font-medium">Hozircha taqvim bo'sh</p>
        <p class="text-sm mt-1">7 kunlik kontent-reja generatsiya qilganingizdan so'ng, bu yerda haftalik rejalashtiruvchi ochiladi.</p>
      </div>
    `;
    return;
  }

  let html = `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  `;

  plan.content_plan.forEach((post, index) => {
    const isReels = post.type.toLowerCase().includes("reels");
    const isCarousel = post.type.toLowerCase().includes("karusel");
    const isStories = post.type.toLowerCase().includes("stories");
    
    let typeBadgeColor = "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
    let iconSvg = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`;

    if (isReels) {
      typeBadgeColor = "bg-rose-500/20 text-rose-300 border-rose-500/30";
      iconSvg = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`;
    } else if (isCarousel) {
      typeBadgeColor = "bg-amber-500/20 text-amber-300 border-amber-500/30";
      iconSvg = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>`;
    } else if (isStories) {
      typeBadgeColor = "bg-purple-500/20 text-purple-300 border-purple-500/30";
      iconSvg = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    }

    html += `
      <div class="glass-panel p-4 rounded-2xl border border-slate-700/60 hover:border-indigo-500/50 transition-all flex flex-col justify-between group">
        <div>
          <!-- Header -->
          <div class="flex items-center justify-between pb-3 border-b border-slate-700/50">
            <span class="font-bold text-white text-base flex items-center gap-2">
              <span class="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-xs text-indigo-400 font-extrabold">${index + 1}</span>
              ${post.day_name}
            </span>
            <span class="text-xs px-2.5 py-1 rounded-full border flex items-center gap-1 font-medium ${typeBadgeColor}">
              ${iconSvg}
              ${post.type.split(" ")[0]}
            </span>
          </div>

          <!-- Body Preview -->
          <div class="mt-3">
            <h4 class="text-sm font-semibold text-slate-200 line-clamp-1 group-hover:text-indigo-300 transition-colors">${post.title}</h4>
            <p class="text-xs text-indigo-400 font-medium mt-1.5 line-clamp-2">🎣 ${post.hooks ? post.hooks[0] : ""}</p>
            <p class="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">${post.caption}</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-4 pt-3 border-t border-slate-700/40 flex items-center justify-between">
          <div class="text-[11px] text-slate-400 flex items-center gap-1">
            <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ${post.best_time || "18:00"}
          </div>
          <div class="flex items-center gap-1">
            <button onclick="copyPostToClipboard(${index})" class="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-300 transition-all border border-slate-700/60" title="Nusxalash">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            </button>
            <button onclick="openPostModal(${index})" class="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all text-xs font-semibold px-2.5 flex items-center gap-1">
              Batafsil
            </button>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  calendarContainer.innerHTML = html;
}
