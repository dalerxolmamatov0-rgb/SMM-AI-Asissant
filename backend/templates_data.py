"""
SMM AI Assistant - Andozalar, sohalar va aqlli shablonlar bazasi.
O'zbek, Rus va Ingliz tillarida boy kontent bazasi.
"""

NICHE_TEMPLATES = {
    "restaurant": {
        "uz": {
            "name": "Restoran va Kafexona",
            "hooks": [
                "Toshkentda bunday ta'mni hali tatib ko'rmagansiz! 🤤",
                "Kechki ovqatga nima yeyishni bilmayapsizmi? Bizda yechim bor! 🍕",
                "Oshpazimizning maxfiy retsepti nihoyat fosh bo'ldi... 🤫",
                "Do'stlaringiz bilan qayerga borishni reja qilyapsiz? Mana eng shinam joy!",
                "Ushbu taomni ko'rgandan keyin och qolmaslikning iloji yo'q 🔥"
            ],
            "sample_content": [
                {
                    "day": 1,
                    "day_name": "Dushanba",
                    "type": "Reels (Viral)",
                    "title": "Maxsus taom tayyorlanish siri",
                    "hooks": [
                        "30 soniyada haqiqiy bifsteks qanday pishiriladi? 🥩",
                        "Oshpazimiz 5 yildan beri bu sirni hech kimga aytmagan edi!",
                        "Uyda ham xuddi restorandagidek tayyorlash siri 🤫"
                    ],
                    "caption": "🔥 Dushanbani mazali taom bilan boshlash — butun haftalik unumdorlik garovi!\n\nBizning bosh oshpazimiz bugun o'zining sevimli mualliflik taomi siri bilan bo'lishdi. Har bir ingredient saralanib, alohida mehr bilan pishiriladi.\n\nSiz bugun tushlikka nima buyurtma qildingiz? Izohlarda yozing va bugungi maxsus 10% chegirmaga ega bo'ling! 👇",
                    "cta": "Izohda 'MENYU' deb yozing, to'liq menyuni Direct'ga yuboramiz! 📲",
                    "visual_prompt": "Cinematic 4k video of a sizzling steak being garnished with fresh rosemary and melted herb butter, cozy warm restaurant lighting.",
                    "hashtags": ["#restorantoshkent", "#mazalitaom", "#toshkentkafe", "#uzbekfood", "#steaktoshkent", "#lunchtime", "#milliytaomlar"],
                    "best_time": "12:00 - 13:30 (Tushlik vaqti)"
                },
                {
                    "day": 2,
                    "day_name": "Seshanba",
                    "type": "Karusel (Foydali)",
                    "title": "To'g'ri go'sht tanlash bo'yicha 5 ta qoida",
                    "hooks": [
                        "Bozorda go'sht tanlashda bu 3 xatoga yo'l qo'ymang!",
                        "Yumshoq va shirali go'sht siri nimada? (Saqlab oling)",
                        "Go'sht xarid qilayotganda bunga albatta e'tibor bering 🥩"
                    ],
                    "caption": "🥩 Do'stlar, mazali taomning 70% siri — sifatli masalliqlarda!\n\nBugungi karusel postimizda bosh oshpazimizdan go'sht tanlash bo'yicha eng muhim maslahatlarni to'pladik:\n1️⃣ Rangi va elastikligi\n2️⃣ Yog' qatlamining taqsimlanishi\n3️⃣ Yangilik belgisi\n\nBatafsil slaydlar orqali tanishing va postni saqlab qo'yishni unutmang! 📌",
                    "cta": "Postni yaqinlaringiz bilan ulashing va do'stlaringizni belgilang! ↗️",
                    "visual_prompt": "Clean multi-slide aesthetic food photography tips, sliced fresh meat cuts with minimalist modern typography.",
                    "hashtags": ["#oshxonasirlari", "#retseptlar", "#foydalimaslahat", "#oziqovqat", "#restoranlife", "#toshkent"],
                    "best_time": "18:00 - 19:30"
                },
                {
                    "day": 3,
                    "day_name": "Chorshanba",
                    "type": "Yagona Rasm / Atmosfera",
                    "title": "Shinam muhit va qulay joylashuv",
                    "hooks": [
                        "Hafta o'rtasida qisqa dam olishga ehtiyojingiz bormi? ☕",
                        "Bu yerda vaqt to'xtab qolgandek tuyuladi...",
                        "Oila davrasida eng unutilmas kecha qayerda o'tadi?"
                    ],
                    "caption": "☕ Chorshanba — haftaning qoq o'rtasi. Ishdan keyin biroz chalg'ib, xotirjam qahva ichish yoki oila davrasida shinam kechki ovqat qilish vaqti keldi.\n\nBizda sizni:\n✨ Yumshoq jonli musiqa\n✨ Nafis interyer va shinam stollar\n✨ Xushmuomala xizmat kutmoqda.\n\nStollarni oldindan band qilishni unutmang!",
                    "cta": "Stol band qilish uchun profilimizdagi havolaga bosing yoki Direct'ga yozing! 📩",
                    "visual_prompt": "Warm ambient interior of a cozy modern boutique restaurant, evening golden hour lighting, candle on table, blurred guests in background.",
                    "hashtags": ["#shinamjoy", "#oilaviyrestoran", "#kechkiovqat", "#romanticoqshom", "#toshkentoqshomi"],
                    "best_time": "19:00 - 20:30"
                },
                {
                    "day": 4,
                    "day_name": "Payshanba",
                    "type": "Stories Interaktiv Seriyasi",
                    "title": "Mijozlar bilan interaktiv o'yin / So'rovnoma",
                    "hooks": [
                        "Qaysi taomimiz eng zo'ri deb o'ylaysiz? (Ovoz bering)",
                        "Biz haqimizda 3 ta fakt: 1 tasi yolg'on! Topa olasizmi?",
                        "Bugun oshpazimiz kimga bepul desert sovg'a qiladi? 🎁"
                    ],
                    "caption": "Stories uchun reja:\n1. Story: 'Bugun tushlikka nima tanlaysiz: Pasta vs Burger?' (So'rovnoma sticker)\n2. Story: Oshxona ortidagi jonli jarayon (Behind the scenes)\n3. Story: 'Topgan birinchi 3 kishiga bepul chizkeyk!'\n4. Story: Foydalanuvchilar javoblari va g'oliblarni e'lon qilish.",
                    "cta": "Hozirroq Stories'imizga o'ting va so'rovnomada qatnashing! 👆",
                    "visual_prompt": "Behind the scenes lively kitchen action, chef adding microgreens on dish with tweezers.",
                    "hashtags": ["#storiesoyini", "#interaktiv", "#restoranyashirin", "#toshkentsmm"],
                    "best_time": "11:30 - 14:00"
                },
                {
                    "day": 5,
                    "day_name": "Juma",
                    "type": "Sotuv Posti (Offer / Combo)",
                    "title": "Juma ayyomi va Dam olish kunlari uchun Maxsus Set",
                    "hooks": [
                        "Faqat bugun va dam olish kunlari: 4 kishilik Katta Set 20% chegirmada! 🔥",
                        "Katta kompaniya bilan kelganlarga desert sovg'a!",
                        "Hafta oxirini mazali taomlar bilan nishonlang!"
                    ],
                    "caption": "🎉 Juma ayyomi muborak bo'lsin!\n\nDam olish kunlarini oila va yaqinlar davrasida o'tkazish uchun ajoyib taklif tayyorladik!\n\n🍱 'Family Weekend Set':\n- 2 ta Asosiy go'shtli taom\n- 2 ta Mualliflik pitsasi\n- Yangi uzilgan sabzavotli salatlar\n- 1L tabiiy limonad\n\n💰 Maxsus narx: atigi 280,000 so'm (eski narx: 350,000 so'm).",
                    "cta": "Yetkazib berish yoki bron qilish uchun 'SET' deb izoh qoldiring! 🛵",
                    "visual_prompt": "Top-down flatlay shot of a grand feast table, colorful dishes, pizza, salad, juicy meat, drinks, family hands reaching for food.",
                    "hashtags": ["#jumamuborak", "#maxsustaklif", "#chegirmatoshkent", "#oilaviytaom", "#yetkazibberish"],
                    "best_time": "10:30 - 12:00"
                },
                {
                    "day": 6,
                    "day_name": "Shanba",
                    "type": "Mijoz Fikri (Social Proof)",
                    "title": "Mijozlarimiz biz haqimizda nima deydi?",
                    "hooks": [
                        "'Toshkentda 10 yildan beri bunday mazali pitsa yemagandim!' ⭐️⭐️⭐️⭐️⭐️",
                        "Bizni tanlagan 10,000+ baxtli mehmonlarga rahmat!",
                        "Mehmonlarimizning eng samimiy his-tuyg'ulari 🥰"
                    ],
                    "caption": "⭐️ Har bir mehmonga qadriyat sifatida qaraymiz!\n\nO'tgan haftada bizga tashrif buyurgan Nodira opaning samimiy fikrlari butun jamoamizni ilhomlantirdi:\n\n'Tug'ilgan kunimni ushbu restoranda nishonladik. Xizmat ko'rsatish, taomlar va sovg'a qilingan desert shunchaki a'lo darajada!'\n\nSiz bizning taomlarimizni tatib ko'rganmisiz? O'z xolis bahoingizni yozib qoldiring!",
                    "cta": "Siz ham o'z fikringizni bildiring va keyingi tashrifda maxsus meva choyiga ega bo'ling! ☕",
                    "visual_prompt": "Happy couple smiling at dinner table celebrating with a small birthday dessert and sparkler.",
                    "hashtags": ["#mijozfikri", "#reviews", "#restaurantfeedback", "#toshkenthizmat", "#xursandmijoz"],
                    "best_time": "15:00 - 17:00"
                },
                {
                    "day": 7,
                    "day_name": "Yakshanba",
                    "type": "Ko'ngilochar / Humor",
                    "title": "Diyetani dushanbadan boshlaydiganlar uchun hazil",
                    "hooks": [
                        "Diyetani dushanbadan boshlayman degan do'stingizga yuboring 😂",
                        "Yakshanba kuni kechki soat 22:00 da muzlatgichni ochganda... 👀",
                        "Bizning desertlarimiz oldida hech kim o'zini tutib turolmaydi!"
                    ],
                    "caption": "🍕 'Diyeta? Qaysi diyeta? Dushanbadan boshlaymiz-da!'\n\nYakshanba kuni o'zingizni erkalash uchun eng yaxshi kun. Mazali shirinliklarimiz sizni kutmoqda.\n\nBarchaga maroqli dam olish kunini tilaymiz! 🍰✨",
                    "cta": "Diyetani doim kechiktiradigan do'stingizni izohda belgilang! 👇😄",
                    "visual_prompt": "Fun humorous close up shot of a giant chocolate lava cake oozing warm melted chocolate.",
                    "hashtags": ["#yakshanba", "#kulgu", "#damolish", "#foodhumor", "#shirinliklar", "#toshkent"],
                    "best_time": "20:00 - 21:30"
                }
            ]
        }
    },
    "clothing": {
        "uz": {
            "name": "Kiyim-kechak va Moda do'koni",
            "hooks": [
                "Ushbu kiyim kombinatsiyasi sizni 5 yoshga yoshroq va 100% zamonaviy ko'rsatadi! 👗",
                "2026-yilning eng trenddagi 3 ta obrazini ko'rdingizmi?",
                "Qimmat ko'rinish uchun qimmat kiyinish shart emas! Mana isboti 🧥",
                "Garderobingizda kiyim to'la, lekin kiyishga hech narsa yo'qmi? Yechim bizda!",
                "Bu ko'ylak sotuvga chiqqan kuniyoq talash bo'ldi... 🔥"
            ],
            "sample_content": [
                {
                    "day": 1,
                    "day_name": "Dushanba",
                    "type": "Reels (Trend/Outfit)",
                    "title": "1 ta pidjak bilan 4 xil zamonaviy obraz",
                    "hooks": [
                        "Bitta kiyim bilan butun haftani qanday bezash mumkin? 🧥",
                        "Stilistlarning eng sevimli siri: Kapsula garderob!",
                        "Ofisga, uchrashuvga va sayrga — 1 ta kiyimda!"
                    ],
                    "caption": "✨ Har kuni ertalab 'Bugun nima kiysam ekan?' deb bosh qotirasizmi?\n\nBugungi videomizda oddiy bej rangli pidjak yordamida 4 xil mutlaqo boshqacha obraz yaratishni ko'rsatdik:\n1. Klassik ofis uslubi\n2. Smart-casual (jinsi bilan)\n3. Oqshom uchrashuvi uchun romantik obraz\n4. Dam olish kunlari uchun qulay sport-shik\n\nQaysi obraz sizga ko'proq yoqdi? 1, 2, 3 yoki 4?",
                    "cta": "O'zingizga mos razmerni bilish uchun Direct'ga 'PIDJAK' deb yozing! 📩",
                    "visual_prompt": "Fast paced fashion transition reel, model switching between 4 chic outfits against a clean pastel studio background.",
                    "hashtags": ["#kiyimdo'koni", "#modatoshkent", "#ayollarkiyimi", "#capsulewardrobe", "#fashionuz", "#toshkentlook"],
                    "best_time": "13:00 - 14:30"
                },
                {
                    "day": 2,
                    "day_name": "Seshanba",
                    "type": "Karusel (Ekspert maslahati)",
                    "title": "Bo'y va qomatga mos kiyim tanlash sirlari",
                    "hooks": [
                        "Bo'yni uzunroq ko'rsatuvchi 3 ta kiyim hiylasi 👠",
                        "Har qanday qomatda mukammal ko'rinish siri!",
                        "Bu xatolar kiyimingizni arzon ko'rsatadi (qilmang!)"
                    ],
                    "caption": "💡 Mukammal uslub — bu qomatning barcha ustunliklarini to'g'ri ko'rsatish san'atidir!\n\nBizning stilistimiz tayyorlagan qo'llanmada vertikal chiziqlar, belni ajratib ko'rsatish va to'g'ri uzunlikdagi shimlarni tanlash bo'yicha qimmatli tavsiyalarni o'qing.\n\nSlaydlarni varoqlang va foydali ma'lumotlarni saqlab oling! 📌",
                    "cta": "Garderobini yangilamoqchi bo'lgan dugonangizga yuboring! ↗️",
                    "visual_prompt": "Editorial fashion guide carousel, clean aesthetic typography with chic outfit illustrations and real model photography.",
                    "hashtags": ["#stilistmaslahati", "#obrazlar", "#qomatmos", "#uzbekfashion", "#toshkentbrend"],
                    "best_time": "18:30 - 20:00"
                },
                {
                    "day": 3,
                    "day_name": "Chorshanba",
                    "type": "Yagona Rasm (Yangi Kolleksiya)",
                    "title": "Bahor/Yoz yangi kolleksiyasi taqdimoti",
                    "hooks": [
                        "Kutilgan yangi kolleksiya nihoyat yetib keldi! 🌸",
                        "Tabiiy matolar, nafis bichim va cheklangan miqdor!",
                        "Garderobingizning eng sevimli ko'ylagiga aylanadi ✨"
                    ],
                    "caption": "🌸 Yangi nafas, yangi hissiyotlar!\n\n100% tabiiy ipak va paxta matosidan tikilgan ushbu ko'ylaklar tanaga mayin teginib, yengillik bag'ishlaydi.\n\n📐 O'lchamlar: S, M, L, XL\n🎨 Ranglar: Bej, Zaytun, Och moviy va Klassik qora.\n\nEslatib o'tamiz, har bir rangdan faqat 10 donadan kelgan!",
                    "cta": "Buyurtma berish uchun izohda '+' qoldiring, narx va o'lchamlarni Direct'ga yuboramiz! 🛍",
                    "visual_prompt": "Stunning high fashion photography of a model in airy silk dress walking in sunny modern urban architecture with soft shadow play.",
                    "hashtags": ["#yangikolleksiya", "#ko'ylaklar", "#ipakkiyim", "#toshkentbutik", "#onlineshoppinguz"],
                    "best_time": "12:00 - 13:30"
                },
                {
                    "day": 4,
                    "day_name": "Payshanba",
                    "type": "Stories Interaktiv (Try-on)",
                    "title": "Jonli kiyib ko'rish va obunachilar tanlovi",
                    "hooks": [
                        "Bugun qaysi ko'ylakni birinchi bo'lib kiyib ko'ramiz? (Ovoz bering)",
                        "Matoning sifatini yaqindan ko'rmoqchimisiz? 👀",
                        "Obunachilarimiz uchun maxsus promokod Stories'da!"
                    ],
                    "caption": "Stories ssenariysi:\n1. Story: 3 xil ko'ylak rasmi + Ovoz berish sticker'i\n2. Story: G'olib bo'lgan ko'ylakni modelda jonli video orqali ko'rsatish (matosi, tikilishi, orqa tomoni)\n3. Story: 'Bugun buyurtma berganlarga bepul yetkazib berish promokodi: BAHOR26'\n4. Story: Direct havolasi.",
                    "cta": "Stories'ga o'ting va o'z ovozingizni bering! 📲",
                    "visual_prompt": "Vertical format mobile perspective of boutique racks with soft luxury lighting and price tags.",
                    "hashtags": ["#storiesuz", "#onlineshop", "#butiktoshkent", "#kiyimlar"],
                    "best_time": "14:00 - 16:00"
                },
                {
                    "day": 5,
                    "day_name": "Juma",
                    "type": "Sotuv Posti (Aksiya / Flash Sale)",
                    "title": "Faqat 48 soat: Tanlangan assortimentga 30% chegirma!",
                    "hooks": [
                        "Bunday narxlar faqat yilda 1 marta bo'ladi! 🔥",
                        "Garderobni yangilash uchun eng ajoyib fursat!",
                        "30% CHEGIRMA — sevimli kiyimlaringiz kutmoqda!"
                    ],
                    "caption": "🔥 DIQQAT: Hafta oxiri uchun maxsus Flash Sale!\n\nJuma, Shanba va Yakshanba kunlari eng xaridorgir modellarimizga 30% gacha CHEGIRMA e'lon qilamiz!\n\nO'zbekiston bo'ylab 1 kun ichida yetkazib berish xizmati mavjud 🚚\nKiyib ko'rish va ma'qul kelmasa almashtirish kafolati beriladi.",
                    "cta": "Chegirmadagi katalogga ega bo'lish uchun profil sarlavhasidagi havola orqali o'ting! 🔗",
                    "visual_prompt": "Dynamic flatlay of stylish clothing accessories, shoes, handbag and sunglasses with minimalist 30% OFF banner.",
                    "hashtags": ["#chegirma", "#saleuz", "#aksiya", "#arzontoshkent", "#modatoshkent", "#arzonkiyimlar"],
                    "best_time": "11:00 - 13:00"
                },
                {
                    "day": 6,
                    "day_name": "Shanba",
                    "type": "Mijoz Obrazi (UGC & Feedback)",
                    "title": "Mijozlarimizning go'zal obrazlari",
                    "hooks": [
                        "Mijozimiz bizning libosimizda to'yda barchaning e'tiborida bo'ldi! ✨",
                        "Sizlarning suratlaringiz — bizning eng katta faxrimiz!",
                        "Oddiy xariddan boshlanib, doimiy muhabbatga aylangan hikoya 🥰"
                    ],
                    "caption": "✨ Biz uchun eng katta baxt — sizning yuzingizdagi samimiy tabassum va o'zingizga bo'lgan ishonchdir!\n\nBizni belgilab surat ulashgan barcha aziz mijozlarimizga minnatdorchilik bildiramiz.\n\nSiz ham bizning kiyimlarimizdagi suratingizni Stories'da ulashing va keyingi xarid uchun 50,000 so'mlik vaucherga ega bo'ling! 🎁",
                    "cta": "Suratlaringizda bizni belgilashni unutmang: @brend_nomi 📸",
                    "visual_prompt": "Real customer smiling wearing a tailored suit, modern natural daylight, candid authentic street style photo.",
                    "hashtags": ["#mijozsuratlari", "#bizningmijozlar", "#otzivuz", "#realfeedback", "#toshkentpeople"],
                    "best_time": "16:00 - 18:00"
                },
                {
                    "day": 7,
                    "day_name": "Yakshanba",
                    "type": "Ilhomlantiruvchi / Shaxsiy Uslub",
                    "title": "O'zingizga bo'lgan ishonch va go'zallik",
                    "hooks": [
                        "Kiyim — bu siz gapirmasdan oldin o'zingiz haqingizda aytadigan hikoyangizdir 💫",
                        "Har bir ayol o'zini malikalardek his qilishga loyiq!",
                        "Yangi haftani yangi maqsadlar va yorqin kayfiyat bilan boshlang!"
                    ],
                    "caption": "💫 Dunyoga mashhur dizayner Giorgio Armani shunday degan:\n'Nafislik — bu boshqalarning e'tiborini tortish emas, balki ularning xotirasida muhrlanib qolishdir.'\n\nO'zingizni seving, o'zingizga g'amxo'rlik qiling va har doim o'zingiz xohlagandek kiyining.\n\nYangi haftangiz yutuq va go'zallikka to'la bo'lsin! ☕🌸",
                    "cta": "Ushbu fikrga qo'shilsangiz, yurakcha qoldiring! ❤️",
                    "visual_prompt": "Aesthetic lifestyle shot of an elegant woman walking gracefully in a stylish trench coat, holding a coffee cup, Parisienne aesthetic.",
                    "hashtags": ["#estetika", "#aforizmlar", "#gozallik", "#ayollaruchun", "#toshkentshop", "#yakshanba"],
                    "best_time": "20:00 - 21:30"
                }
            ]
        }
    },
    "education": {
        "uz": {
            "name": "Ta'lim, IT Kurslar va O'quv Markazlari",
            "hooks": [
                "3 oyda 0 dan IT sohasiga kirib, $500+ maosh olish mumkinmi? Mana haqiqiy keys! 💻",
                "Ingliz tilini 10 yil o'rganib ham gapira olmaslikning 1 ta asosiy sababi!",
                "Universitet diplomisiz katta daromadga chiqish yo'li 🚀",
                "Sun'iy intellekt davrida qaysi kasblar eng ko'p talab qilinadi?",
                "Bu xatoni qilganingiz uchun grammatikani unutib qo'yyapsiz!"
            ],
            "sample_content": [
                {
                    "day": 1,
                    "day_name": "Dushanba",
                    "type": "Reels (Keys / Natija)",
                    "title": "O'quvchimizning 0 dan $800 maoshga erishish hikoyasi",
                    "hooks": [
                        "Oddiy talabadan xalqaro kompaniya dasturchisigacha: 4 oylik yo'l! 🚀",
                        "Universitetda o'rgatilmagan, lekin ish beruvchilar talab qiladigan ko'nikma!",
                        "IT sohasiga qanday kirib kelish mumkin? Qadamma-qadam yo'riqnoma!"
                    ],
                    "caption": "🔥 Dushanba — kelajak uchun yangi qadam tashlash kuni!\n\nBizning 19 yoshli bitiruvchimiz Jasur kursimizni tamomlab, 1 oy ichida xalqaro IT kompaniyasida Junior dasturchi sifatida ish boshladi.\n\nU buni qanday qildi?\n1. Nazariyani emas, 100% amaliy loyihalarni o'rgandi\n2. Mentorlardan to'g'ridan-to'g'ri maslahat oldi\n3. Kuchli portfolioga ega bo'ldi.\n\nSiz ham o'z hayotingizni o'zgartirishga tayyormisiz?",
                    "cta": "Bepul birinchi darsga yozilish uchun 'KURS' deb izoh qoldiring! 💻",
                    "visual_prompt": "Dynamic tech reels frame of a young programmer working on modern dual monitor setup with futuristic code editor glowing.",
                    "hashtags": ["#itkurslar", "#dasturlash", "#pythonuz", "#toshkenttalim", "#zamonaviykasblar", "#kelajakkasblari"],
                    "best_time": "12:30 - 14:00"
                },
                {
                    "day": 2,
                    "day_name": "Seshanba",
                    "type": "Karusel (Foydali Qo'llanma)",
                    "title": "Boshlovchilar uchun 5 ta eng yaxshi bepul resurs",
                    "hooks": [
                        "Dasturlashni o'rganishda bu 5 ta saytdan foydalanmasangiz, ko'p vaqt yo'qotasiz! ⏳",
                        "IELTS 8.0 olish uchun eng zo'r bepul platformalar!",
                        "Xotirani 3 barobar kuchaytiruvchi ilmiy usul (Saqlab oling)"
                    ],
                    "caption": "📚 Qimmat kurslarga pul sarflashdan oldin, mustaqil o'rganishni boshlashingiz mumkin bo'lgan eng sara saytlarni to'pladik!\n\nHar bir slaydni diqqat bilan o'rganing, havolalarni saqlab oling va bugunoq o'rganishni boshlang.\n\nUnutmang: bilimsizlik emas, harakat qilmaslik eng katta xatodir!",
                    "cta": "Postni do'stlaringizga ulashing va saqlab oling! 📌",
                    "visual_prompt": "Clean infographic carousel slides showing tech logos, study tips and cheat sheets with high contrast modern UI.",
                    "hashtags": ["#bepulresurslar", "#talimuz", "#ieltsuz", "#kurslartoshkent", "#bilimol"],
                    "best_time": "18:00 - 19:30"
                },
                {
                    "day": 3,
                    "day_name": "Chorshanba",
                    "type": "Yagona Rasm / Statistika",
                    "title": "2026-yilda eng yuqori maosh to'lanadigan 5 kasb",
                    "hooks": [
                        "Kelgusi 5 yilda bu kasb egalariga talab 300% ga oshadi! 📈",
                        "AI sizning ishingizni olib qo'yadimi? Haqiqat bilan yuzlashing!",
                        "Diplom kerak bo'lmagan, lekin oyiga $1500+ keltiradigan sohalar!"
                    ],
                    "caption": "📊 Jahon Iqtisodiy Forumi (WEF) hisobotiga ko'ra, sun'iy intellekt va ma'lumotlar tahlili sohasi eng yuqori o'sish sur'atiga ega.\n\nTop-5 istiqbolli yo'nalishlar:\n1. AI & Machine Learning injiniring\n2. Kiberxavfsizlik\n3. Full-Stack dasturlash\n4. Data Analytics\n5. UI/UX Dizayn\n\nSiz qaysi birini tanlagan bo'lardingiz?",
                    "cta": "Qaysi soha sizga ko'proq qiziq? Izohlarda raqamini qoldiring! 👇",
                    "visual_prompt": "Minimalist high-tech infographic diagram illustrating salary growth across tech professions with sleek gradient bars.",
                    "hashtags": ["#kasblar", "#itsohasi", "#daromad", "#kelajak", "#talim", "#toshkent"],
                    "best_time": "13:00 - 14:30"
                },
                {
                    "day": 4,
                    "day_name": "Payshanba",
                    "type": "Stories Interaktiv (Test / Viktorina)",
                    "title": "Ingliz tili / IT bo'yicha darajani aniqlovchi mini-test",
                    "hooks": [
                        "5 ta savoldan 4 tasiga to'g'ri javob bera olasizmi? 🧠",
                        "Darajangizni 2 daqiqada tekshirib ko'ring!",
                        "Xato javob berganlar 1 oy bepul o'qiydi (hazil, lekin test qiziq!)"
                    ],
                    "caption": "Stories ssenariysi:\n1. Story: Savol 1: 'Qaysi so'z xato yozilgan?' (Quiz sticker)\n2. Story: Savol 2: Mantiqiy savol\n3. Story: Savol 3: Kod parchasidagi xatoni topish\n4. Story: 'Barcha savollarga javob berganlarga kursimizga 15% chegirma promokodi: INTELEKT26'",
                    "cta": "Stories'ga o'ting va o'z darajangizni sinab ko'ring! 📲",
                    "visual_prompt": "Mobile interactive quiz UI mockup with engaging neon buttons and countdown timer.",
                    "hashtags": ["#viktorina", "#testuz", "#bilimsinovi", "#storiesquiz"],
                    "best_time": "15:00 - 17:00"
                },
                {
                    "day": 5,
                    "day_name": "Juma",
                    "type": "Sotuv Posti (Yangi Guruh / Qabul)",
                    "title": "Yangi guruhlarga qabul ochildi — Cheklangan 12 ta o'rin!",
                    "hooks": [
                        "Shu dushanbadan yangi hayotingizni boshlang: 0 dan PRO gacha! 🎓",
                        "Shoshiling: birinchi 5 kishiga 25% chegirma va mentorlik darsi sovg'a!",
                        "Orzuingizdagi kasbga atigi 1 qadam qoldi!"
                    ],
                    "caption": "🎓 'Kutishni bas qiling, o'rganishni boshlang!'\n\nYangi haftadan start oluvchi guruhlarimiz uchun qabul boshlandi.\n\nSizni nimalar kutmoqda:\n✅ Amaliyotchi mutaxassislardan darslar\n✅ Real kompaniyalar loyihalari ustida ishlash\n✅ Kurs yakunida ishga joylashishda yordam (Resume review & Mock interview)\n✅ Xalqaro sertifikat.\n\nO'rinlar soni har bir guruhda faqat 12 ta!",
                    "cta": "Ro'yxatdan o'tish va konsultatsiya olish uchun 'START' deb yozing! 🚀",
                    "visual_prompt": "Modern bright academy classroom with laptops, energetic collaborative students and mentor at whiteboard.",
                    "hashtags": ["#kursgayoziish", "#itakademiyasi", "#toshkenttalim", "#talaba", "#kelajak", "#chegirma"],
                    "best_time": "11:00 - 13:00"
                },
                {
                    "day": 6,
                    "day_name": "Shanba",
                    "type": "Mentorlar bilan Tanishtiruv",
                    "title": "Katta tajribaga ega mentorimiz bilan tanishing",
                    "hooks": [
                        "U 500+ o'quvchini IT sohasiga olib kirgan va 8 yillik tajribaga ega!",
                        "Eng yaxshi o'qituvchi — sohaning ichida amalda ishlayotgan insondir 👨‍🏫",
                        "O'quvchilarining 90%i kurs davomida birinchi daromadiga chiqadi!"
                    ],
                    "caption": "👨‍💻 Bizning kuchimiz — bizning mentorlarimizda!\n\nBugun bosh instruktorimiz Alisher bilan tanishtiramiz. U Yevropa va AQSH loyihalarida Senior Full-Stack dasturchi sifatida faoliyat yuritgan.\n\nAlisherning dars o'tish falsafasi:\n'Quruq qoidalarni yodlatish emas, muammoni mustaqil yechishga o'rgatish.'\n\nMentoringizga qanday savollaringiz bor? Izohlarda qoldiring!",
                    "cta": "Mentorimizga savollaringizni bering, eng qiziq 3 ta savolga video orqali javob beramiz! 💬",
                    "visual_prompt": "Portrait of confident smiling tech mentor in front of cozy modern tech office, warm lighting.",
                    "hashtags": ["#mentor", "#ustoz", "#ituzbekistan", "#tajriba", "#toshkentmarkaz"],
                    "best_time": "16:00 - 18:00"
                },
                {
                    "day": 7,
                    "day_name": "Yakshanba",
                    "type": "Motivatsiya / Rivojlanish",
                    "title": "Muvaffaqiyatga erishishning 1% qoidasi",
                    "hooks": [
                        "Har kuni 1% yaxshiroq bo'lsangiz, 1 yildan keyin 37 barobar kuchli bo'lasiz! 📈",
                        "Eng qiyin narsa — birinchi qadamni qo'yishdir.",
                        "Ertaga yana bir hafta boshlanadi: Siz uni qanday o'tkazmoqchisiz?"
                    ],
                    "caption": "⚡ 'Kichik odatlar — ulkan natijalar yaratadi.'\n\nHech qachon bir kechada muvaffaqiyatga erishib bo'lmaydi. Har kuni 20 daqiqa kitob o'qish, 30 daqiqa yangi ko'nikma o'rganish yoki 1 ta kod yozish — sizni millionlab tengdoshlaringizdan oldinga olib chiqadi.\n\nYangi haftada o'zingizga qanday maqsad qo'ymoqchisiz? Quyida yozing va o'z so'zingiz ustidan chiqing! 💪",
                    "cta": "Maqsadingizni izohlarda yozib, o'zingizga qasamyod qiling! ✍️",
                    "visual_prompt": "Inspiring minimal desk flatlay with opened notebook, steaming coffee cup, sleek laptop, and sunrise light streaming through window.",
                    "hashtags": ["#motivatsiya", "#maqsad", "#intizom", "#shaxsiyrivojlanish", "#muvaffaqiyat", "#yakshanba"],
                    "best_time": "20:00 - 22:00"
                }
            ]
        }
    }
}

