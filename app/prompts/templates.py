"""
SMM AI Assistant - Prompt Shablonlari (Prompt Templates)
"""

def get_post_prompt(data: dict) -> str:
    return f"""
Quyidagi ma'lumotlar asosida bitta to'liq, mukammal Instagram/ijtimoiy tarmoq posti yarat:
- Biznes nomi: {data.get('business_name') or 'Biznes'}
- Biznes turi: {data.get('business_type')}
- Mahsulot / Xizmat: {data.get('product_service')}
- Platforma: {data.get('platform', 'Instagram')}
- Maqsad: {data.get('goal')}
- Auditoriya: {data.get('audience', 'Barcha')}
- Ohang (Tone of Voice): {data.get('tone', 'Do`stona')}
- Post mavzusi: {data.get('topic')}

Qat'iy JSON formatida javob ber:
{{
  "title": "Post sarlavhasi (kuchli va diqqatni tortuvchi)",
  "content": "To'liq post matni (AIDA formulasi, emojilar va xatboshilar bilan)",
  "cta": "Aniq va kuchli Harakatga chaqiruv (Call to Action)",
  "hashtags": ["#teg1", "#teg2", "#teg3", "#teg4", "#teg5", "#teg6"],
  "emoji_recommendations": ["🔥", "✨", "🚀", "📲"],
  "best_time": "Yuklash uchun eng yaxshi vaqt (masalan: 18:30 - 20:00)"
}}
"""

def get_reels_prompt(data: dict) -> str:
    return f"""
Quyidagi biznes uchun virusli (viral) Reels / TikTok video g'oyasi va to'liq ssenariysini yarat:
- Biznes turi: {data.get('business_type')}
- Mahsulot / Xizmat: {data.get('product_service')}
- Maqsad: {data.get('goal')}
- Platforma: {data.get('platform', 'Instagram Reels')}
- Mavzu: {data.get('topic') or 'Umumiy ommabop'}

Qat'iy JSON formatida javob ber:
{{
  "idea_title": "Reels g'oyasi nomi",
  "hook": "Birinchi 0-3 soniyalik virusli ilmoq (Hook) matni va harakati",
  "video_script": "To'liq video ssenariysi qisqacha bayoni",
  "timeline_scenes": [
    {{"time": "0:00 - 0:03", "visual_action": "Kadrda nima ko'rinadi", "text_on_screen": "Ekranda chiqadigan matn", "voice_over": "Ovozli diktor matni"}},
    {{"time": "0:03 - 0:12", "visual_action": "Muammo yoki qiziq jarayon", "text_on_screen": "Matn", "voice_over": "Matn"}},
    {{"time": "0:12 - 0:22", "visual_action": "Yechim va mahsulot", "text_on_screen": "Matn", "voice_over": "Matn"}},
    {{"time": "0:22 - 0:30", "visual_action": "Yakuniy CTA", "text_on_screen": "Matn", "voice_over": "Matn"}}
  ],
  "voice_over": "To'liq voice-over diktor matni",
  "cta": "Video oxiridagi chaqiruv",
  "caption": "Reels ostiga yoziladigan qisqa va qiziqarli caption",
  "hashtags": ["#reelsuz", "#trend", "#viral", "#biznes"],
  "audio_suggestion": "Tavsiya etiladigan musiqiy ritm / trend audio turi"
}}
"""

def get_content_plan_prompt(data: dict) -> str:
    days = data.get('duration_days', 7)
    return f"""
Quyidagi biznes uchun {days} kunlik to'liq, balanslangan Instagram kontent-rejasini yarat:
- Biznes turi: {data.get('business_type')}
- Platforma: {data.get('platform', 'Instagram')}
- Maqsad: {data.get('goal')}
- Davomiyligi: {days} kun
- Biznes nomi: {data.get('business_name', '')}
- Auditoriya: {data.get('audience', '')}
- Ohang: {data.get('tone', '')}

Har bir kun uchun turlicha kontent formati (Reels, Karusel, Stories, Infografika, Sotuv posti, Mijoz fikri, Humor) taqsimlansin.
Qat'iy JSON formatida javob ber:
{{
  "business_type": "{data.get('business_type')}",
  "duration_days": {days},
  "strategy_summary": "Haftalik yoki oylik asosiy marketing strategiyasi qisqacha xulosasi",
  "days": [
    {{
      "day_number": 1,
      "date_label": "1-kun (Dushanba)",
      "content_type": "Reels (Viral)",
      "topic": "Post mavzusi",
      "hook": "Ilmoq / sarlavha",
      "caption": "To'liq post matni",
      "cta": "Harakatga chaqiruv",
      "format_type": "Video Reels / 9:16",
      "hashtags": ["#teg1", "#teg2", "#teg3"],
      "recommended_time": "13:00 - 14:30"
    }}
    // ... jami {days} ta kun obyekti
  ]
}}
"""

