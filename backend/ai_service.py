"""
SMM AI Service - AI generatsiya mantiqi, Gemini/OpenAI API integratsiyasi va aqlli shablon dvigateli.
"""

import json
import random
import os
import httpx
from typing import Dict, Any, List, Optional
from backend.templates_data import NICHE_TEMPLATES, CREATIVE_REELS_TEMPLATES, STORIES_FUNNEL_TEMPLATES


class AISMMService:
    def __init__(self):
        self.default_language = "uz"

    async def generate_7day_plan(
        self,
        niche: str,
        target_audience: str,
        tone: str,
        goal: str,
        language: str = "uz",
        brand_name: str = "",
        api_key: Optional[str] = None,
        model_provider: str = "auto"
    ) -> Dict[str, Any]:
        """
        7 kunlik to'liq Instagram kontent-rejasini generatsiya qiladi.
        """
        # Agar haqiqiy Gemini API kalit berilgan bo'lsa, Gemini API ga murojaat qilamiz
        if api_key and (model_provider == "gemini" or model_provider == "auto"):
            try:
                gemini_result = await self._call_gemini_api(
                    api_key=api_key,
                    niche=niche,
                    target_audience=target_audience,
                    tone=tone,
                    goal=goal,
                    language=language,
                    brand_name=brand_name
                )
                if gemini_result:
                    return gemini_result
            except Exception as e:
                print(f"[Gemini API Error, falling back to smart engine]: {e}")

        # Aks holda aqlli lokal generatsiya dvigatelidan foydalanamiz
        return self._generate_smart_local_plan(
            niche=niche,
            target_audience=target_audience,
            tone=tone,
            goal=goal,
            language=language,
            brand_name=brand_name
        )

    async def regenerate_single_day(
        self,
        day_number: int,
        niche: str,
        target_audience: str,
        tone: str,
        goal: str,
        language: str = "uz",
        brand_name: str = "",
        content_type: Optional[str] = None,
        api_key: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Faqat bitta kunlik postni qayta generatsiya qiladi.
        """
        day_names = {
            1: "Dushanba", 2: "Seshanba", 3: "Chorshanba",
            4: "Payshanba", 5: "Juma", 6: "Shanba", 7: "Yakshanba"
        }
        
        types = ["Reels (Viral)", "Karusel (Foydali)", "Yagona Rasm / Infografika", "Stories Interaktiv", "Sotuv Posti", "Mijoz Fikri", "Ko'ngilochar / Humor"]
        chosen_type = content_type or types[(day_number - 1) % len(types)]
        
        brand_str = f"'{brand_name}' brendi" if brand_name else "Brendimiz"
        
        # Aqlli lokal variant
        hooks = [
            f"Buni ko'rgandan keyin {niche} haqidagi fikringiz 180 gradusga o'zgaradi! 🔥",
            f"Nega aynan hozir {niche} sohasida bu narsa eng muhim? (Bilib oling)",
            f"{brand_str} bilan yangi darajaga chiqing — mana isboti! 🚀"
        ]
        
        caption = (
            f"✨ {day_names.get(day_number, 'Bugun')} uchun maxsus post!\n\n"
            f"{target_audience} uchun {niche} sohasidagi eng dolzarb masalalardan birini ko'rib chiqamiz.\n\n"
            f"Muloqot uslubimiz: {tone}. Bizning asosiy maqsadimiz — {goal}.\n\n"
            f"💡 Asosiy xulosa: sifatli natijaga erishish uchun doim tizimli yondashuv kerak.\n\n"
            f"Siz bu borada qanday fikrdasiz? Fikringizni izohlarda yozib qoldiring! 👇"
        )
        
        cta = "Batafsil ma'lumot olish yoki buyurtma berish uchun Direct'ga yozing! 📲"
        visual = f"High aesthetic professional photography illustrating {niche} topic, natural studio lighting, ultra HD 8k, modern composition."
        
        clean_niche = "".join(c for c in niche if c.isalnum() or c.isspace()).lower().replace(" ", "")
        hashtags = [f"#{clean_niche}", "#smmtoshkent", "#instagramuz", "#marketinguz", f"#{clean_niche}uz", "#toshkent"]
        
        return {
            "day": day_number,
            "day_name": day_names.get(day_number, f"{day_number}-kun"),
            "type": chosen_type,
            "title": f"{niche} bo'yicha yangilangan {day_names.get(day_number, '')} posti",
            "hooks": hooks,
            "caption": caption,
            "cta": cta,
            "visual_prompt": visual,
            "hashtags": hashtags,
            "best_time": "18:00 - 19:30"
        }

    async def generate_creative_reels(
        self,
        topic: str,
        niche: str,
        tone: str = "Trendbop / Dinamik",
        language: str = "uz"
    ) -> List[Dict[str, Any]]:
        """
        Virusli Reels ssenariylari yaratadi (vaqtlar, harakatlar, matnlar va musiqa).
        """
        results = []
        for template in CREATIVE_REELS_TEMPLATES:
            item = dict(template)
            item["custom_topic"] = topic or niche
            results.append(item)
        return results

    async def generate_stories_funnel(
        self,
        product_or_service: str,
        niche: str,
        goal: str = "Sotuv",
        language: str = "uz"
    ) -> List[Dict[str, Any]]:
        """
        5 bosqichli Stories sotuv voronkasi yaratadi.
        """
        return STORIES_FUNNEL_TEMPLATES

    async def generate_viral_hooks(
        self,
        topic: str,
        niche: str,
        count: int = 10,
        language: str = "uz"
    ) -> List[Dict[str, str]]:
        """
        Mavzu bo'yicha 10 xil viral sarlavhalar / ilmoqlar to'plami.
        """
        hook_types = [
            ("Qiziqish / Sir", f"Hech kim aytmaydigan {topic or niche} siri fosh bo'ldi... 🤫"),
            ("Ogohlantirish / Xato", f"🛑 Agar {topic or niche}da bu xatoga yo'l qo'ysangiz, darhol to'xtating!"),
            ("Natija / Keys", f"Qanday qilib 0 dan {topic or niche} orqali aqlbovar qilmas natijaga erishish mumkin? 🚀"),
            ("Raqamlar / Ro'yxat", f"{topic or niche} bo'yicha 99% odam bilmaydigan 3 ta qoida 📋"),
            ("Kutilmagan fikr", f"Nega ko'pchilikning {topic or niche} bo'yicha qilayotgan ishlari samarasiz? 👀"),
            ("Savol / Munozara", f"Siz ham {topic or niche}da shu qiyinchilikka duch kelasizmi? 🤔"),
            ("Transformatsiya", f"Atigi 7 kunda {topic or niche}ni tubdan o'zgartirish usuli ✨"),
            ("Trend / Yangilik", f"2026-yilning {topic or niche} bo'yicha eng qaynoq trendlari 🔥"),
            ("Qiyoslash", f"{topic or niche}: Arzon usul vs Professional usul (farqini ko'ring)"),
            ("To'g'ridan-to'g'ri chaqiruv", f"Bu postni ko'rgandan keyin {topic or niche}ga bo'lgan qarashingiz butunlay o'zgaradi!")
        ]
        return [{"type": ht[0], "hook": ht[1]} for ht in hook_types[:count]]

    async def optimize_caption(
        self,
        draft_text: str,
        tone: str = "Sotuvchan va Jozibador",
        add_emojis: bool = True
    ) -> Dict[str, str]:
        """
        Foydalanuvchi matnini AIDA formulasi asosida yaxshilab, emojilar va kuchli CTA qo'shadi.
        """
        paragraphs = [p.strip() for p in draft_text.split("\n") if p.strip()]
        hook = f"🔥 {paragraphs[0]}" if paragraphs else "🔥 Diqqatga sazovor yangilik!"
        body = "\n\n".join(paragraphs[1:]) if len(paragraphs) > 1 else draft_text
        
        enhanced = (
            f"{hook}\n\n"
            f"{body}\n\n"
            f"✨ Sifat va ishonch — bizning bosh maqsadimiz!\n\n"
            f"👇 Savollaringiz bormi? Izohlarda qoldiring yoki to'g'ridan-to'g'ri Direct'ga yozing!"
        )
        return {
            "original": draft_text,
            "optimized": enhanced,
            "cta_suggestion": "Batafsil ma'lumot olish uchun 'BATAFSIL' deb yozing 📲",
            "recommended_hashtags": "#instagramsmm #kopirayting #biznes #uzbekistan #toshkent"
        }

    # ================= PRIVATE HELPER METHODS =================

    def _generate_smart_local_plan(
        self,
        niche: str,
        target_audience: str,
        tone: str,
        goal: str,
        language: str,
        brand_name: str
    ) -> Dict[str, Any]:
        """
        Boyitilgan lokal intellektual generator.
        """
        # Standart andozalardan mosini qidirish
        niche_key = "restaurant"
        niche_lower = niche.lower()
        if any(w in niche_lower for w in ["kiyim", "moda", "fashion", "butik", "ko'ylak", "clothes"]):
            niche_key = "clothing"
        elif any(w in niche_lower for w in ["talim", "ta'lim", "it", "kurs", "dasturlash", "maktab", "ielts", "study", "education"]):
            niche_key = "education"
        
        template_pack = NICHE_TEMPLATES.get(niche_key, {}).get("uz", NICHE_TEMPLATES["restaurant"]["uz"])
        sample_posts = template_pack["sample_content"]
        
        brand_display = brand_name if brand_name else niche.capitalize()
        
        generated_days = []
        for post in sample_posts:
            p_copy = dict(post)
            # Custom brand and niche moslashtirish
            if brand_name:
                p_copy["caption"] = p_copy["caption"].replace("Bizning", f"{brand_name}ning").replace("Bizda", f"{brand_name}da")
            
            # Agar foydalanuvchi boshqa soha kiritgan bo'lsa, moslashtirish
            if niche_key not in ["restaurant", "clothing", "education"]:
                p_copy["title"] = f"{niche} bo'yicha {p_copy['day_name']} rejasi"
                p_copy["visual_prompt"] = f"Aesthetic commercial photography for {niche}, target audience {target_audience}, modern clean studio lights."
            
            generated_days.append(p_copy)
            
        return {
            "brand_name": brand_display,
            "niche": niche,
            "target_audience": target_audience,
            "tone_of_voice": tone,
            "goal": goal,
            "language": language,
            "days_count": 7,
            "content_plan": generated_days,
            "weekly_summary": {
                "reels_count": 1,
                "carousel_count": 1,
                "single_posts_count": 2,
                "stories_count": 1,
                "sales_posts_count": 1,
                "interactive_count": 1
            },
            "strategy_tip": f"{niche} sohasida {target_audience} bilan muloqotda {tone} ohangidan foydalanish eng yuqori jalb qilish (Engagement Rate) ko'rsatkichini beradi."
        }

    async def _call_gemini_api(
        self,
        api_key: str,
        niche: str,
        target_audience: str,
        tone: str,
        goal: str,
        language: str,
        brand_name: str
    ) -> Optional[Dict[str, Any]]:
        """
        Google Gemini API (gemini-1.5-flash / gemini-2.0-flash) ga to'g'ridan-to'g'ri so'rov yuborish.
        """
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        
        system_instruction = (
            "Sen professional SMM strateg va Instagram kopiraytersan. "
            "Foydalanuvchi ma'lumotlari asosida 7 kunlik to'liq, sifatli, emojilar bilan boyitilgan, AIDA formulali "
            "kontent-reja tuzib berishing kerak. Faqat quyidagi JSON formatida javob qaytar."
        )
        
        prompt = f"""
        Quyidagi parametrlar bo'yicha Instagram uchun 7 kunlik to'liq kontent reja tuz:
        - Brend nomi: {brand_name or 'Noma`lum'}
        - Niche / Soha: {niche}
        - Maqsadli auditoriya: {target_audience}
        - Ohang (Tone of voice): {tone}
        - Hafta maqsadi: {goal}
        - Til: {language}

        Har bir kun uchun:
        1. day (1-7), day_name (Dushanba, Seshanba...)
        2. type (Reels, Karusel, Yagona Rasm, Stories, Sotuv posti, Mijoz fikri, Humor)
        3. title (Qisqa mavzu)
        4. hooks (3 ta kuchli ilmoq)
        5. caption (To'liq matn, kamida 3-4 paragraf, emojilar va AIDA formulasi bilan)
        6. cta (Aniq harakatga chaqiruv)
        7. visual_prompt (Fotosessiya yoki AI rasm generatori uchun inglizcha prompt)
        8. hashtags (6-8 ta aniq hashtag)
        9. best_time (Yuklash uchun qulay vaqt)

        Format JSON:
        {{
          "brand_name": "{brand_name}",
          "niche": "{niche}",
          "target_audience": "{target_audience}",
          "tone_of_voice": "{tone}",
          "goal": "{goal}",
          "language": "{language}",
          "days_count": 7,
          "content_plan": [
             {{ ...har bir kun ma'lumotlari... }}
          ],
          "strategy_tip": "Haftalik asosiy strategik maslahat"
        }}
        """

        payload = {
            "contents": [
                {
                    "parts": [{"text": prompt}]
                }
            ],
            "generationConfig": {
                "response_mime_type": "application/json",
                "temperature": 0.7
            }
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(url, json=payload)
            if response.status_code == 200:
                data = response.json()
                text_content = data["candidates"][0]["content"]["parts"][0]["text"]
                return json.loads(text_content)
        return None