CREATIVE_REELS_TEMPLATES = [
    {
        "title": "3 soniyalik Ilmoq + Muammo + Kutilmagan Yechim",
        "category": "Viral Reels",
        "duration": "20-30 soniya",
        "timeline": [
            {"time": "0:00 - 0:03", "action": "Kadrda shoshilinch harakat yoki imo-ishora (ilmoq)", "text_on_screen": "🛑 Agar buni qilayotgan bo'lsangiz, darhol to'xtating!", "audio": "Trenddagi dramatik ovoz / bass drop"},
            {"time": "0:03 - 0:12", "action": "Mijozning eng katta og'rig'ini ko'rsatish (xato yoki qiyinchilik)", "text_on_screen": "Nega ko'pchilik bu xatoga yo'l qo'yadi?", "audio": "Xotirjam tushuntirish ohangi"},
            {"time": "0:12 - 0:22", "action": "Bizning yechim yoki mahsulotimizni amalda ko'rsatish", "text_on_screen": "Mana aslida qanday qilish kerak (3 ta qadam)", "audio": "Ritmik, ilhomlantiruvchi musiqa"},
            {"time": "0:22 - 0:30", "action": "Kameraga qarab to'g'ridan-to'g'ri chaqiruv (CTA)", "text_on_screen": "To'liq qo'llanma uchun izohga 'START' deb yozing 📲", "audio": "Xulosa qiluvchi signal"}
        ]
    },
    {
        "title": "Before vs After (Oldin va Keyin) Transformatsiyasi",
        "category": "Keys / Transformatsiya",
        "duration": "15-20 soniya",
        "timeline": [
            {"time": "0:00 - 0:02", "action": "Mijozning dastlabki xafa / chalkash holati", "text_on_screen": "Bizga murojaat qilishdan oldin... 📉", "audio": "Sekin, g'amgin fon musiqa"},
            {"time": "0:02 - 0:04", "action": "Kamera qarsak yoki barmoq shiqillatish (Transition)", "text_on_screen": "Va atigi 7 kundan keyin! ✨", "audio": "Barmog'i shiqillaganda dinamik 'Beat drop'"},
            {"time": "0:04 - 0:15", "action": "Ajoyib natijalar, quvnoq hissiyotlar, chiroyli kadrlar", "text_on_screen": "Natija: +200% o'sish va 100% mamnunlik! 🔥", "audio": "Yuqori energiyali baxtli musiqa"},
            {"time": "0:15 - 0:20", "action": "Logotip va Directga havola", "text_on_screen": "Siz ham shunday natija xohlaysizmi? Directga yozing! 📩", "audio": "Qo'ng'iroqcha tovushi"}
        ]
    },
    {
        "title": "Behind The Scenes (Parda ortidagi haqiqat)",
        "category": "Ishonch & Brend",
        "duration": "25-35 soniya",
        "timeline": [
            {"time": "0:00 - 0:04", "action": "Odatda mijozlar ko'rmaydigan qiziqarli jarayonni ko'rsatish", "text_on_screen": "Kamera ortida nimalar bo'lishini hech ko'rganmisiz? 🤫", "audio": "Qiziqish uyg'otuvchi lo-fi musiqa"},
            {"time": "0:04 - 0:18", "action": "Tezkor montaj (Timelapse): Qadoqlash, tayyorlash, jamoa mehnati", "text_on_screen": "Har bir buyurtma orqasida qanchalik katta mehr bor ❤️", "audio": "Tezkor ritm"},
            {"time": "0:18 - 0:28", "action": "Sifat nazorati va tayyor mahsulotni taqdim etish", "text_on_screen": "Siz uchun faqat eng yaxshisi!", "audio": "Xotirjam estetika"},
            {"time": "0:28 - 0:35", "action": "Jamoa qo'l silkitishi", "text_on_screen": "Bugungi buyurtmangizni kutib oling! 📦", "audio": "Yoqimli yakun"}
        ]
    }
]

