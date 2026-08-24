/**
 * Business Profile Controller
 */

function initProfile() {
  document.getElementById("businessProfileForm")?.addEventListener("submit", handleSaveProfile);
}

async function loadBusinessProfileData() {
  try {
    const profile = await API.getBusinessProfile();
    if (profile) {
      document.getElementById("profBizName").value = profile.business_name || "";
      document.getElementById("profBizType").value = profile.business_type || "";
      document.getElementById("profDesc").value = profile.description || "";
      document.getElementById("profAudience").value = profile.target_audience || "";
      document.getElementById("profTone").value = profile.tone || "Do'stona va samimiy";
      document.getElementById("profPlatform").value = profile.platform || "Instagram";

      // Auto pre-fill forms across generator tabs if inputs are empty
      prefillGeneratorInputs(profile);
    }
  } catch (err) {
    // If not created yet, ignore 404
  }
}

async function handleSaveProfile(e) {
  e.preventDefault();
  const payload = {
    business_name: document.getElementById("profBizName").value.trim(),
    business_type: document.getElementById("profBizType").value.trim(),
    description: document.getElementById("profDesc").value.trim(),
    target_audience: document.getElementById("profAudience").value.trim(),
    tone: document.getElementById("profTone").value,
    platform: document.getElementById("profPlatform").value
  };

  try {
    await API.saveBusinessProfile(payload);
    showToast("Biznes profil muvaffaqiyatli saqlandi! 💾", "success");
    prefillGeneratorInputs(payload);
  } catch (err) {}
}

function prefillGeneratorInputs(profile) {
  // Post generator prefill
  const pBizName = document.getElementById("postBizName");
  const pBizType = document.getElementById("postBizType");
  const pTone = document.getElementById("postTone");
  const pAudience = document.getElementById("postAudience");

  if (pBizName && !pBizName.value) pBizName.value = profile.business_name || "";
  if (pBizType && !pBizType.value) pBizType.value = profile.business_type || "";
  if (pTone) pTone.value = profile.tone || "Do'stona va samimiy";
  if (pAudience && !pAudience.value) pAudience.value = profile.target_audience || "";

  // Reels
  const rBizType = document.getElementById("reelsBizType");
  if (rBizType && !rBizType.value) rBizType.value = profile.business_type || "";

  // Plan
  const plBizType = document.getElementById("planBizType");
  const plBizName = document.getElementById("planBizName");
  if (plBizType && !plBizType.value) plBizType.value = profile.business_type || "";
  if (plBizName && !plBizName.value) plBizName.value = profile.business_name || "";
}
