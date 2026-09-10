/**
 * AI SMM Assistant - Multilingual i18n System (Uzbek, English, Russian)
 * Covers 100% of Landing, Dashboard, Sidebar, 8 AI Tools, Pro Plans, History, Profile & Modals
 */

const translations = {
  uz: {
    // Header & Navbar
    app_title: "AI SMM <span class=\"gradient-text\">Assistant</span>",
    app_subtitle: "Professional SMM & Kontent Generatori",
    nav_login: "Kirish",
    nav_start_free: "Bepul Boshlash 🚀",
    nav_limit: "Oylik limit:",
    nav_logout: "Chiqish",
    header_free_badge: "Free MVP",

    // Sidebar Navigation
    nav_dashboard: "Dashboard",
    nav_tools: "AI Asboblar (Tools)",
    nav_pro: "SMM AI Pro",
    nav_chat: "AI Marketing Chat",
    nav_history: "Tarix (History)",
    nav_profile: "Biznes Profil",
    nav_feedback: "Shikoyat va Takliflar",
    sidebar_usage_title: "Oylik Foydalanish",
    sidebar_remaining_txt: "Qolgan generatsiyalar:",
    sidebar_remaining_unit: "ta",

    // Mobile Nav
    mob_home: "Asosiy",
    mob_tools: "Asboblar",
    mob_pro: "Pro Hub",
    mob_chat: "Chat",
    mob_history: "Tarix",
    mob_profile: "Profil",

    // Dashboard Home View
    dash_title: "Dashboard",
    dash_subtitle: "Xush kelibsiz! Kerakli AI asbobni tanlang va kontent yaratishni boshlang.",
    quick_post_title: "Post Yaratish",
    quick_post_sub: "AIDA matn & teglar",
    quick_reels_title: "Reels G'oyalari",
    quick_reels_sub: "Viral ssenariylar",
    quick_plan_title: "Kontent Reja",
    quick_plan_sub: "7/14/30 kunlik reja",
    quick_hash_title: "Hashtaglar",
    quick_hash_sub: "Toifalangan teglar",
    quick_ads_title: "Reklama Matni",
    quick_ads_sub: "Short, Medium, Long",
    quick_img_title: "Rasm Prompts",
    quick_img_sub: "Midjourney & DALL-E",
    quick_aud_title: "Auditoriya Tahlili",
    quick_aud_sub: "Ideal mijoz avatar",
    quick_chat_title: "Marketing Chat",
    quick_chat_sub: "AI Konsultant",
    recent_gen_title: "Oxirgi Generatsiyalar (Recent Generations)",
    recent_gen_view_all: "Barchasini ko'rish →",
    recent_gen_empty: "Hozircha hech qanday generatsiya yo'q. Yuqoridagi tugmalar orqali birinchi kontentingizni yarating! 🚀",
    btn_go_to_task: "Vazifaga o'tish 🚀",

    // Tools Tab Bar
    tab_tool_post: "📝 AI Post",
    tab_tool_reels: "🎬 Reels Ssenariy",
    tab_tool_plan: "📅 Kontent Reja",
    tab_tool_hash: "🏷 Hashtaglar",
    tab_tool_ads: "📣 Reklama (Ads)",
    tab_tool_img: "🎨 Image Prompts",
    tab_tool_aud: "🎯 Auditoriya",

    // Form Common Labels
    label_biz_name: "Biznes Nomi",
    label_biz_type: "Biznes Turi *",
    label_product_service: "Mahsulot / Xizmat *",
    label_topic: "Post Mavzusi *",
    label_tone: "Ohang (Tone)",
    label_goal: "Post Maqsadi",
    label_city: "Shahar / Hudud",
    label_duration: "Davomiylik (Kunlar) *",
    label_audience: "Maqsadli Auditoriya *",
    label_offer: "Maxsus Taklif / Chegirma *",
    label_img_desc: "Mahsulot yoki Post Vizual Tavsifi *",
    label_img_style: "Uslub (Style Preference)",
    label_img_colors: "Brend Ranglari",
    label_price_seg: "Mahsulot / Segment",

    // Placeholders
    ph_biz_name: "Masalan: 'Chustiyosh'",
    ph_biz_type: "Restoran, Kiyim do'koni, IT Kurs...",
    ph_product: "Masalan: Mualliflik bifsteksi, yangi kurs...",
    ph_topic: "Maxsus oshpaz siri va juma aksiyasi...",
    ph_reels_topic: "Masalan: 1 ta kiyim bilan 4 xil obraz...",
    ph_city: "Toshkent, Samarqand...",
    ph_ad_biz: "Ingliz tili kursi, Stomatologiya...",
    ph_ad_prod: "IELTS 7.5+ intensiv kursi...",
    ph_ad_aud: "Talabalar va xorijga ketuvchilar...",
    ph_ad_offer: "Birinchi 10 kishiga 25% chegirma...",
    ph_img_desc: "Nafis bej rangli qahva chashkasi va laptop shinam kafeda...",
    ph_img_style: "Photorealistic, Studio Lighting, 8k, Hasselblad",
    ph_img_colors: "Och pastel, oltin, qora...",
    ph_aud_biz: "Kompaniya nomi...",
    ph_aud_type: "Ko'chmas mulk agentligi, Fitnes klub...",
    ph_aud_prod: "Toshkent markazidagi premium xonadonlar...",

    // Form Option Texts
    tone_friendly: "Do'stona va ishtahani ochuvchi",
    tone_professional: "Ekspert va professional",
    tone_sales: "Savdoga yo'naltirilgan",
    goal_sales: "Sotuv va buyurtma olish",
    goal_followers: "Obunachi jalb qilish",
    goal_trust: "Ishonchni mustahkamlash",
    opt_7_days: "7 Kunlik Reja",
    opt_14_days: "14 Kunlik Reja",
    opt_30_days: "30 Kunlik Reja (To'liq Oy)",

    // Submit Buttons
    btn_gen_post: "Postni Generatsiya Qilish 🚀",
    btn_gen_reels: "Reels Ssenariy Yaratish 🎬",
    btn_gen_plan: "Kontent Kalendarni Yaratish 📅",
    btn_gen_hash: "Hashtaglarni Saralash 🏷",
    btn_gen_ads: "Reklama Matnlarini Yaratish 📣",
    btn_gen_img: "Image Promptlarni Yaratish 🎨",
    btn_gen_aud: "Auditoriyani Tahlil Qilish 🎯",
    btn_generating_text: "AI kontent yaratmoqda... ⏳",

    // SMM AI Pro View
    pro_title: "SMM AI Pro Tariflari",
    pro_subtitle: "Cheklovlarsiz kontent yarating, agentlik va biznesingizni yangi bosqichga olib chiqing.",
    plan1_badge: "1-Ta'rif",
    plan1_name: "Boshlang'ich Pro",
    plan1_sub: "Yangi boshlovchi va kichik loyihalar uchun",
    plan1_price: "30 000",
    plan1_unit: "so'm / oy",
    plan1_f1: "Oyiga 35 ta AI Generatsiya",
    plan1_f2: "7 kunlik Kontent Reja",
    plan1_f3: "Reels ssenariy va hooklar",
    plan1_f4: "Hashtag va Target matnlari",
    plan1_f5: "Standart AI server tezligi",
    plan1_btn: "30 000 so'm — Tanlash 🚀",

    plan2_badge: "⭐ Eng Mashhur / Tavsiya",
    plan2_badge_tier: "2-Ta'rif",
    plan2_name: "Standart Pro",
    plan2_sub: "Faol SMM mutaxassislar va o'suvchi brendlar uchun",
    plan2_price: "50 000",
    plan2_unit: "so'm / oy",
    plan2_f1: "Oyiga 50 ta AI Generatsiya",
    plan2_f2: "30 kunlik Auto-Pilot Kontent Kalendar",
    plan2_f3: "Raqobatchilarni AI Tahlili (Spy)",
    plan2_f4: "Maxsus Brend Ohangi (Tone of Voice)",
    plan2_f5: "PDF & Word eksport qilish",
    plan2_f6: "Turbo tezlikdagi AI Serverlar",
    plan2_btn: "50 000 so'm — Tanlash ⭐",

    plan3_badge: "👑 Maksimal VIP",
    plan3_badge_tier: "3-Ta'rif",
    plan3_name: "VIP Biznes Pro",
    plan3_sub: "Agentliklar, tadbirkorlar va yirik kompaniyalar uchun",
    plan3_price: "100 000",
    plan3_unit: "so'm / oy",
    plan3_f1: "Barcha Pro Imkoniyatlar + Cheksiz",
    plan3_f2: "24/7 Shaxsiy AI Marketing Strateg",
    plan3_f3: "5 tagacha Biznes Profilni boshqarish",
    plan3_f4: "Cheksiz Target Reklama & Voronkalar",
    plan3_f5: "Telegram Bot orqali Avto-Postlash",
    plan3_f6: "VIP Shaxsiy Menejer & Ustuvor Yordam",
    plan3_btn: "100 000 so'm — Tanlash 👑",

    // Chat View
    chat_title: "AI Marketing Konsultant",
    chat_online: "Online",
    chat_clear: "Tozalash 🗑",
    chat_placeholder: "Marketing, kontent yoki strategiya bo'yicha savolingizni yozing...",
    chat_send: "Yuborish 🚀",
    chat_welcome: "Assalomu alaykum! Men sizning shaxsiy AI Marketing yordamchingizman. SMM, kontent-reja, auditoriya tahlili yoki reklama strategiyasi bo'yicha qanday yordam bera olaman?",

    // History View
    history_title: "Generatsiyalar Tarixi (History)",
    history_sub: "Barcha yaratilgan postlar, ssenariylar va rejalaringiz ro'yxati.",
    history_filter_all: "Barchasi",
    history_filter_post: "Postlar",
    history_filter_reels: "Reels",
    history_filter_plan: "Rejalar",
    history_filter_hash: "Hashtaglar",
    history_filter_ads: "Reklama",
    history_filter_img: "Rasm Prompts",
    history_filter_aud: "Auditoriya",
    history_clear_all: "Barchasini tozalash 🗑",
    history_empty: "Generatsiyalar tarixi bo'sh. Yuqoridagi asboblar yordamida kontent yarating! 🚀",

    // Profile View
    profile_title: "Biznes Profil & Brend Ohangi",
    profile_sub: "Biznes ma'lumotlaringizni bir marta kiriting — AI barcha keyingi generatsiyalarda ularni avtomatik hisobga oladi.",
    profile_biz_name: "Biznes yoki Brend Nomi",
    profile_biz_type: "Biznes Sohasi / Turi",
    profile_desc: "Mahsulot yoki Xizmat Tavsifi",
    profile_aud: "Asosiy Maqsadli Auditoriya",
    profile_tone: "Brend Ohangi (Tone of Voice)",
    profile_platform: "Asosiy Ijtimoiy Tarmoq",
    profile_save_btn: "Biznes Profilni Saqlash 💾",
    profile_saved_toast: "Biznes profil ma'lumotlari muvaffaqiyatli saqlandi! 🎉",

    // Landing Sections
    hero_badge: "Sun'iy Intellekt Davrida SMM Yangi Bosqichda",
    hero_title_1: "AI yordamida SMM kontentingizni",
    hero_title_2: "bir necha soniyada",
    hero_title_3: "yarating.",
    hero_desc: "Postlar, virusli Reels g'oyalari, 7-30 kunlik kontent-rejalar, reklama matnlari va marketing strategiyalarini professional darajada yarating.",
    hero_start_btn: "Bepul boshlash (Oyiga 10 ta AI generatsiya)",
    hero_login_btn: "Tizimga kirish",
    stat_1_val: "100%",
    stat_1_lbl: "O'zbek tiliga mos",
    stat_2_val: "10x",
    stat_2_lbl: "Tezroq kontent",
    stat_3_val: "10 ta",
    stat_3_lbl: "Har oy bepul",
    stat_4_val: "24/7",
    stat_4_lbl: "AI Yordamchi",

    features_title: "SMM Mutaxassislari Uchun Maxsus AI Imkoniyatlari",
    features_desc: "Barcha kerakli kontent turlari bir joyda jamlangan",
    feat_1_title: "SMM Post Generatori",
    feat_1_desc: "Instagram, Telegram va Facebook uchun sarlavha, asosiy matn, CTA va hashtaglardan iborat mukammal postlar.",
    feat_2_title: "Virusli Reels & TikTok Ssenariylari",
    feat_2_desc: "Birinchi 3 soniyalik hook, vizual kadrlar tasviri va harakatga chaqiruv bilan boyitilgan video rejalar.",
    feat_3_title: "7 va 30 Kunlik Kontent Reja",
    feat_3_desc: "Sana, kontent turi, rubrika va to'liq post g'oyalari bilan tayyorlangan jadval shaklidagi reja.",
    feat_4_title: "Target Reklama Matnlari (AIDA / PAS)",
    feat_4_desc: "Mijozni jalb qiluvchi va konversiyani oshiruvchi marketing formulalariga asoslangan matnlar.",
    feat_5_title: "Auditoriya Tahlili",
    feat_5_desc: "Ideal mijoz portreti, og'riqlar, ehtiyojlar va sotib olishga undovchi omillar tahlili.",
    feat_6_title: "AI Rasm Prompts",
    feat_6_desc: "Midjourney va DALL-E uchun tayyor professional inglizcha va o'zbekcha promptlar.",

    how_title: "Qanday Ishlaydi?",
    how_step1_title: "Biznes ma'lumotlarini kiriting",
    how_step1_desc: "Soha, mahsulot va maqsadli auditoriyani belgilang.",
    how_step2_title: "Kerakli AI asbobni tanlang",
    how_step2_desc: "Post, Reels, Reja yoki Reklama matnini tanlang va Generate tugmasini bosing.",
    how_step3_title: "Natijani oling va nusxalang",
    how_step3_desc: "Tayyor professional kontentni 1-bosishda nusxalang yoki PDF qilib oling.",

    cta_title: "SMM jarayoningizni bugunoq avtomatlashtiring",
    cta_desc: "Hech qanday to'lov kartasi talab qilinmaydi. Ro'yxatdan o'ting va 10 ta bepul AI generatsiyaga ega bo'ling.",
    cta_btn: "Bepul Boshlash 🚀",

    footer_rights: "© 2026 AI SMM Assistant. Barcha huquqlar himoyalangan.",
    footer_feedback: "Shikoyat va takliflar",

    // Modals
    auth_login_title: "Tizimga Kirish",
    auth_login_sub: "Google hisobingiz yoki elektron pochtangiz orqali kiring",
    auth_register_title: "Ro'yxatdan O'tish",
    auth_register_sub: "Bepul hisob oching va oyiga 10 ta AI generatsiyaga ega bo'ling",
    auth_google_btn: "Google orqali davom etish",
    auth_or_email: "yoki elektron pochta orqali",
    auth_name: "Ismingiz",
    auth_name_placeholder: "Ismingizni kiriting",
    auth_email: "Elektron Pochta",
    auth_password: "Parol",
    auth_confirm_password: "Parolni Tasdiqlang",
    auth_submit_login: "Tizimga Kirish 🚀",
    auth_submit_register: "Ro'yxatdan O'tish 🚀",
    auth_no_account: "Hisobingiz yo'qmi?",
    auth_have_account: "Hisobingiz bormi?",
    auth_register_link: "Ro'yxatdan o'ting",
    auth_login_link: "Kirish",

    checkout_title: "To'lov Ma'lumotlari & Chek",
    checkout_sub: "O'zingizga qulay to'lov tizimi orqali to'lang va chekni yuboring",
    checkout_card_label: "To'lov Kartasi (Humo / Uzcard)",
    checkout_card_holder: "Karta egasi: Daler X.",
    checkout_deduct: "Yechiladigan summa",
    checkout_warning_title: "⚠️ DIQQAT:",
    checkout_warning_txt: "\"Xaridingizni tasdiqlash uchun chekni tashlash esingizdan chiqmasin\"",
    checkout_apps_title: "💳 To'lov qilish (Ilovani tanlang):",
    checkout_apps_sub: "Ilovani bosing ↓",
    checkout_tg_label: "Telegram profilingiz (@username):",
    checkout_note_label: "Chek raqami yoki izoh (ixtiyoriy):",
    checkout_send_bot_btn: "To'lov Chekini Telegram Botga Yuborish ✈️",
    checkout_confirm_btn: "To'lov qildim (Tasdiqlashga yuborish) 📋",

    logout_title: "Hisobdan chiqish",
    logout_desc: "Haqiqatan ham profilingizdan chiqmoqchimisiz?",
    logout_cancel: "Bekor qilish",
    logout_confirm: "Ha, chiqish",

    feedback_btn: "Taklif & Shikoyat",
    feedback_title: "Taklif va Shikoyatlar",
    feedback_sub: "Xabaringiz to'g'ridan-to'g'ri administratorning Telegramiga yuboriladi",
    feedback_name: "Ismingiz",
    feedback_email: "Elektron Pochta",
    feedback_tg: "Telegram username (@username)",
    feedback_subject: "Mavzu",
    feedback_message: "Batafsil xabar",
    feedback_type_sug: "💡 Taklif",
    feedback_type_comp: "⚠️ Shikoyat",
    feedback_type_help: "❓ Yordam",
    feedback_send: "Yuborish 🚀",
    feedback_direct_tg: "Telegram bot orqali yuborish ✈️",

    // Common Actions & Toasts
    btn_copy: "Nusxalash 📋",
    btn_copied: "Nusxalandi! 📋",
    btn_download_txt: "TXT yuklab olish 📥",
    msg_lang_changed: "Til o'zgartirildi: O'zbekcha 🇺🇿",
    msg_copied: "Nusxalandi! 📋",
    msg_error: "Xatolik yuz berdi"
  },

  en: {
    // Header & Navbar
    app_title: "AI SMM <span class=\"gradient-text\">Assistant</span>",
    app_subtitle: "Professional SMM & Content Generator",
    nav_login: "Sign In",
    nav_start_free: "Get Started Free 🚀",
    nav_limit: "Monthly limit:",
    nav_logout: "Sign Out",
    header_free_badge: "Free MVP",

    // Sidebar Navigation
    nav_dashboard: "Dashboard",
    nav_tools: "AI Tools",
    nav_pro: "SMM AI Pro",
    nav_chat: "AI Marketing Chat",
    nav_history: "History",
    nav_profile: "Business Profile",
    nav_feedback: "Feedback & Support",
    sidebar_usage_title: "Monthly Usage",
    sidebar_remaining_txt: "Remaining generations:",
    sidebar_remaining_unit: "left",

    // Mobile Nav
    mob_home: "Home",
    mob_tools: "Tools",
    mob_pro: "Pro Hub",
    mob_chat: "Chat",
    mob_history: "History",
    mob_profile: "Profile",

    // Dashboard Home View
    dash_title: "Dashboard",
    dash_subtitle: "Welcome! Choose an AI tool and start generating viral content in seconds.",
    quick_post_title: "Create Post",
    quick_post_sub: "AIDA copy & tags",
    quick_reels_title: "Reels Ideas",
    quick_reels_sub: "Viral script outlines",
    quick_plan_title: "Content Plan",
    quick_plan_sub: "7/14/30 day calendar",
    quick_hash_title: "Hashtags",
    quick_hash_sub: "Categorized tags",
    quick_ads_title: "Ad Copy",
    quick_ads_sub: "Short, Medium, Long",
    quick_img_title: "Image Prompts",
    quick_img_sub: "Midjourney & DALL-E",
    quick_aud_title: "Audience Analysis",
    quick_aud_sub: "Ideal buyer persona",
    quick_chat_title: "Marketing Chat",
    quick_chat_sub: "AI Consultant",
    recent_gen_title: "Recent Generations",
    recent_gen_view_all: "View All →",
    recent_gen_empty: "No content generated yet. Pick any tool above to create your first content! 🚀",
    btn_go_to_task: "Open Task 🚀",

    // Tools Tab Bar
    tab_tool_post: "📝 AI Post",
    tab_tool_reels: "🎬 Reels Script",
    tab_tool_plan: "📅 Content Plan",
    tab_tool_hash: "🏷 Hashtags",
    tab_tool_ads: "📣 Ad Copy",
    tab_tool_img: "🎨 Image Prompts",
    tab_tool_aud: "🎯 Audience",

    // Form Common Labels
    label_biz_name: "Business Name",
    label_biz_type: "Business Category *",
    label_product_service: "Product / Service *",
    label_topic: "Post Topic *",
    label_tone: "Tone of Voice",
    label_goal: "Post Goal",
    label_city: "City / Region",
    label_duration: "Duration (Days) *",
    label_audience: "Target Audience *",
    label_offer: "Special Offer / Discount *",
    label_img_desc: "Visual Description of Post / Product *",
    label_img_style: "Style Preference",
    label_img_colors: "Brand Colors",
    label_price_seg: "Product / Price Segment",

    // Placeholders
    ph_biz_name: "E.g., 'Urban Coffee Lab'",
    ph_biz_type: "Restaurant, Clothing store, IT Academy...",
    ph_product: "E.g., Signature artisan coffee blend...",
    ph_topic: "E.g., Chef's special recipe & weekend promo...",
    ph_reels_topic: "E.g., 1 outfit styled 4 different ways...",
    ph_city: "New York, London, Tashkent...",
    ph_ad_biz: "English Academy, Dental Clinic...",
    ph_ad_prod: "IELTS 7.5+ Intensive Course...",
    ph_ad_aud: "Students, professionals & expats...",
    ph_ad_offer: "25% discount for first 10 students...",
    ph_img_desc: "Elegant coffee cup and modern laptop in cozy sunlit cafe...",
    ph_img_style: "Photorealistic, Studio Lighting, 8k, Hasselblad",
    ph_img_colors: "Soft pastel, gold, obsidian black...",
    ph_aud_biz: "Company or Brand name...",
    ph_aud_type: "Real Estate Agency, Fitness Club...",
    ph_aud_prod: "Luxury downtown apartments...",

    // Form Option Texts
    tone_friendly: "Friendly & Engaging",
    tone_professional: "Expert & Professional",
    tone_sales: "Persuasive & Sales-driven",
    goal_sales: "Generate Sales & Inquiries",
    goal_followers: "Attract New Followers",
    goal_trust: "Build Authority & Trust",
    opt_7_days: "7-Day Content Plan",
    opt_14_days: "14-Day Content Plan",
    opt_30_days: "30-Day Content Plan (Full Month)",

    // Submit Buttons
    btn_gen_post: "Generate SMM Post 🚀",
    btn_gen_reels: "Generate Reels Script 🎬",
    btn_gen_plan: "Create Content Calendar 📅",
    btn_gen_hash: "Generate Hashtags 🏷",
    btn_gen_ads: "Create Ad Copy 📣",
    btn_gen_img: "Generate Image Prompts 🎨",
    btn_gen_aud: "Analyze Target Audience 🎯",
    btn_generating_text: "AI is crafting your content... ⏳",

    // SMM AI Pro View
    pro_title: "SMM AI Pro Plans",
    pro_subtitle: "Unlock unlimited generations, turbo speed and scale your agency without boundaries.",
    plan1_badge: "Tier 1",
    plan1_name: "Starter Pro",
    plan1_sub: "For solo creators and small projects",
    plan1_price: "30,000",
    plan1_unit: "UZS / month",
    plan1_f1: "35 AI Generations per month",
    plan1_f2: "7-Day Content Plan generator",
    plan1_f3: "Viral Reels scripts & hooks",
    plan1_f4: "Targeted Hashtags & Ad copy",
    plan1_f5: "Standard AI server speed",
    plan1_btn: "30,000 UZS — Choose Starter 🚀",

    plan2_badge: "⭐ Most Popular / Recommended",
    plan2_badge_tier: "Tier 2",
    plan2_name: "Standard Pro",
    plan2_sub: "For active SMM managers and growing brands",
    plan2_price: "50,000",
    plan2_unit: "UZS / month",
    plan2_f1: "50 full AI Generations per month",
    plan2_f2: "30-Day Auto-Pilot Content Calendar",
    plan2_f3: "AI Competitor Spy Analysis",
    plan2_f4: "Custom Brand Tone of Voice",
    plan2_f5: "PDF & Word export tools",
    plan2_f6: "Turbo AI Server priority speed",
    plan2_btn: "50,000 UZS — Choose Standard ⭐",

    plan3_badge: "👑 VIP Maximum",
    plan3_badge_tier: "Tier 3",
    plan3_name: "VIP Business Pro",
    plan3_sub: "For agencies, entrepreneurs and enterprises",
    plan3_price: "100,000",
    plan3_unit: "UZS / month",
    plan3_f1: "All Pro Features + Unlimited Access",
    plan3_f2: "24/7 Dedicated AI Marketing Strategist",
    plan3_f3: "Manage up to 5 Business Profiles",
    plan3_f4: "Unlimited Targeted Ads & Funnels",
    plan3_f5: "Auto-posting via Telegram Bot",
    plan3_f6: "VIP Personal Account Manager & Priority",
    plan3_btn: "100,000 UZS — Choose VIP 👑",

    // Chat View
    chat_title: "AI Marketing Consultant",
    chat_online: "Online",
    chat_clear: "Clear Chat 🗑",
    chat_placeholder: "Ask anything regarding SMM, marketing, content ideas or ad strategy...",
    chat_send: "Send 🚀",
    chat_welcome: "Hello! I am your personal AI Marketing Consultant. How can I assist you with your SMM strategy, content calendar, audience analysis, or promotional campaigns today?",

    // History View
    history_title: "Generation History",
    history_sub: "List of all previously generated posts, scripts, calendars, and ad copies.",
    history_filter_all: "All Formats",
    history_filter_post: "Posts",
    history_filter_reels: "Reels",
    history_filter_plan: "Plans",
    history_filter_hash: "Hashtags",
    history_filter_ads: "Ads",
    history_filter_img: "Prompts",
    history_filter_aud: "Audience",
    history_clear_all: "Clear All History 🗑",
    history_empty: "Your generation history is empty. Choose a tool above to start creating! 🚀",

    // Profile View
    profile_title: "Business Profile & Brand Tone",
    profile_sub: "Configure your business details once — AI will tailor all future generations automatically to your brand.",
    profile_biz_name: "Business or Brand Name",
    profile_biz_type: "Business Industry / Category",
    profile_desc: "Product or Service Description",
    profile_aud: "Primary Target Audience",
    profile_tone: "Brand Tone of Voice",
    profile_platform: "Primary Social Media Platform",
    profile_save_btn: "Save Business Profile 💾",
    profile_saved_toast: "Business profile saved successfully! 🎉",

    // Landing Sections
    hero_badge: "Next Generation SMM Powered by AI",
    hero_title_1: "Create SMM content with AI",
    hero_title_2: "in seconds",
    hero_title_3: "effortlessly.",
    hero_desc: "Generate viral Reels scripts, 7-30 day content plans, engaging social media posts, and high-converting ad copy professionally.",
    hero_start_btn: "Start Free (10 AI Generations/Month)",
    hero_login_btn: "Sign In",
    stat_1_val: "100%",
    stat_1_lbl: "Multilingual AI",
    stat_2_val: "10x",
    stat_2_lbl: "Faster Content",
    stat_3_val: "10 Free",
    stat_3_lbl: "Every Month",
    stat_4_val: "24/7",
    stat_4_lbl: "AI Assistant",

    features_title: "Specialized AI Tools for SMM Experts",
    features_desc: "All essential social media formats crafted in one unified platform",
    feat_1_title: "SMM Post Generator",
    feat_1_desc: "Perfect posts with engaging hooks, body text, call-to-actions and trending hashtags for Instagram, Telegram, and Facebook.",
    feat_2_title: "Viral Reels & TikTok Scripts",
    feat_2_desc: "Full video outlines with 3-second visual hooks, scene breakdowns, and high-converting CTAs.",
    feat_3_title: "7 & 30-Day Content Calendars",
    feat_3_desc: "Complete structured plans organized by date, format, content pillars, and detailed post ideas.",
    feat_4_title: "Targeted Ad Copy (AIDA / PAS)",
    feat_4_desc: "High-converting marketing ad texts built on proven copywriting formulas to maximize sales.",
    feat_5_title: "Audience Analysis",
    feat_5_desc: "Detailed buyer persona breakdowns, customer pain points, and psychological buying triggers.",
    feat_6_title: "AI Image Prompts",
    feat_6_desc: "Production-ready Midjourney & DALL-E prompts for stunning commercial visuals.",

    how_title: "How It Works",
    how_step1_title: "Enter Business Details",
    how_step1_desc: "Specify your niche, product, and target audience.",
    how_step2_title: "Choose an AI Tool",
    how_step2_desc: "Pick Post, Reels, Content Plan, or Ad Copy and click Generate.",
    how_step3_title: "Copy & Publish",
    how_step3_desc: "Get instant ready-to-publish content and export to PDF, Word or copy in 1 click.",

    cta_title: "Automate your SMM workflow today",
    cta_desc: "No credit card required. Register and get 10 free AI generations every month.",
    cta_btn: "Get Started Free 🚀",

    footer_rights: "© 2026 AI SMM Assistant. All rights reserved.",
    footer_feedback: "Feedback & Suggestions",

    // Modals
    auth_login_title: "Sign In",
    auth_login_sub: "Sign in with your Google account or email",
    auth_register_title: "Create Free Account",
    auth_register_sub: "Get started for free and receive 10 AI generations every month",
    auth_google_btn: "Continue with Google",
    auth_or_email: "or continue with email",
    auth_name: "Full Name",
    auth_name_placeholder: "Enter your name",
    auth_email: "Email Address",
    auth_password: "Password",
    auth_confirm_password: "Confirm Password",
    auth_submit_login: "Sign In 🚀",
    auth_submit_register: "Create Account 🚀",
    auth_no_account: "Don't have an account?",
    auth_have_account: "Already have an account?",
    auth_register_link: "Sign up now",
    auth_login_link: "Sign in",

    checkout_title: "Payment Information & Receipt",
    checkout_sub: "Pay securely via your preferred payment app and upload your receipt",
    checkout_card_label: "Payment Card (Humo / Uzcard)",
    checkout_card_holder: "Card holder: Daler X.",
    checkout_deduct: "Amount to deduct",
    checkout_warning_title: "⚠️ NOTE:",
    checkout_warning_txt: "\"Please remember to send your receipt to confirm your purchase\"",
    checkout_apps_title: "💳 Payment Method (Select App):",
    checkout_apps_sub: "Click to select ↓",
    checkout_tg_label: "Your Telegram profile (@username):",
    checkout_note_label: "Transaction ID or note (optional):",
    checkout_send_bot_btn: "Send Receipt to Telegram Bot ✈️",
    checkout_confirm_btn: "I have Paid (Submit for Approval) 📋",

    logout_title: "Sign Out",
    logout_desc: "Are you sure you want to log out of your account?",
    logout_cancel: "Cancel",
    logout_confirm: "Yes, Sign Out",

    feedback_btn: "Feedback & Support",
    feedback_title: "Feedback & Suggestions",
    feedback_sub: "Your message goes directly to the administrator on Telegram",
    feedback_name: "Your Name",
    feedback_email: "Email Address",
    feedback_tg: "Telegram username (@username)",
    feedback_subject: "Subject",
    feedback_message: "Detailed Message",
    feedback_type_sug: "💡 Suggestion",
    feedback_type_comp: "⚠️ Complaint",
    feedback_type_help: "❓ Help",
    feedback_send: "Submit Feedback 🚀",
    feedback_direct_tg: "Send via Telegram Bot ✈️",

    // Common Actions & Toasts
    btn_copy: "Copy 📋",
    btn_copied: "Copied! 📋",
    btn_download_txt: "Download TXT 📥",
    msg_lang_changed: "Language changed to English 🇺🇸",
    msg_copied: "Copied to clipboard! 📋",
    msg_error: "An error occurred"
  },

  ru: {
    // Header & Navbar
    app_title: "AI SMM <span class=\"gradient-text\">Assistant</span>",
    app_subtitle: "Профессиональный SMM и контент-генератор",
    nav_login: "Войти",
    nav_start_free: "Начать бесплатно 🚀",
    nav_limit: "Месячный лимит:",
    nav_logout: "Выйти",
    header_free_badge: "Free MVP",

    // Sidebar Navigation
    nav_dashboard: "Панель управления",
    nav_tools: "AI Инструменты",
    nav_pro: "SMM AI Pro",
    nav_chat: "AI Маркетинг Чат",
    nav_history: "История",
    nav_profile: "Бизнес Профиль",
    nav_feedback: "Отзывы и предложения",
    sidebar_usage_title: "Использование за месяц",
    sidebar_remaining_txt: "Осталось генераций:",
    sidebar_remaining_unit: "шт.",

    // Mobile Nav
    mob_home: "Главная",
    mob_tools: "Инструменты",
    mob_pro: "Pro Hub",
    mob_chat: "Чат",
    mob_history: "История",
    mob_profile: "Профиль",

    // Dashboard Home View
    dash_title: "Панель управления",
    dash_subtitle: "Добро пожаловать! Выберите нужный AI-инструмент и создавайте контент за секунды.",
    quick_post_title: "Создать Пост",
    quick_post_sub: "AIDA текст и теги",
    quick_reels_title: "Идеи для Reels",
    quick_reels_sub: "Вирусные сценарии",
    quick_plan_title: "Контент-План",
    quick_plan_sub: "План на 7/14/30 дней",
    quick_hash_title: "Хэштеги",
    quick_hash_sub: "Теги по категориям",
    quick_ads_title: "Рекламный Текст",
    quick_ads_sub: "Short, Medium, Long",
    quick_img_title: "Промпты для Фото",
    quick_img_sub: "Midjourney и DALL-E",
    quick_aud_title: "Анализ Аудитории",
    quick_aud_sub: "Портрет идеального клиента",
    quick_chat_title: "Маркетинг Чат",
    quick_chat_sub: "AI Консультант",
    recent_gen_title: "Последние Генерации",
    recent_gen_view_all: "Посмотреть все →",
    recent_gen_empty: "Генераций пока нет. Выберите инструмент выше, чтобы создать первый контент! 🚀",
    btn_go_to_task: "Перейти к задаче 🚀",

    // Tools Tab Bar
    tab_tool_post: "📝 AI Пост",
    tab_tool_reels: "🎬 Reels Сценарий",
    tab_tool_plan: "📅 Контент-План",
    tab_tool_hash: "🏷 Хэштеги",
    tab_tool_ads: "📣 Реклама (Ads)",
    tab_tool_img: "🎨 Image Prompts",
    tab_tool_aud: "🎯 Аудитория",

    // Form Common Labels
    label_biz_name: "Название Бизнеса",
    label_biz_type: "Сфера Бизнеса *",
    label_product_service: "Продукт / Услуга *",
    label_topic: "Тема Поста *",
    label_tone: "Тональность (Tone)",
    label_goal: "Цель Поста",
    label_city: "Город / Регион",
    label_duration: "Длительность (Дней) *",
    label_audience: "Целевая Аудитория *",
    label_offer: "Специальное Предложение / Скидка *",
    label_img_desc: "Визуальное описание поста или продукта *",
    label_img_style: "Стиль изображения",
    label_img_colors: "Цвета бренда",
    label_price_seg: "Продукт / Сегмент цен",

    // Placeholders
    ph_biz_name: "Например: 'Coffee Lab'",
    ph_biz_type: "Ресторан, Магазин одежды, IT Академия...",
    ph_product: "Например: Фирменный стейк, новый курс...",
    ph_topic: "Например: Секрет шеф-повара и пятничная акция...",
    ph_reels_topic: "Например: 1 вещь — 4 стильных образа...",
    ph_city: "Ташкент, Москва, Самарканд...",
    ph_ad_biz: "Курсы английского, Стоматология...",
    ph_ad_prod: "Интенсивный курс IELTS 7.5+...",
    ph_ad_aud: "Студенты и специалисты...",
    ph_ad_offer: "Скидка 25% первым 10 записавшимся...",
    ph_img_desc: "Элегантная чашка кофе и ноутбук в уютном светлом кафе...",
    ph_img_style: "Photorealistic, Studio Lighting, 8k, Hasselblad",
    ph_img_colors: "Светлая пастель, золото, глубокий черный...",
    ph_aud_biz: "Название компании...",
    ph_aud_type: "Агентство недвижимости, Фитнес клуб...",
    ph_aud_prod: "Премиальные квартиры в центре...",

    // Form Option Texts
    tone_friendly: "Дружелюбный и аппетитный",
    tone_professional: "Экспертный и деловой",
    tone_sales: "Продающий и убедительный",
    goal_sales: "Продажи и заявки",
    goal_followers: "Привлечение подписчиков",
    goal_trust: "Укрепление доверия",
    opt_7_days: "План на 7 дней",
    opt_14_days: "План на 14 дней",
    opt_30_days: "План на 30 дней (Полный месяц)",

    // Submit Buttons
    btn_gen_post: "Сгенерировать Пост 🚀",
    btn_gen_reels: "Создать Сценарий Reels 🎬",
    btn_gen_plan: "Создать Контент-Календарь 📅",
    btn_gen_hash: "Подобрать Хэштеги 🏷",
    btn_gen_ads: "Создать Рекламный Текст 📣",
    btn_gen_img: "Создать Промпты для Фото 🎨",
    btn_gen_aud: "Анализировать Аудиторию 🎯",
    btn_generating_text: "AI генерирует контент... ⏳",

    // SMM AI Pro View
    pro_title: "Тарифы SMM AI Pro",
    pro_subtitle: "Создавайте без ограничений, ускоряйте маркетинг и развивайте свой бизнес.",
    plan1_badge: "Тариф 1",
    plan1_name: "Начальный Pro",
    plan1_sub: "Для начинающих и небольших проектов",
    plan1_price: "30 000",
    plan1_unit: "сум / месяц",
    plan1_f1: "35 AI генераций в месяц",
    plan1_f2: "Контент-план на 7 дней",
    plan1_f3: "Сценарии Reels и хуки",
    plan1_f4: "Хэштеги и рекламные тексты",
    plan1_f5: "Стандартная скорость серверов",
    plan1_btn: "30 000 сум — Выбрать 🚀",

    plan2_badge: "⭐ Самый популярный / Рекомендуемый",
    plan2_badge_tier: "Тариф 2",
    plan2_name: "Стандарт Pro",
    plan2_sub: "Для активных SMM-специалистов и брендов",
    plan2_price: "50 000",
    plan2_unit: "сум / месяц",
    plan2_f1: "50 полных AI генераций в месяц",
    plan2_f2: "Контент-календарь на 30 дней автопилотом",
    plan2_f3: "AI Анализ конкурентов (Spy)",
    plan2_f4: "Индивидуальный тон бренда (Tone of Voice)",
    plan2_f5: "Экспорт в PDF и Word",
    plan2_f6: "Турбо-скорость AI серверов",
    plan2_btn: "50 000 сум — Выбрать ⭐",

    plan3_badge: "👑 Максимальный VIP",
    plan3_badge_tier: "Тариф 3",
    plan3_name: "VIP Бизнес Pro",
    plan3_sub: "Для агентств, предпринимателей и компаний",
    plan3_price: "100 000",
    plan3_unit: "сум / месяц",
    plan3_f1: "Все Pro возможности + Безлимит",
    plan3_f2: "Персональный AI Маркетолог 24/7",
    plan3_f3: "Ведение до 5 бизнес-профилей",
    plan3_f4: "Безлимитные воронки и реклама",
    plan3_f5: "Автопостинг через Telegram-бота",
    plan3_f6: "VIP персональный менеджер",
    plan3_btn: "100 000 сум — Выбрать 👑",

    // Chat View
    chat_title: "AI Маркетинг Консультант",
    chat_online: "В сети",
    chat_clear: "Очистить чат 🗑",
    chat_placeholder: "Задайте любой вопрос по SMM, контенту или рекламе...",
    chat_send: "Отправить 🚀",
    chat_welcome: "Здравствуйте! Я ваш персональный AI-консультант по маркетингу. Чем я могу помочь вам с контент-стратегией, рекламой или анализом сегодня?",

    // History View
    history_title: "История Генераций",
    history_sub: "Список всех ранее созданных постов, сценариев, планов и текстов.",
    history_filter_all: "Все форматы",
    history_filter_post: "Посты",
    history_filter_reels: "Reels",
    history_filter_plan: "Планы",
    history_filter_hash: "Хэштеги",
    history_filter_ads: "Реклама",
    history_filter_img: "Промпты",
    history_filter_aud: "Аудитория",
    history_clear_all: "Очистить всю историю 🗑",
    history_empty: "История генераций пуста. Выберите инструмент выше, чтобы начать создавать контент! 🚀",

    // Profile View
    profile_title: "Бизнес Профиль и Тон Бренда",
    profile_sub: "Заполните данные о вашем бизнесе один раз — AI будет учитывать их во всех последующих генерациях автоматически.",
    profile_biz_name: "Название Бизнеса или Бренда",
    profile_biz_type: "Сфера Бизнеса / Категория",
    profile_desc: "Описание Продукта или Услуги",
    profile_aud: "Основная Целевая Аудитория",
    profile_tone: "Тональность Бренда (Tone of Voice)",
    profile_platform: "Основная Социальная Сеть",
    profile_save_btn: "Сохранить Бизнес Профиль 💾",
    profile_saved_toast: "Бизнес профиль успешно сохранен! 🎉",

    // Landing Sections
    hero_badge: "Новая эра SMM с искусственным интеллектом",
    hero_title_1: "Создавайте SMM-контент с помощью AI",
    hero_title_2: "за считанные секунды",
    hero_title_3: "легко и быстро.",
    hero_desc: "Генерируйте вирусные сценарии Reels, контент-планы на 7-30 дней, посты и продающие рекламные тексты на профессиональном уровне.",
    hero_start_btn: "Начать бесплатно (10 AI генераций в месяц)",
    hero_login_btn: "Войти в систему",
    stat_1_val: "100%",
    stat_1_lbl: "Поддержка языков",
    stat_2_val: "10x",
    stat_2_lbl: "Быстрее контент",
    stat_3_val: "10 шт.",
    stat_3_lbl: "Каждый месяц",
    stat_4_val: "24/7",
    stat_4_lbl: "AI Помощник",

    features_title: "Специализированные AI-инструменты для SMM",
    features_desc: "Все ключевые форматы контента в одном месте",
    feat_1_title: "Генератор SMM-постов",
    feat_1_desc: "Идеальные посты для Instagram, Telegram и Facebook с цепляющими заголовками, CTA и хэштегами.",
    feat_2_title: "Сценарии для Reels и TikTok",
    feat_2_desc: "Готовые сценарии с 3-секундным хуком, визуальным описанием кадров и продающим призывом к действию.",
    feat_3_title: "Контент-план на 7 и 30 дней",
    feat_3_desc: "Структурированная таблица по дням, рубрикам, форматам и готовым идеям для публикаций.",
    feat_4_title: "Таргетированные тексты (AIDA / PAS)",
    feat_4_desc: "Рекламные тексты на основе проверенных маркетинговых формул для высокой конверсии.",
    feat_5_title: "Анализ Аудитории",
    feat_5_desc: "Портрет целевого клиента, боли, потребности и триггеры покупки.",
    feat_6_title: "AI Промпты для Фото",
    feat_6_desc: "Готовые промпты для Midjourney и DALL-E для генерации коммерческих визуалов.",

    how_title: "Как Это Работает?",
    how_step1_title: "Введите данные о бизнесе",
    how_step1_desc: "Укажите сферу, продукт и целевую аудиторию.",
    how_step2_title: "Выберите нужный AI-инструмент",
    how_step2_desc: "Выберите Пост, Reels, План или Рекламу и нажмите Сгенерировать.",
    how_step3_title: "Получите и скопируйте результат",
    how_step3_desc: "Готовый контент можно скопировать в 1 клик или экспортировать в PDF / Word.",

    cta_title: "Автоматизируйте свой SMM уже сегодня",
    cta_desc: "Банковская карта не требуется. Зарегистрируйтесь и получайте 10 бесплатных AI-генераций каждый месяц.",
    cta_btn: "Начать бесплатно 🚀",

    footer_rights: "© 2026 AI SMM Assistant. Все права защищены.",
    footer_feedback: "Отзывы и предложения",

    // Modals
    auth_login_title: "Вход в аккаунт",
    auth_login_sub: "Войдите через Google аккаунт или email",
    auth_register_title: "Регистрация",
    auth_register_sub: "Создайте аккаунт и получите 10 бесплатных AI генераций в месяц",
    auth_google_btn: "Продолжить через Google",
    auth_or_email: "или через электронную почту",
    auth_name: "Ваше Имя",
    auth_name_placeholder: "Введите ваше имя",
    auth_email: "Электронная почта",
    auth_password: "Пароль",
    auth_confirm_password: "Подтвердите пароль",
    auth_submit_login: "Войти в систему 🚀",
    auth_submit_register: "Зарегистрироваться 🚀",
    auth_no_account: "Нет аккаунта?",
    auth_have_account: "Уже есть аккаунт?",
    auth_register_link: "Создать аккаунт",
    auth_login_link: "Войти",

    checkout_title: "Информация об Оплате и Чек",
    checkout_sub: "Оплатите через удобное приложение и отправьте чек для подтверждения",
    checkout_card_label: "Карта для оплаты (Humo / Uzcard)",
    checkout_card_holder: "Владелец карты: Daler X.",
    checkout_deduct: "Сумма к списанию",
    checkout_warning_title: "⚠️ ВНИМАНИЕ:",
    checkout_warning_txt: "\"Не забудьте отправить чек для подтверждения вашей покупки\"",
    checkout_apps_title: "💳 Способ Оплаты (Выберите приложение):",
    checkout_apps_sub: "Нажмите для выбора ↓",
    checkout_tg_label: "Ваш Telegram профиль (@username):",
    checkout_note_label: "Номер чека или примечание (необязательно):",
    checkout_send_bot_btn: "Отправить чек в Telegram-бот ✈️",
    checkout_confirm_btn: "Я оплатил (Отправить на проверку) 📋",

    logout_title: "Выход из аккаунта",
    logout_desc: "Вы действительно хотите выйти из своего профиля?",
    logout_cancel: "Отмена",
    logout_confirm: "Да, выйти",

    feedback_btn: "Отзывы и предложения",
    feedback_title: "Отзывы и предложения",
    feedback_sub: "Ваше сообщение сразу поступит администратору в Telegram",
    feedback_name: "Ваше Имя",
    feedback_email: "Электронная почта",
    feedback_tg: "Telegram username (@username)",
    feedback_subject: "Тема",
    feedback_message: "Подробное сообщение",
    feedback_type_sug: "💡 Предложение",
    feedback_type_comp: "⚠️ Жалоба",
    feedback_type_help: "❓ Помощь",
    feedback_send: "Отправить 🚀",
    feedback_direct_tg: "Отправить через Telegram-бота ✈️",

    // Common Actions & Toasts
    btn_copy: "Копировать 📋",
    btn_copied: "Скопировано! 📋",
    btn_download_txt: "Скачать TXT 📥",
    msg_lang_changed: "Язык изменен: Русский 🇷🇺",
    msg_copied: "Скопировано! 📋",
    msg_error: "Произошла ошибка"
  }
};