STORIES_FUNNEL_TEMPLATES = [
    {
        "title": "5 Kunlik / 5 Bosqichli Stories Sotuv Voronkasi",
        "steps": [
            {
                "step": 1,
                "type": "Qiziqish uyg'otish (Hook & Trigger)",
                "description": "Foydalanuvchilarning diqqatini tortish. Masalan: 'Bugun sizlarga hech kim aytmagan bir sirni ochmoqchiman...' yoki 'Kimda shunday muammo bor?'",
                "interactive_element": "Ha/Yo'q yoki Reaksiya slider sticker (🔥)",
                "tip": "Birinchi storyda hech narsa sotmang, faqat auditoriyani jalb qiling."
            },
            {
                "step": 2,
                "type": "Muammoni chuqurlashtirish (Agitation & Pain)",
                "description": "Ushbu muammo qanday yo'qotishlarga olib kelishi (vaqt, pul, asab sarfi) haqida real misol yoki o'z tajribangiz bilan bo'lishing.",
                "interactive_element": "Savol-javob sticker: 'Siz bu holatda nima qilardingiz?'",
                "tip": "Mijoz o'zini siz aytayotgan vaziyatda ko'rsin."
            },
            {
                "step": 3,
                "type": "Yechim va Ekspertlik (Solution & Authority)",
                "description": "Muammoni qanday qilib oson va samarali yechish mumkinligini ko'rsating. Qadamma-qadam 2-3 ta asosiy maslahat bering.",
                "interactive_element": "Viktorina / Quiz sticker: 'Eng to'g'ri qadamni toping'",
                "tip": "Foydali kontent berib, ishonchni maksimal darajaga ko'taring."
            },
            {
                "step": 4,
                "type": "Ijtimoiy isbot (Social Proof & Case)",
                "description": "Sizning mahsulotingiz yoki xizmatingizdan foydalanib natijaga erishgan mijoz skrinshoti, audio fikri yoki video lavhasi.",
                "interactive_element": "Katta his-tuyg'uli emojilar",
                "tip": "Haqiqiy va samimiy sharhlar har qanday reklamadan kuchliroq."
            },
            {
                "step": 5,
                "type": "Cheklangan taklif va Sotuv (Offer & CTA)",
                "description": "Faqat bugun buyurtma bergan birinchi 10 kishiga maxsus sovg'a yoki 20% chegirma taqdim etiladi.",
                "interactive_element": "Direct ga havola / Link sticker yoki 'NARX' so'zini yozish chaqiruvi",
                "tip": "Taymer qo'ying yoki vaqt chegarasini eslating (Urgency)."
            }
        ]
    }
]
