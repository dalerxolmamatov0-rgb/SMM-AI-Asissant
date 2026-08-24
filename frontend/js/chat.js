/**
 * AI Marketing Assistant Chat Controller
 */

function initChat() {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const clearBtn = document.getElementById("btnClearChat");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    appendChatMessage("user", text, true, false);
    
    // Typing indicator
    const typingId = appendChatTyping();

    try {
      const res = await API.sendChatMessage(text);
      removeChatTyping(typingId);
      // Ketma-ket jonli yozilish (Typewriter Streaming animation)
      appendChatMessage("assistant", res.response, true, true);
    } catch (err) {
      removeChatTyping(typingId);
      appendChatMessage("assistant", "⚠️ Kechirasiz, javob olishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.", true, false);
    }
  });

  clearBtn?.addEventListener("click", async () => {
    if (confirm("Haqiqatan ham chat tarixini tozalashni xohlaysizmi?")) {
      try {
        await API.clearChatHistory();
      } catch {}
      const container = document.getElementById("chatMessagesContainer");
      if (container) container.innerHTML = "";
      showToast("Chat tarixi tozalandi", "info");
      loadDefaultWelcomeChat();
    }
  });
}

function sendQuickChatPrompt(promptText) {
  const input = document.getElementById("chatInput");
  if (input) {
    input.value = promptText;
    const form = document.getElementById("chatForm");
    if (form) {
      form.dispatchEvent(new Event("submit"));
    }
  }
}

async function loadChatHistory() {
  const container = document.getElementById("chatMessagesContainer");
  if (!container) return;

  try {
    const messages = await API.getChatHistory();
    container.innerHTML = "";
    if (!messages || messages.length === 0) {
      loadDefaultWelcomeChat();
      return;
    }

    messages.forEach(m => {
      appendChatMessage(m.role, m.message, false, false);
    });
    scrollChatBottom();
  } catch (err) {
    loadDefaultWelcomeChat();
  }
}

/**
 * Matnni chiroyli kartalar, stikerlar va ajratilgan qismlar ko'rinishiga keltirish
 */
function formatChatMarkdown(text) {
  if (!text) return "";
  let formatted = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Qalin matn **text** -> chiroyli oq va rangli yozuv
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
  
  // Qiya matn *text* -> yorqinroq urg'u
  formatted = formatted.replace(/\*([^\*]+)\*/g, '<em class="text-indigo-300 font-medium not-italic">$1</em>');

  // Nuqtali ro'yxatlar (• yoki -) -> chiroyli neon yulduzcha va bo'shliqlar bilan
  formatted = formatted.replace(/^[•\-\*]\s+(.*)$/gm, '<div class="flex items-start gap-2 my-1.5 pl-1"><span class="text-indigo-400 font-bold text-sm leading-none mt-0.5">✦</span><span class="flex-1 text-slate-200 leading-relaxed">$1</span></div>');

  // Raqamli qadamlar (1., 2., 3.) -> chiroyli gradient nishonchalar va ajratuvchi chiziqlar bilan
  formatted = formatted.replace(/^(\d+)\.\s+(.*)$/gm, '<div class="flex items-start gap-2.5 my-2.5 pt-2 border-t border-slate-800/80 first:border-t-0 first:pt-0"><span class="w-5 h-5 rounded-lg bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20 mt-0.5">$1</span><div class="flex-1 leading-relaxed">$2</div></div>');

  return formatted;
}

