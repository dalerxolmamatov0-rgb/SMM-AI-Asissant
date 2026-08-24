/**
 * Export and Toast Utilities
 */

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  const bgClass = type === "success"
    ? "bg-emerald-600/95 border-emerald-500 text-white"
    : type === "error"
    ? "bg-rose-600/95 border-rose-500 text-white"
    : "bg-indigo-600/95 border-indigo-500 text-white";

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-lg shadow-2xl transition-all duration-300 text-xs font-semibold ${bgClass}`;
  
  const icon = type === "success"
    ? `<svg class="w-4 h-4 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
    : `<svg class="w-4 h-4 text-rose-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function copyToClipboard(text, successMsg = "Matn nusxalandi! 📋") {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg, "success");
  }).catch(() => {
    showToast("Nusxalashda xatolik yuz berdi", "error");
  });
}

function exportContentPlanToPDF(planData) {
  if (!planData || !planData.days) {
    showToast("Eksport qilish uchun reja ma'lumotlari topilmadi", "error");
    return;
  }

  if (typeof window.jspdf === "undefined") {
    copyToClipboard(JSON.stringify(planData, null, 2), "Reja matni nusxalandi");
    return;
  }

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    let y = 15;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(99, 102, 241);
    doc.text(`AI SMM ASSISTANT - ${planData.duration_days} KUNLIK KONTENT REJA`, 14, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(`Biznes: ${planData.business_type} | Strategiya: ${planData.strategy_summary}`, 14, y);
    y += 8;

    doc.setDrawColor(226, 232, 240);
    doc.line(14, y, 196, y);
    y += 8;

    planData.days.forEach((day, idx) => {
      if (y > 250) {
        doc.addPage();
        y = 15;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      doc.text(`${day.date_label} — ${day.content_type} (${day.format_type})`, 14, y);
      y += 5;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(79, 70, 229);
      const hookText = doc.splitTextToSize(`Hook: ${day.hook}`, 180);
      doc.text(hookText, 14, y);
      y += (hookText.length * 4.5) + 2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      const capLines = doc.splitTextToSize(`Matn:\n${day.caption}`, 180);
      doc.text(capLines, 14, y);
      y += (capLines.length * 4.2) + 2;

      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      const ctaText = doc.splitTextToSize(`CTA: ${day.cta} | Vaqt: ${day.recommended_time}`, 180);
      doc.text(ctaText, 14, y);
      y += (ctaText.length * 4) + 5;

      doc.setDrawColor(241, 245, 249);
      doc.line(14, y, 196, y);
      y += 4;
    });

    doc.save(`smm_kontent_reja_${planData.duration_days}_kun.pdf`);
    showToast("PDF muvaffaqiyatli yuklab olindi! 📄", "success");
  } catch (err) {
    console.error("PDF error:", err);
    showToast("PDF eksportida xatolik", "error");
  }
}
