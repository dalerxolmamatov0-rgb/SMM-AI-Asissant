import random
import re
from typing import Dict, Any, List, Optional
from app.providers.base import BaseAIProvider

class MockAIProvider(BaseAIProvider):
    """
    Mahalliy / Offline aqlli generator dvigateli (Mock AI Provider).
    API kalitsiz ham 100% to'liq va professional marketing kontentlarini yaratadi.
    """

    async def generate_post(self, data: Dict[str, Any]) -> Dict[str, Any]:
        business_name = data.get("business_name") or data.get("business_type", "Brend")
        product = data.get("product_service", "mahsulot")
        topic = data.get("topic", "dolzarb mavzu")
        tone = data.get("tone", "Do'stona")
        goal = data.get("goal", "Sotuv")
        clean_tag = re.sub(r'[^a-zA-Z0-9]', '', business_name.lower()) or "biznes"

        titles = [
            f"🔥 {topic} haqida bilishingiz kerak bo'lgan eng muhim haqiqat!",
            f"✨ {business_name}: Nega aynan {product} sizning eng to'g'ri tanlovingiz?",
            f"🚀 {product} orqali yangi darajaga chiqing — mana isboti!",
            f"🤫 {business_name}dan hech kim kutmagan maxsus yangilik!"
        ]

        content = (
            f"✨ Do'stlar, bugun sizlar bilan {topic} haqida so'zlashamiz!\n\n"
            f"Har birimiz uchun sifat, ishonch va qulaylik birinchi o'rinda turadi. Aynan shuning uchun bizning {product} "
            f"eng yuqori standartlarga javob beradigan qilib yaratilgan.\n\n"
            f"💡 Nima uchun aynan biz?\n"
            f"1️⃣ 100% kafolatlangan sifat va professional yondashuv\n"
            f"2️⃣ Hamyonbop narxlar va qulay yetkazib berish/xizmat\n"
            f"3️⃣ Minglab mamnun mijozlarimizning samimiy ishonchi.\n\n"
            f"Biz bilan maqsadingizga tezroq va osonroq erishing! Siz bu borada qanday fikrdasiz? Fikringizni izohlarda yozib qoldiring! 👇"
        )

        cta = f"Hoziroq Direct'ga '{clean_tag.upper()}' deb yozing yoki bio-dagi link orqali buyurtma bering! 📲"
        hashtags = [f"#{clean_tag}", "#toshkent", "#uzbekistan", "#smmuz", "#biznesuz", f"#{clean_tag}uz", "#sifatli"]

        return {
            "title": random.choice(titles),
            "content": content,
            "cta": cta,
            "hashtags": hashtags,
            "emoji_recommendations": ["🔥", "✨", "🚀", "💡", "📲", "❤️"],
            "best_time": "18:30 - 20:00 (Eng faol vaqt)"
        }

    async def generate_reels(self, data: Dict[str, Any]) -> Dict[str, Any]:
        business_type = data.get("business_type", "Biznes")
        product = data.get("product_service", "mahsulot")
        clean_tag = re.sub(r'[^a-zA-Z0-9]', '', business_type.lower()) or "reels"

        return {
            "idea_title": f"3 soniyalik Ilmoq: {product} orqali hayotni yengillashtirish",
            "hook": f"🛑 Agar siz ham {product} izlayotgan bo'lsangiz, bu videoni o'tkazib yubormang!",
            "video_script": f"Kadrda muammo ko'rsatiladi, so'ng dinamik montaj bilan {business_type} yechimi va natijasi namoyish etiladi.",
            "timeline_scenes": [
                {
                    "time": "0:00 - 0:03",
                    "visual_action": "Kamera tomon shoshilib ishora qilish, diqqatni tortuvchi imo-ishora",
                    "text_on_screen": "🛑 Buni ko'rmasdan oldin qaror qilmang!",
                    "voice_over": "Siz ham bu xatoga yo'l qo'yyapsizmi?"
                },
                {
                    "time": "0:03 - 0:12",
                    "visual_action": "Mijozning eng katta og'riqli nuqtasi va charchoqli holati",
                    "text_on_screen": "Ko'pchilik duch keladigan asosiy muammo...",
                    "voice_over": "Har kuni vaqt va pul sarflashdan charchadingizmi?"
                },
                {
                    "time": "0:12 - 0:22",
                    "visual_action": "Bizning mahsulotimiz bilan natija: yengillik, sifat va tabassum",
                    "text_on_screen": "Mana haqiqiy yechim! ✨",
                    "voice_over": "Biz taklif qilayotgan yechim bilan hammasi 2 barobar osonlashadi!"
                },
                {
                    "time": "0:22 - 0:30",
                    "visual_action": "Kameraga qarab chaqiruv va brend logotipi",
                    "text_on_screen": "Izohda 'START' deb yozing 👇",
                    "voice_over": "Hoziroq profilga o'ting va o'z imkoniyatingizni qo'ldan boy bermang!"
                }
            ],
            "voice_over": "Siz ham bu xatoga yo'l qo'yyapsizmi? Har kuni vaqt va pul sarflashdan charchadingizmi? Biz taklif qilayotgan yechim bilan hammasi 2 barobar osonlashadi! Hoziroq profilga o'ting!",
            "cta": "Ushbu Reels'ni do'stlaringizga ulashing va Direct'ga 'REELS' deb yozing! 📩",
            "caption": f"🔥 {product} bo'yicha eng samarali yo'l! Videoni saqlab qo'yishni unutmang 📌",
            "hashtags": [f"#{clean_tag}", "#reelsuz", "#toshkentreels", "#trenduz", "#marketing", "#viralreels"],
            "audio_suggestion": "Trenddagi ritmik lo-fi bass yoki dinamik elektron beat"
        }

    async def generate_content_plan(self, data: Dict[str, Any]) -> Dict[str, Any]:
        business_type = data.get("business_type", "Biznes")
        days_count = int(data.get("duration_days", 7))
        business_name = data.get("business_name") or business_type

        day_templates = [
            ("Reels (Viral)", "Ekspert siri va foydali maslahat", "30 soniyada o'rganing!", "Reels / 9:16", "12:30 - 14:00"),
            ("Karusel (Qo'llanma)", "Eng ko'p yo'l qo'yiladigan 5 xato", "Bu xatolarni qilmang 📌", "Karusel / 1:1", "18:00 - 19:30"),
            ("Yagona Rasm / Infografika", "Mahsulot afzalliklari va tafsilotlar", "Sifatning asl siri nimada?", "Post / 4:5", "13:00 - 14:30"),
            ("Stories Interaktiv", "Savol-javob va obunachilar so'rovnomasi", "Siz qaysi birini tanlaysiz?", "Stories / 9:16", "11:00 - 13:00"),
            ("Sotuv Posti (Offer)", "Hafta oxiri uchun maxsus taklif va aksiya", "Faqat 48 soat ichida chegirma! 🔥", "Post / 1:1", "10:30 - 12:00"),
            ("Mijoz Fikri (Social Proof)", "Haqiqiy mijoz natijasi va sharhi", "Bizni tanlaganlarning samimiy so'zlari ⭐️", "Karusel / 4:5", "16:00 - 18:00"),
            ("Ko'ngilochar / Humor", "Mavzuga oid yengil hazil va motivatsiya", "Yangi haftaga tayyormisiz? 😄", "Reels / 9:16", "20:00 - 21:30"),
        ]

        days_list = []
        for i in range(1, days_count + 1):
            tmpl = day_templates[(i - 1) % len(day_templates)]
            days_list.append({
                "day_number": i,
                "date_label": f"{i}-kun",
                "content_type": tmpl[0],
                "topic": f"{business_type}: {tmpl[1]}",
                "hook": tmpl[2],
                "caption": (
                    f"✨ {i}-kunlik post!\n\n"
                    f"{business_name} sifatida biz har kuni siz uchun eng yaxshisini ulashamiz.\n"
                    f"Bugungi mavzumiz: {tmpl[1]}.\n\n"
                    f"Batafsil ma'lumot olish uchun postni oxirigacha o'qing va saqlab oling! 📌"
                ),
                "cta": "Izohlarda o'z fikringizni bildiring yoki Direct'ga yozing! 📲",
                "format_type": tmpl[3],
                "hashtags": ["#smmtoshkent", "#kontentreja", "#biznesuz", "#marketing"],
                "recommended_time": tmpl[4]
            })

        return {
            "business_type": business_type,
            "duration_days": days_count,
            "strategy_summary": f"{business_type} uchun {days_count} kunlik balanslangan, ishonch va sotuvga yo'naltirilgan kontent matritsasi.",
            "days": days_list
        }

    async def generate_hashtags(self, data: Dict[str, Any]) -> Dict[str, Any]:
        business_type = data.get("business_type", "Biznes")
        product = data.get("product_service", "xizmat")
        city = data.get("city", "Toshkent")

        clean_b = re.sub(r'[^a-zA-Z0-9]', '', business_type.lower()) or "biznes"
        clean_p = re.sub(r'[^a-zA-Z0-9]', '', product.lower()) or "mahsulot"
        clean_c = re.sub(r'[^a-zA-Z0-9]', '', city.lower()) or "toshkent"

        high = ["#uzbekistan", "#toshkent", "#uzb", "#instagramuz", "#repostuz", "#uzbek"]
        medium = [f"#{clean_b}uz", f"#{clean_p}uz", "#smmtoshkent", "#biznesuz", "#onlinebozor", "#toshkentshop"]
        niche = [f"#{clean_b}", f"#{clean_p}", f"#{clean_b}toshkent", f"#{clean_p}toshkent", f"#{clean_p}narxlari"]
        local = [f"#{clean_c}", f"#{clean_c}city", f"#{clean_c}2026", "#samarqand", "#andijon", "#fargona"]
        branded = [f"#{clean_b}official", f"#{clean_p}uzbekistan", f"#{clean_b}brend"]

        all_tags = high + medium + niche + local + branded

        return {
            "summary": f"{business_type} sohasida Instagram algoritmlari uchun yuqori, o'rta va lokal hashtaglarning optimal kombinatsiyasi.",
            "categories": {
                "high_competition": high,
                "medium_competition": medium,
                "niche": niche,
                "local": local,
                "branded": branded
            },
            "all_hashtags": all_tags
        }

    async def generate_ad_copy(self, data: Dict[str, Any]) -> Dict[str, Any]:
        product = data.get("product_service", "mahsulot")
        offer = data.get("offer", "Maxsus chegirma")
        audience = data.get("target_audience", "barcha")

        return {
            "short_version": {
                "hook": f"🔥 Faqat bugun: {product} uchun {offer}!",
                "body": f"Eng sara sifat va qulay narxlar sizni kutmoqda. O'z imkoniyatingizni qo'ldan boy bermang!",
                "cta": "Hoziroq buyurtma bering! 📲"
            },
            "medium_version": {
                "hook": f"✨ {product} qidirib charchadingizmi? Siz uchun ajoyib yangilik bor!",
                "body": f"{audience} uchun maxsus ishlab chiqilgan taklif. {offer}. 100% sifat kafolati va tezkor yetkazib berish xizmati bilan.",
                "cta": "Batafsil ma'lumot olish uchun havolaga bosing yoki Direct'ga yozing! 🚀"
            },
            "long_version": {
                "hook": f"💡 Nega 5,000 dan ortiq mamnun mijozlar aynan bizning {product}imizni tanlashmoqda?",
                "body": (
                    f"Har bir inson uchun ishonchli tanlov qilish muhim. Ko'pincha sifatsiz mahsulotlar tufayli vaqt va pul behuda ketadi.\n\n"
                    f"Biz ushbu muammoni hal qildik! Bizning {product} bilan siz:\n"
                    f"✅ 1-kundan sezilarli natija olasiz\n"
                    f"✅ {offer} imkoniyatiga ega bo'lasiz\n"
                    f"✅ Professional qo'llab-quvvatlash xizmatidan foydalanasiz.\n\n"
                    f"Shoshiling, aksiya doirasidagi o'rinlar soni cheklangan!"
                ),
                "cta": "Hoziroq ro'yxatdan o'ting va maxsus bonusga ega bo'ling! 👇"
            },
            "target_recommendations": f"Yosh: 20-45 | Hudud: O'zbekiston | Qiziqishlar: {product}, xaridlar, sifatli xizmatlar."
        }

    async def generate_image_prompt(self, data: Dict[str, Any]) -> Dict[str, Any]:
        desc = data.get("product_or_post_description", "Modern product")
        style = data.get("style_preference", "Photorealistic, 8k, Studio lighting")
        colors = data.get("brand_colors", "Warm aesthetic tones")

        return {
            "prompts": {
                "instagram_post": f"High-end commercial Instagram post photography of {desc}, {colors}, soft diffused studio lighting, 8k resolution, photorealistic, elegant composition, shot on Hasselblad --ar 1:1",
                "instagram_story": f"Vertical aesthetic Instagram story visual representing {desc}, modern minimalist framing, ambient lighting, high contrast, clean negative space for typography --ar 9:16",
                "reels_cover": f"Dynamic eye-catching reels cover showcasing {desc}, bold volumetric cinematic lighting, ultra sharp focus, vibrant atmosphere --ar 9:16",
                "product_photo": f"Clean studio product packshot of {desc} placed on modern luxury marble pedestal, soft gradient background, commercial lighting, 35mm lens, hyper-detailed --ar 1:1",
                "advertisement": f"Compelling advertising visual featuring {desc}, energetic layout with subtle golden hour sunlight, professional color grading, award winning marketing photography --ar 4:5",
                "lifestyle_photo": f"Authentic candid lifestyle photography with {desc} integrated naturally into a cozy modern interior, shallow depth of field, warm cozy vibes, natural daylight --ar 4:5"
            },
            "negative_prompt": "blurry, low quality, bad anatomy, text, watermark, deformed, extra fingers, poor details, noise, oversaturated, ugly, cartoon",
            "lighting_and_camera_tips": "Kamera: 85mm f/1.8 portret yoki 50mm makro linza. Yorug'lik: Softbox 45 gradus burchakda va Rim lighting."
        }

    async def generate_audience_analysis(self, data: Dict[str, Any]) -> Dict[str, Any]:
        b_type = data.get("business_type", "Biznes")
        product = data.get("product_service", "mahsulot")

        return {
            "ideal_customer": f"{b_type} xizmatlaridan faol foydalanuvchi, sifat va tezlikni qadrlaydigan zamonaviy shahar aholisi.",
            "age_segment": "21 - 42 yosh (Asosiy to'lov qobiliyatiga ega auditoriya)",
            "interests": [
                f"{b_type} yangiliklari",
                "Shaxsiy qulaylik va zamonaviy servis",
                "Ijtimoiy tarmoqlar va trendlar",
                "Sifatli mahsulot va xizmatlar"
            ],
            "pain_points": [
                "Bozordagi sifatsiz mahsulotlar va ishonchsiz xizmatlar",
                "Vaqt yetishmasligi va uzoq kutish",
                "Yetarlicha aniq ma'lumot va narxlarning yo'qligi"
            ],
            "core_needs": [
                f"Tez va kafolatlangan {product} olish",
                "Samimiy va professional mijozlarga xizmat ko'rsatish",
                "Qulay to'lov va tezkor yetkazib berish"
            ],
            "buying_triggers": [
                "Ijtimoiy isbotlar (Mijozlarning video sharhlari va baholari)",
                "Cheklangan vaqtli maxsus chegirma yoki bonuslar",
                "Kafolat va xavfsiz xarid imkoniyati"
            ],
            "content_reaction": "Qisqa, dinamik Reels videolari va amaliy natijalarni ko'rsatuvchi Karusellar eng yuqori qamrov beradi.",
            "marketing_angles": [
                "Og'riqqa urg'u: 'Eskicha usullardan charchadingizmi?'",
                "Natijaga urg'u: 'Atigi 1 kunda hayotingizni yengillashtiring'",
                "Ekspertlik: 'Soha mutaxassislari nega bizni tavsiya qilishadi?'"
            ]
        }

    async def generate_chat_response(self, messages: List[Dict[str, str]], context: Optional[str] = None) -> str:
        last_msg = messages[-1]["content"].strip() if messages else "Salom"
        lower_msg = last_msg.lower()

        # 1. Salomlashish va Tanishtirish
        if any(w in lower_msg for w in ["salom", "assalom", "privet", "hello", "qalesiz", "kimsen", "nima qila olasan", "yordam ber", "vazifang"]):
            return (
                "👋 **Assalomu alaykum!** Men sizning shaxsiy **AI Marketing va SMM Konsultantingizman**.\n\n"
                "Men sizga quyidagi yo'nalishlarda professional darajada yordam bera olaman:\n"
                "• 🎬 **Reels & Video Strategiya:** Virusli g'oyalar, 3 soniyalik Hook'lar va ssenariylar tuzish\n"
                "• 📈 **Obunachilar & Qamrov:** Instagram va Telegramda organik o'sish usullari\n"
                "• 🎯 **Target Reklama:** Meta (Facebook/Instagram) reklamalarini to'g'ri sozlash va byudjetni tejash\n"
                "• 💰 **Sotuv Voronkasi (Funnels):** AIDA formulasi, mijozlar bilan ishlash va konversiyani oshirish\n"
                "• 📅 **Kontent Reja:** Haftalik va oylik professional SMM taqvimlar yaratish\n"
                "• ✍️ **Kopirayting:** Sotuvchi postlar va ta'sirchan sarlavhalar yozish\n\n"
                "Qaysi yo'nalish yoki biznesingiz bo'yicha savolingiz bor? Qisqacha yozing, birgalikda yechim topamiz! 🚀"
            )

        # 2. Reels va Video Strategiyasi
        if any(w in lower_msg for w in ["reels", "rils", "video", "hook", "trend", "tavsiya", "algoritm", "ssenariy", "kadr", "topga chiqish"]):
            return (
                f"🎬 **Reels orqali tavsiyalarga (Explore/Reels feed) chiqish bo'yicha ekspert tavsiyalari:**\n\n"
                f"1. **Birinchi 3 soniya (Hook):**\n"
                f"• Tomoshabin videoni o'tkazib yubormasligi uchun ekranda kutilmagan harakat, savol yoki muammoni ko'rsating.\n"
                f"• Misol: *'Buni bilmasdan pulingizni bekorga sarflayapsiz...'* yoki *'Siz bilmagan 3 ta maxfiy sir'*\n\n"
                f"2. **Ushlab qolish darajasi (Retention Rate):**\n"
                f"• Videoni 7-15 soniya atrofida qisqa va tezkor kadrlar bilan qiling. Har 2-3 soniyada kadr o'zgarishi aktivlikni 40% ga oshiradi.\n"
                f"• Subtitrlar (Captions) qo'shing — foydalanuvchilarning 70% dan ortig'i videoni ovozsiz ko'radi.\n\n"
                f"3. **Ulashish va Saqlab olish (Shares & Saves):**\n"
                f"• Foydali ma'lumot (cheklist, qo'llanma, retsept yoki lifehack) bering, toki odamlar uni do'stlariga jo'natishsin yoki saqlab olishsin.\n\n"
                f"4. **Aniq Harakatga Chaqiruv (CTA):**\n"
                f"• *'Foydali bo'lsa saqlab oling va profilga obuna bo'ling!'* yoki *'Fikringizni izohlarda yozib qoldiring'*\n\n"
                f"💡 Sizning biznesingiz uchun tayyor 3 ta virusli Reels ssenariysi tuzib berishimni xohlaysizmi?"
            )

        # 3. Obunachi ko'paytirish va Qamrov (Reach)
        if any(w in lower_msg for w in ["obunachi", "follower", "qamrov", "reach", "aktivlik", "ko'paytirish", "organik", "shadowban", "blok"]):
            return (
                f"📈 **Instagramda sifatli va faol obunachilarni organik ko'paytirish strategiyasi:**\n\n"
                f"1. **Profilni optimizatsiya qilish (Bio):**\n"
                f"• Ism qatoriga (Name) asosiy kalit so'zlarni yozing (masalan: *Toshkentda Mebel* yoki *SMM Xizmati*).\n"
                f"• Bio'da siz nima berishingiz va nima uchun sizga obuna bo'lish kerakligini 3 qatorda aniq ifodalang.\n\n"
                f"2. **Reels voronkasi (Top of Funnel):**\n"
                f"• Haftasiga kamida 4-5 ta Reels chiqaring. Har bir Reels yangi, sizni tanimaydigan sovuq auditoriyaga olib chiqadi.\n\n"
                f"3. **Stories orqali ishonch uyg'otish:**\n"
                f"• Kuniga 5-8 ta Stories chiqaring. Interaktiv elementlar (so'rovnomalar, testlar, savol-javob) orqali obunachilarni faollashtiring.\n\n"
                f"4. **Kollaboratsiya va Barter:**\n"
                f"• O'xshash auditoriyaga ega bo'lgan mikroboggerlar yoki do'stona profillar bilan qo'shma (Collaborator) postlar qiling.\n\n"
                f"Qaysi soha yoki biznes sahifasini rivojlantirmoqchisiz? Batafsil yozsangiz, unga mos reja tuzib beraman!"
            )

        # 4. Target Reklama va Meta Ads
        if any(w in lower_msg for w in ["target", "reklama", "ads", "facebook ads", "meta", "pixel", "byudjet", "lookalike", "retarget", "cpa", "cpc", "roas"]):
            return (
                f"🎯 **Target reklama (Meta Ads) orqali eng yuqori natija olish siri:**\n\n"
                f"1. **Kreativ (Video/Rasm) — eng muhim omil:**\n"
                f"• Hozirda Meta algoritmi yaxshi kreativga tayanadi. Bitta reklama guruhiga 3-4 xil formatdagi video va karusellar qo'shing.\n"
                f"• Videoning dastlabki 3 soniyasida mijozning og'riqli nuqtasini ko'rsating.\n\n"
                f"2. **Auditoriya taqsimoti:**\n"
                f"• **Sovuq auditoriya (Broad):** Keng qiziqishlar bo'yicha yangi mijozlarni jalb qilish.\n"
                f"• **Iliq auditoriya (Retargeting):** Oxirgi 30-90 kunda sahifangiz bilan aloqada bo'lganlarga maxsus taklif yoki aksiya ko'rsatish.\n\n"
                f"3. **Byudjet va Sinov (A/B Testing):**\n"
                f"• Dastlabki 3 kun kichik byudjet bilan qaysi kreativ arzonroq lid/xarid keltirayotganini tekshiring, so'ngra g'olib kreativga byudjetni oshiring (Scale).\n\n"
                f"4. **Direct / WhatsApp / Saytga yo'naltirish:**\n"
                f"• Directga kelgan mijozga 5 daqiqa ichida javob berish konversiyani 3 barobar oshiradi.\n\n"
                f"Sizga reklama matni (Ad Copy) yoki target auditoriyasi tahlilini tuzib beraymi?"
            )

        # 5. Sotuv va Konversiya (Sales Funnels)
        if any(w in lower_msg for w in ["sotuv", "savdo", "aida", "voronka", "mijoz", "konversiya", "e'tiroz", "lid", "zakaz", "sotish", "daromad"]):
            return (
                f"💰 **Sotuvlarni 2-3 barobarga oshirishning 4 bosqichli AIDA formulasi:**\n\n"
                f"1. **A — Attention (Diqqatni jalb qilish):**\n"
                f"• E'tiborni tortuvchi sarlavha: *'Nega ko'pchilik bu xatoga yo'l qo'yadi?'*\n\n"
                f"2. **I — Interest (Qiziqish uyg'otish):**\n"
                f"• Muammoni tushuntirish va uning oqibatlari haqida real misol keltirish.\n\n"
                f"3. **D — Desire (Istak va Ishonch):**\n"
                f"• Mahsulotingiz qanday qilib bu muammoni oson, tez va kafolatli hal qilishini ko'rsatish (Mijozlar natijalari, sharhlar, 'Oldin/Keyin').\n\n"
                f"4. **A — Action (Aniq Harakat):**\n"
                f"• Aniq va sodda qadam: *'Hoziroq Directga 'CHEGIRMA' so'zini yozing va 20% bonusga ega bo'ling!'*\n\n"
                f"Mijozlar ko'proq qaysi bosqichda to'xtab qolmoqda (e'tirozlar, narx, yoki murojaat kamligi)?"
            )

        # 6. Telegram Marketing
        if any(w in lower_msg for w in ["telegram", "kanal", "tg", "bot", "post"]):
            return (
                f"📱 **Telegram kanalni yuritish va monetizatsiya qilish bo'yicha qo'llanma:**\n\n"
                f"1. **Kanal Konsepsiyasi:** Aniq bir tor mavzuni (niche) tanlang. Hamma narsa haqidagi kanallar kam o'sadi.\n"
                f"2. **Formatlar xilma-xilligi:** Uzun matnlar emas, qisqa xulosalar, audio-xabarlar, so'rovnomalar va rasmli infografikalar bering.\n"
                f"3. **O'sish kanallari:** Boshqa kanallarda o'zaro PR (VP), kataloglar, Instagramdan Telegramga qiziqarli qo'llanma (Lead Magnet) orqali obunachi o'tkazish.\n"
                f"4. **Botlar bilan avtomatlashtirish:** Buyurtma olish va fikr-mulohaza qabul qilish uchun qulay botlarni integratsiya qiling.\n\n"
                f"Telegram kanalingiz uchun kontent-reja yoki post matni kerakmi?"
            )

        # 7. Kontent Reja va Strategiya
        if any(w in lower_msg for w in ["kontent", "reja", "plan", "mavzu", "g'oya", "rubrika", "stories"]):
            return (
                f"📅 **SMM Kontent Rejasini (70/20/10 qoidasi) to'g'ri taqsimlash:**\n\n"
                f"• **70% Foydali va Ekspertlik kontenti:** Lifehacklar, maslahatlar, mahsulotdan foydalanish sirlari, jamoa va jarayonlar.\n"
                f"• **20% Qiziqarli va Jalb qiluvchi (Engagement):** So'rovnomalar, trend memelar, 'Siz qaysi birini tanlaysiz?' o'yinlari.\n"
                f"• **10% To'g'ridan-to'g'ri Sotuv:** Aksiya, yangi to'plam, narxlar, cheklangan taklif va CTA.\n\n"
                f"Sahifangiz uchun 7 yoki 30 kunlik to'liq jadval tuzib berishim mumkin. Biznesingiz sohasini yozing!"
            )

        # 8. Umumiy / Boshqa Marketing va SMM Savollari (Intelligent Deep Reasoning)
        return (
            f"💡 **'{last_msg}' bo'yicha professional tahlil va amaliy tavsiyalarim:**\n\n"
            f"1. **Bozor va Raqobatchilar tahlili:**\n"
            f"• Ushbu yo'nalishda eng yaxshi ishlayotgan 3-5 ta raqobatchi sahifani tahlil qiling. Ularning eng ko'p ko'rilgan postlari va mijozlar savollariga e'tibor bering.\n\n"
            f"2. **Taklifni (Offer) kuchaytirish:**\n"
            f"• Mijozga shunchaki mahsulot emas, uning orqasidagi natija, kafolat yoki qulaylikni taqdim eting (masalan, bepul yetkazib berish yoki bonus sovg'a).\n\n"
            f"3. **Amaliy qadamlar (Action Plan):**\n"
            f"• 1-qadam: Mavzuga mos jalb qiluvchi qisqa video yoki karusel tayyorlash.\n"
            f"• 2-qadam: Direct va izohlarga tezkor javob berish tizimini yo'lga qo'yish.\n"
            f"• 3-qadam: Natijalarni (qamrov, kliklar, buyurtmalar) kuzatib, yaxshilab borish.\n\n"
            f"Ushbu mavzu bo'yicha sizga yana qanday qo'shimcha ma'lumot yoki tayyor matn/ssenariy kerak?"
        )