function loadDefaultWelcomeChat() {
  const container = document.getElementById("chatMessagesContainer");
  if (!container) return;

  container.innerHTML = `
    <div class="space-y-4 max-w-2xl">
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
          <div class="w-full h-full bg-[#131314] rounded-[10px] flex items-center justify-center text-white text-xs font-bold">
            AI
          </div>
        </div>
        <div class="glass-panel bg-[#131314]/90 p-4 rounded-2xl border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-2 shadow-xl">
          <p class="font-medium">Assalomu alaykum! Men sizning shaxsiy <strong class="text-white font-bold">AI Marketing va SMM Maslahatchingizman</strong>. 🚀</p>
          <p class="text-slate-300">Instagram sahifangizni rivojlantirish, Reels strategiyalari, Target reklama sozlash, AIDA voronkalari yoki sotuvlarni oshirish bo'yicha istalgan savolingizni bering!</p>
        </div>
      </div>

      <!-- Quick Starter Prompts -->
      <div class="pl-11 space-y-2">
        <p class="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
          <span>💡</span> <span>Tezkor savollar (bir marta bosing):</span>
        </p>
        <div class="flex flex-wrap gap-2">
          <button type="button" onclick="sendQuickChatPrompt('Reels videolarim qanday qilib tavsiyalarga (Explore) chiqishi mumkin?')" class="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/40 text-[11px] font-medium transition-all shadow-sm flex items-center gap-1.5">
            <span>🎬</span> <span>Reels tavsiyalarga chiqishi</span>
          </button>
          <button type="button" onclick="sendQuickChatPrompt('Instagram sahifamda faol obunachilarni organik ko\\'paytirish sirlari qanday?')" class="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/40 text-[11px] font-medium transition-all shadow-sm flex items-center gap-1.5">
            <span>📈</span> <span>Obunachilarni ko'paytirish</span>
          </button>
          <button type="button" onclick="sendQuickChatPrompt('Target reklama byudjetini qanday to\\'g\\'ri taqsimlash kerak?')" class="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/40 text-[11px] font-medium transition-all shadow-sm flex items-center gap-1.5">
            <span>🎯</span> <span>Target reklama sozlash</span>
          </button>
          <button type="button" onclick="sendQuickChatPrompt('Sotuvlarni 2 barobar oshirish uchun AIDA formulasi bo\\'yicha reja tuzib ber')" class="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/40 text-[11px] font-medium transition-all shadow-sm flex items-center gap-1.5">
            <span>💰</span> <span>AIDA sotuv voronkasi</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function appendChatMessage(role, text, shouldScroll = true, animate = false) {
  const container = document.getElementById("chatMessagesContainer");
  if (!container) return;

  const isUser = role === "user";
  const wrapper = document.createElement("div");
  wrapper.className = `flex items-start gap-3 max-w-2xl ${isUser ? "ml-auto flex-row-reverse" : ""}`;

  const avatar = isUser
    ? `<div class="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">Siz</div>`
    : `<div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
         <div class="w-full h-full bg-[#131314] rounded-[10px] flex items-center justify-center text-white text-xs font-bold">AI</div>
       </div>`;

  const bubbleClass = isUser
    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl rounded-tr-none p-3.5 text-xs leading-relaxed shadow-lg shadow-indigo-600/20"
    : "glass-panel bg-[#131314]/90 border border-slate-800/90 text-slate-200 rounded-2xl rounded-tl-none p-4 text-xs leading-relaxed shadow-xl";

  const bubbleContentId = `msg_content_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const copyBtnId = `copy_btn_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const copyBtnHtml = !isUser
    ? `<div id="${copyBtnId}" class="${animate ? 'hidden' : ''} mt-3 pt-2.5 border-t border-slate-800/60 flex justify-end">
         <button onclick="copyToClipboard('${text.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n")}')" class="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5 transition-colors">
           <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
           <span>Nusxalash</span>
         </button>
       </div>`
    : "";

  wrapper.innerHTML = `
    ${avatar}
    <div class="${bubbleClass} min-w-[120px]">
      <div id="${bubbleContentId}" class="whitespace-pre-line space-y-1"></div>
      ${copyBtnHtml}
    </div>
  `;

  container.appendChild(wrapper);
  const contentEl = document.getElementById(bubbleContentId);

  if (isUser) {
    contentEl.innerText = text;
    if (shouldScroll) scrollChatBottom();
  } else if (animate) {
    // Jonli ketma-ket yozilish animatsiyasi (Typewriter Effect)
    typewriteAssistantMessage(text, contentEl, () => {
      const copyBtn = document.getElementById(copyBtnId);
      if (copyBtn) copyBtn.classList.remove("hidden");
    });
  } else {
    contentEl.innerHTML = formatChatMarkdown(text);
    if (shouldScroll) scrollChatBottom();
  }
}

/**
 * Jonli yozilish (Typewriter Effect) funksiyasi
 */
function typewriteAssistantMessage(fullText, bubbleEl, onComplete) {
  const words = fullText.split(" ");
  let currentIdx = 0;
  let currentText = "";

  const cursor = document.createElement("span");
  cursor.className = "inline-block w-1.5 h-3.5 bg-indigo-400 ml-1 rounded-sm animate-pulse align-middle";

  bubbleEl.innerHTML = "";
  bubbleEl.appendChild(cursor);

  const interval = setInterval(() => {
    // Har bir qadamda 1-2 tadan so'z qo'shish
    const step = Math.min(2, words.length - currentIdx);
    for (let i = 0; i < step; i++) {
      currentText += (currentIdx === 0 && i === 0 ? "" : " ") + words[currentIdx + i];
    }
    currentIdx += step;

    bubbleEl.innerHTML = formatChatMarkdown(currentText);
    bubbleEl.appendChild(cursor);
    scrollChatBottom();

    if (currentIdx >= words.length) {
      clearInterval(interval);
      cursor.remove();
      bubbleEl.innerHTML = formatChatMarkdown(fullText);
      if (typeof onComplete === "function") onComplete();
      scrollChatBottom();
    }
  }, 22);
}

function appendChatTyping() {
  const container = document.getElementById("chatMessagesContainer");
  if (!container) return null;

  const id = `typing_${Date.now()}`;
  const wrapper = document.createElement("div");
  wrapper.id = id;
  wrapper.className = "flex items-start gap-3 max-w-2xl";
  wrapper.innerHTML = `
    <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
      <div class="w-full h-full bg-[#131314] rounded-[10px] flex items-center justify-center text-white text-xs font-bold">AI</div>
    </div>
    <div class="glass-panel bg-[#131314]/90 p-3.5 rounded-2xl border border-slate-800 text-xs text-indigo-300 flex items-center gap-1.5 shadow-lg">
      <span class="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></span>
      <span class="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]"></span>
      <span class="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]"></span>
      <span class="text-[11px] text-slate-400 ml-1.5 font-medium">O'ylamoqda...</span>
    </div>
  `;
  container.appendChild(wrapper);
  scrollChatBottom();
  return id;
}

function removeChatTyping(id) {
  if (id) {
    document.getElementById(id)?.remove();
  }
}

function scrollChatBottom() {
  const container = document.getElementById("chatMessagesContainer");
  if (container) container.scrollTop = container.scrollHeight;
}
