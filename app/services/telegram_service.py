import json
import logging
import urllib.request
import urllib.parse
from app.config import settings

logger = logging.getLogger(__name__)

class TelegramService:
    @staticmethod
    def send_feedback_notification(feedback_data: dict) -> bool:
        """
        Shikoyat, taklif yoki Pro to'lov so'rovi kelganda Telegram bot orqali xabar yuborish.
        To'lov xabarlariga [✅ Tasdiqlash ✅] va [❌ Rad etish ❌] tugmalari biriktiriladi.
        """
        token = settings.TELEGRAM_BOT_TOKEN
        if not token:
            logger.warning("Telegram Bot Token ko'rsatilmagan.")
            return False

        # Feedback turiga mos emoji va nom
        type_icons = {
            "suggestion": "💡 Taklif",
            "complaint": "⚠️ Shikoyat",
            "question": "❓ Savol / Yordam",
            "bug": "🐞 Xatolik / Bug",
            "payment": "💳 Pro To'lov"
        }
        type_title = type_icons.get(feedback_data.get("type", "suggestion"), "💬 Fikr-mulohaza")

        name = feedback_data.get("name", "Noma'lum")
        email = feedback_data.get("email", "Ko'rsatilmagan")
        telegram_username = feedback_data.get("telegram_username", "")
        subject = feedback_data.get("subject", "Mavzusiz")
        message = feedback_data.get("message", "")
        created_at = feedback_data.get("created_at", "")

        # Telegram username qatori
        if telegram_username:
            clean_tg = str(telegram_username).strip().lstrip("@")
            tg_line = f"📱 <b>Telegram:</b> <a href=\"https://t.me/{clean_tg}\">@{clean_tg}</a>"
        else:
            tg_line = "📱 <b>Telegram:</b> Ko'rsatilmagan"

        # To'lov xabari yoki oddiy murojaat ekanligini aniqlash
        is_payment = (
            feedback_data.get("is_payment", False) or 
            "to'lov" in str(subject).lower() or 
            "pro" in str(subject).lower() or
            "karta" in str(message).lower()
        )

        if is_payment:
            header = "💳 <b>Yangi Pro To'lov Murojaati!</b>"
            type_title = "👑 SMM AI Pro Obuna"
        else:
            header = "📬 <b>Yangi Murojaat qabul qilindi!</b>"

        # Chiroyli formatlangan va har biri alohida qatorlarda ajratilgan Telegram xabari
        text = (
            f"{header}\n\n"
            f"🏷 <b>Turi:</b> {type_title}\n\n"
            f"👤 <b>Yuboruvchi:</b> {name}\n\n"
            f"{tg_line}\n\n"
            f"📧 <b>Email:</b> {email}\n\n"
            f"📌 <b>Mavzu:</b> {subject}\n\n"
            f"💬 <b>Xabar matni:</b>\n<i>{message}</i>\n\n"
            f"⏰ <b>Vaqt:</b> {created_at}\n\n"
            f"🤖 <b>Platforma:</b> AI SMM Assistant"
        )

        chat_id = settings.TELEGRAM_CHAT_ID
        if not chat_id:
            logger.info("Telegram Chat ID ko'rsatilmagan. Xabar:\n%s", text)
            return True

        url = f"https://api.telegram.org/bot{token}/sendMessage"
        payload = {
            "chat_id": chat_id,
            "text": text,
            "parse_mode": "HTML",
            "disable_web_page_preview": True
        }

        # Plan extraction
        plan = "Standart Pro"
        plan_code = "p2"
        if "100 000" in str(subject) or "vip" in str(subject).lower():
            plan = "VIP Biznes Pro"
            plan_code = "p3"
        elif "30 000" in str(subject) or "boshlang'ich" in str(subject).lower():
            plan = "Boshlang'ich Pro"
            plan_code = "p1"
        elif "50 000" in str(subject) or "59 000" in str(subject) or "standart" in str(subject).lower():
            plan = "Standart Pro"
            plan_code = "p2"

        # Agar to'lov bo'lsa yoki tasdiqlash so'ralsa, [✅ Tasdiqlash] va [❌ Rad etish] tugmalari qo'shiladi
        # Telegram callback_data limiti qat'iy 64 bayt!
        clean_email = str(email).strip().lower()[:36]
        if is_payment or feedback_data.get("with_buttons", False):
            text += f"\n\n👉 <b>Tezkor tasdiqlash buyrug'i:</b> <code>/approve {clean_email}</code>"
            payload["text"] = text
            payload["reply_markup"] = {
                "inline_keyboard": [
                    [
                        {"text": f"✅ Tasdiqlash (1 oy Pro)", "callback_data": f"ap:{clean_email}|{plan_code}"},
                        {"text": "❌ Rad etish", "callback_data": f"rj:{clean_email}"}
                    ]
                ]
            }

        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                return res_data.get("ok", False)
        except urllib.error.HTTPError as he:
            err_body = he.read().decode("utf-8", errors="ignore")
            logger.error("Telegram API HTTP Error %s: %s", he.code, err_body)
            print(f"[TELEGRAM ERROR] {he.code}: {err_body}")
            # Agar tugmalar bilan yuborishda xatolik bo'lsa, oddiy matn sifatida qayta urinib ko'ramiz
            try:
                payload.pop("reply_markup", None)
                req_fallback = urllib.request.Request(
                    url,
                    data=json.dumps(payload).encode("utf-8"),
                    headers={"Content-Type": "application/json"}
                )
                with urllib.request.urlopen(req_fallback, timeout=10) as resp2:
                    return json.loads(resp2.read().decode("utf-8")).get("ok", False)
            except Exception:
                return False
        except Exception as e:
            logger.error("Telegramga xabar yuborishda xatolik: %s", str(e))
            print(f"[TELEGRAM EXCEPTION]: {e}")
            return False

    @staticmethod
    def answer_callback_query(callback_query_id: str, text: str, show_alert: bool = True) -> bool:
        token = settings.TELEGRAM_BOT_TOKEN
        if not token:
            return False
        url = f"https://api.telegram.org/bot{token}/answerCallbackQuery"
        payload = {
            "callback_query_id": callback_query_id,
            "text": text,
            "show_alert": show_alert
        }
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                res = json.loads(response.read().decode("utf-8"))
                return res.get("ok", False)
        except Exception as e:
            logger.error("answerCallbackQuery xatosi: %s", str(e))
            return False

    @staticmethod
    def edit_message_reply_markup(chat_id: int | str, message_id: int, reply_markup: dict = None) -> bool:
        token = settings.TELEGRAM_BOT_TOKEN
        if not token:
            return False
        url = f"https://api.telegram.org/bot{token}/editMessageReplyMarkup"
        payload = {
            "chat_id": chat_id,
            "message_id": message_id,
            "reply_markup": reply_markup or {"inline_keyboard": []}
        }
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                res = json.loads(response.read().decode("utf-8"))
                return res.get("ok", False)
        except Exception as e:
            logger.error("editMessageReplyMarkup xatosi: %s", str(e))
            return False