const LANG_CONFIG = {
  uz: { name: "O'zbekcha", flag: "UZ", short: "UZ" },
  en: { name: "English", flag: "EN", short: "EN" },
  ru: { name: "Русский", flag: "RU", short: "RU" }
};

let currentLang = localStorage.getItem("smm_app_lang") || "uz";

/**
 * Get translation for key
 */
function t(key, fallback = "") {
  const dict = translations[currentLang] || translations.uz;
  return dict[key] || fallback || key;
}

/**
 * Change language across entire application
 */
function setLanguage(lang) {
  if (!translations[lang]) lang = "uz";
  currentLang = lang;
  localStorage.setItem("smm_app_lang", lang);

  // Update all DOM elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update input placeholders with data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang] && translations[lang][key] !== undefined) {
      el.setAttribute("placeholder", translations[lang][key]);
    }
  });

  // Update button or input values with data-i18n-value
  document.querySelectorAll("[data-i18n-value]").forEach(el => {
    const key = el.getAttribute("data-i18n-value");
    if (translations[lang] && translations[lang][key] !== undefined) {
      el.value = translations[lang][key];
    }
  });

  // Update title attributes with data-i18n-title
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    if (translations[lang] && translations[lang][key] !== undefined) {
      el.setAttribute("title", translations[lang][key]);
    }
  });

  // Update Active Language Switcher UI
  updateLangSwitcherUI(lang);

  // Update html lang attribute
  document.documentElement.setAttribute("lang", lang);

  // Show notification
  if (typeof showToast === "function") {
    showToast(t("msg_lang_changed"), "info");
  }
}

