# 🤖 AI SMM Assistant — Professional Web Platform

**AI SMM Assistant** — kichik biznes egalari, SMM mutaxassislari, freelancerlar va kontent yaratuvchilarga sun'iy intellekt yordamida tez, sifatli va yuqori konversiyali marketing kontentlari yaratishda yordam beruvchi zamonaviy, to'liq ishlaydigan Full-Stack SaaS platformasi.

---

## 🚀 1. Asosiy Imkoniyatlar (Features)

### 🎯 7 ta Kuchli AI Marketing Vositalari:
1. **📝 AI Post Generator:**
   - AIDA va PAS formulalarida yozilgan, emojilar va formatlangan paragraflarga ega to'liq post matni
   - E'tiborni tortuvchi sarlavha va kuchli Harakatga chaqiruv (CTA)
   - Saralangan hashtaglar va eng yaxshi yuklash vaqti tavsiyasi
2. **🎬 Reels Idea Generator:**
   - 3 soniyalik virusli Ilmoq (Hook)
   - Kadrlar bo'yicha ketma-ketlik (Timeline: harakatlar, ekrandagi yozuv, diktor matni)
   - To'liq Voice-over diktor matni va musiqiy tavsiya
3. **📅 Content Plan Generator (7, 14, 30 kun):**
   - Formatlar (Reels, Karusel, Stories, Sotuv posti, Mijoz fikri) bo'yicha balanslangan kalendar
   - Interaktiv jadval va kartochkalar ko'rinishi
   - 1-bosishda professional formatdagi **PDF hisobot** yuklab olish (jsPDF orqali)
4. **🏷 Hashtag Generator:**
   - Toifalarga ajratilgan: *High Competition, Medium Competition, Niche, Local, Branded*
   - Har bir toifani yoki alohida hashtagni 1-bosishda nusxalash