def get_hashtag_prompt(data: dict) -> str:
    return f"""
Quyidagi biznes uchun relevant va toifalangan Instagram hashtaglar to'plamini yarat:
- Biznes turi: {data.get('business_type')}
- Mahsulot / Xizmat: {data.get('product_service')}
- Shahar / Hudud: {data.get('city', 'Toshkent')}
- Platforma: {data.get('platform', 'Instagram')}

Qat'iy JSON formatida javob ber:
{{
  "summary": "Hashtag strategiyasi bo'yicha qisqa tavsiya",
  "categories": {{
    "high_competition": ["#teg1", "#teg2", "#teg3", "#teg4", "#teg5"],
    "medium_competition": ["#teg6", "#teg7", "#teg8", "#teg9", "#teg10"],
    "niche": ["#teg11", "#teg12", "#teg13", "#teg14", "#teg15"],
    "local": ["#toshkent", "#uzbekistan", "#samarqand", "#uzb"],
    "branded": ["#brendteg1", "#brendteg2"]
  }},
  "all_hashtags": ["#teg1", "#teg2", "...jamlangan ro'yxat"]
}}
"""

def get_ad_copy_prompt(data: dict) -> str:
    return f"""
Quyidagi mahsulot / taklif uchun 3 xil uzunlikdagi (Short, Medium, Long) konversiyali reklama matnlari (Ad Copy) yarat:
- Biznes turi: {data.get('business_type')}
- Mahsulot / Xizmat: {data.get('product_service')}
- Maqsadli auditoriya: {data.get('target_audience')}
- Maxsus taklif / Aksiya: {data.get('offer')}
- Platforma: {data.get('platform', 'Target Reklama')}

Qat'iy JSON formatida javob ber:
{{
  "short_version": {{
    "hook": "Qisqa ilmoq",
    "body": "Qisqa reklama matni (1-2 gap)",
    "cta": "Aniq chaqiruv"
  }},
  "medium_version": {{
    "hook": "O'rtacha ilmoq",
    "body": "O'rtacha reklama matni (3-4 gap, afzalliklar bilan)",
    "cta": "Kuchli chaqiruv"
  }},
  "long_version": {{
    "hook": "Storytelling ilmoq",
    "body": "To'liq, batafsil sotuv matni (Og'riq, yechim, dalillar)",
    "cta": "Batafsil chaqiruv"
  }},
  "target_recommendations": "Targeting sozlamalari bo'yicha tavsiya (yosh, qiziqishlar)"
}}
"""

def get_image_prompt(data: dict) -> str:
    return f"""
Quyidagi post yoki mahsulot tavsifi uchun professional ingliz tilidagi AI Image Prompts (Midjourney, DALL-E 3, Stable Diffusion formatida) va Negative Prompt yarat:
- Tavsif: {data.get('product_or_post_description')}
- Uslub / Style: {data.get('style_preference', 'Photorealistic, 8k')}
- Brend ranglari: {data.get('brand_colors', '')}

Qat'iy JSON formatida javob ber:
{{
  "prompts": {{
    "instagram_post": "Professional 1:1 square prompt in English with camera details, lighting and aesthetics",
    "instagram_story": "Vertical 9:16 story aesthetic prompt in English",
    "reels_cover": "Eye-catching reels cover prompt with high contrast subject",
    "product_photo": "Clean commercial studio product photography prompt on podium",
    "advertisement": "High conversion marketing visual prompt with negative space for text",
    "lifestyle_photo": "Authentic candid lifestyle photography prompt"
  }},
  "negative_prompt": "blurry, low quality, distorted anatomy, text artifacts, extra limbs, bad lighting, oversaturated",
  "lighting_and_camera_tips": "Kamera linzasi, yorug'lik va render bo'yicha tavsiyalar"
}}
"""

def get_audience_prompt(data: dict) -> str:
    return f"""
Quyidagi biznes uchun professional Maqsadli Auditoriya Tahlili (Target Audience Analysis) hisoboti yarat:
- Biznes nomi: {data.get('business_name', 'Biznes')}
- Biznes turi: {data.get('business_type')}
- Mahsulot / Xizmat: {data.get('product_service')}
- Narx segmenti: {data.get('price_segment', 'O`rtacha')}
- Joylashuv: {data.get('location', 'O`zbekiston')}

Qat'iy JSON formatida javob ber:
{{
  "ideal_customer": "Ideal mijoz portreti (Avatar)",
  "age_segment": "Asosiy yosh toifasi (masalan: 22-38 yosh)",
  "interests": ["Qiziqish 1", "Qiziqish 2", "Qiziqish 3", "Qiziqish 4"],
  "pain_points": ["Asosiy og'riqli nuqta 1", "Muammo 2", "Muammo 3"],
  "core_needs": ["Ehtiyoj 1", "Ehtiyoj 2", "Ehtiyoj 3"],
  "buying_triggers": ["Sotib olishga undovchi omil 1", "Omil 2", "Omil 3"],
  "content_reaction": "Auditoriyaning qaysi turdagi kontentga eng ko'p reaksiya berishi",
  "marketing_angles": ["Marketing burchagi 1", "Marketing burchagi 2", "Marketing burchagi 3"]
}}
"""