/**
 * Update Language Switcher Button & Dropdown State
 */
function updateLangSwitcherUI(lang) {
  const cfg = LANG_CONFIG[lang] || LANG_CONFIG.uz;
  
  const currentFlagEls = document.querySelectorAll(".langCurrentFlag");
  const currentNameEls = document.querySelectorAll(".langCurrentName");
  
  currentFlagEls.forEach(el => el.innerText = cfg.short);
  currentNameEls.forEach(el => el.innerText = cfg.short);

  // Highlight active item in dropdown
  document.querySelectorAll(".langDropdownItem").forEach(item => {
    const itemLang = item.getAttribute("data-lang");
    if (itemLang === lang) {
      item.classList.add("bg-indigo-600/30", "text-indigo-300", "font-bold");
      item.classList.remove("text-slate-300");
    } else {
      item.classList.remove("bg-indigo-600/30", "text-indigo-300", "font-bold");
      item.classList.add("text-slate-300");
    }
  });
}

/**
 * Toggle Language Dropdown
 */
function toggleLangDropdown(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById("langDropdownMenu");
  if (dropdown) {
    dropdown.classList.toggle("hidden");
  }
}

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  const dropdown = document.getElementById("langDropdownMenu");
  const btn = document.getElementById("langDropdownBtn");
  if (dropdown && !dropdown.classList.contains("hidden")) {
    if (btn && !btn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  }
});

// Auto-initialize i18n on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);
});