5. **📣 Ad Copy Generator (Target Reklama):**
   - 3 xil uzunlikdagi variant: *Short (Qisqa), Medium (O'rtacha), Long (Storytelling)*
   - A/B testing uchun tayyor Hook, Body va CTA
6. **🎨 AI Image Prompt Generator:**
   - Midjourney va DALL-E 3 uchun professional ingliz tilidagi fotorealistik promptlar
   - Formatlar: *Instagram post (1:1), Story (9:16), Reels cover (9:16), Product photo, Ad, Lifestyle*
   - Qo'shimcha **Negative Prompt** va yorug'lik/kamera linzalari tavsiyasi
7. **🎯 Target Audience Analyzer:**
   - Ideal mijoz portreti (Avatar), yosh segmenti, og'riqli nuqtalar (Pain points)
   - Asosiy ehtiyojlar, sotib olishga undovchi triggerlar va marketing burchaklari (Angles)

### 💬 AI Marketing Assistant (Chat):
- Kontekstli shaxsiy marketing va SMM konsultanti
- Suhbatlar tarixi xotirasi, yangi chat ochish, tozalash va javoblarni nusxalash

### 🔐 Xavfsiz Autentifikatsiya va Bepul Foydalanish Tizimi:
- Ro'yxatdan o'tish (Register), Kirish (Login) va Chiqish (Logout)
- **Google akkaunt orqali 1-bosishda kirish / ro'yxatdan o'tish (Google OAuth)**
- Xavfsiz **Bcrypt** shifrlash va **JWT Access Token**
- **Oylik 10 ta bepul generatsiya limiti** — backend (`Usage` modeli) tomonidan qat'iy nazorat qilinadi

### 📬 Shikoyat va Takliflar Tizimi (Feedback):
- Bosh sahifa (Landing) footeri va Dashboard menyusidan murojaat yuborish
- Toifalar: *💡 Taklif*, *⚠️ Shikoyat*, *❓ Savol / Yordam*
- Mehmonlar va ro'yxatdan o'tgan foydalanuvchilar uchun to'liq integratsiya

### 🏢 Biznes Profil va Tarix:
- Biznes ma'lumotlarini 1 marta saqlash — barcha generatorlarda avtomatik to'ldiriladi
- Barcha generatsiyalarni turlari bo'yicha filtrlash, ko'rish, nusxalash va o'chirish

---

## 🛠 2. Texnologik Stack

- **Backend:** Python 3.12+, FastAPI, SQLAlchemy 2.0, Pydantic v2, Uvicorn, python-dotenv, PyJWT, Bcrypt, HTTPX
- **Ma'lumotlar Bazasi:** SQLite (Development) / PostgreSQL (Production uchun tayyor)
- **Frontend:** Modern Responsive SaaS UI, Tailwind CSS, Glassmorphism, Lucide Icons, Vanilla ES6+ Modular JS, jsPDF
- **AI Engine:** Modulli provayder abstraksiyasi (`BaseAIProvider` -> `MockAIProvider`, `GeminiProvider`, `OpenAIProvider`)

---

## ⚙️ 3. O'rnatish va Sozlash (Installation)

### 1-qadam: Repozitoriyani yuklab oling yoki oching:
```bash
cd "SMM AI Asissant"
```

### 2-qadam: Kerakli kutubxonalarni o'rnating:
```bash
pip install -r requirements.txt
```

### 3-qadam: `.env` konfiguratsiya faylini sozlang:
`.env.example` faylidan nusxa olib, `.env` faylini yarating:
```env
PORT=8000
HOST=0.0.0.0
DEBUG=True

SECRET_KEY=smm_ai_super_secret_jwt_key_change_in_production_2026
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

DATABASE_URL=sqlite:///./smm_assistant.db

# AI Provayder ('mock', 'gemini', 'openai')
AI_PROVIDER=mock
AI_API_KEY=
AI_MODEL=gemini-1.5-flash

FREE_MONTHLY_LIMIT=10
```

> **Eslatma:** Agar sizda Gemini yoki OpenAI API kaliti bo'lmasa, `AI_PROVIDER=mock` rejimida platforma 100% to'liq, realistik va mukammal marketing kontentlarini generatsiya qilib beradi!

---

## ▶️ 4. Ishga Tushirish (Run)

### 1-usul (Windows uchun 1-bosishda):
`start.bat` fayliga 2 marta bosing.

### 2-usul (Terminal orqali):
```bash
python run.py
```

Server ishga tushadi va brauzeringizda avtomatik ravishda ochiladi:
- **Ilova:** `http://localhost:8000`
- **Interaktiv API Hujjatlari (Swagger UI):** `http://localhost:8000/docs`

---

## 🧪 5. Avtomatlashtirilgan Testlar (Testing)

Barcha asosiy modullar (Autentifikatsiya, 7 ta AI generator, 10 ta oylik limit nazorati va ma'lumotlar izolatsiyasi) `pytest` orqali to'liq qamrab olingan:

```bash
python -m pytest -v
```

Natija:
```
tests/test_auth.py ........... PASSED
tests/test_generation.py ...... PASSED
tests/test_history.py ......... PASSED
tests/test_usage_limit.py ..... PASSED

============== 14 passed in 8.03s ==============
```

---

## 🌐 6. Production Deploy Tayyorgarligi

- **PostgreSQL:** `.env` faylida `DATABASE_URL=postgresql://user:password@host:5432/dbname` qilib o'zgartirish kifoya. SQLAlchemy ORM jadvallarni avtomatik moslashtiradi.
- **Docker / Gunicorn:** `uvicorn app.main:app --workers 4 --host 0.0.0.0 --port 8000` buyrug'i bilan ishlatish mumkin.

---

## 🔮 7. Kelajakdagi Kengaytmalar (Future Roadmap)

- 💳 Mahalliy to'lov tizimlari (Click, Payme, Uzum) orqali pullik obuna tariflari
- 📲 Meta / Instagram Graph API integratsiyasi orqali avtomatik post joylash
- 👥 Agentliklar uchun jamoaviy workspace (Team Collaboration)
- 🌐 Rus va Ingliz tillari uchun to'liq ko'p tilli lokalizatsiya (i18n)
