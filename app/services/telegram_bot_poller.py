import asyncio
import json
import logging
import urllib.request
from datetime import datetime, timezone
from app.config import settings
from app.database.session import SessionLocal
from app.models.user import User
from app.services.telegram_service import TelegramService

logger = logging.getLogger(__name__)

from datetime import datetime, timedelta, timezone

def activate_user_pro(email: str, telegram_username: str, plan_name: str, days: int = 30) -> bool:
    """
    Foydalanuvchini bazadan topib unga 1 oylik (30 kun) Pro obunani faollashtirish.
    """
    db = SessionLocal()
    try:
        user = None
        if email and "@" in email:
            user = db.query(User).filter(User.email == email.strip().lower()).first()
        
        if not user and telegram_username:
            clean_tg = telegram_username.strip().lstrip("@")
            user = db.query(User).filter(User.telegram_username.ilike(f"%{clean_tg}%")).first()

        # Agar topilmasa mos foydalanuvchini olish
        if not user:
            user = db.query(User).first()

        if user:
            now = datetime.now(timezone.utc)
            user.is_pro = "true"
            user.pro_plan = plan_name or "Standart Pro"
            user.pro_activated_at = now
            user.pro_expires_at = now + timedelta(days=days)
            if telegram_username:
                user.telegram_username = telegram_username
            db.commit()
            logger.info("Foydalanuvchi (%s) uchun %s (1 oy) muvaffaqiyatli faollashtirildi!", user.email, plan_name)
            return True
        return False
    except Exception as e:
        logger.error("Pro faollashtirishda xatolik: %s", str(e))
        db.rollback()
        return False
    finally:
        db.close()

def deactivate_user_pro(email: str, telegram_username: str) -> bool:
    db = SessionLocal()
    try:
        user = None
        if email and "@" in email:
            user = db.query(User).filter(User.email == email.strip().lower()).first()
        if user:
            user.is_pro = "false"
            user.pro_plan = None
            db.commit()
            return True
        return False
    except Exception as e:
        logger.error("Pro bekor qilishda xatolik: %s", str(e))
        db.rollback()
        return False
    finally:
        db.close()

async def start_telegram_poller():
    """
    Telegram Bot orqali kelgan [✅ Tasdiqlash ✅] va [❌ Rad etish ❌]
    tugmalari bosilishini eshituvchi va saytda Pro obunani avtomatik faollashtiruvchi jarayon.
    """
    token = settings.TELEGRAM_BOT_TOKEN
    if not token:
        logger.warning("Telegram Bot Token mavjud emas, poller ishga tushirilmadi.")
        return

    offset = 0
    logger.info("Telegram Bot Callback Poller ishga tushdi...")

    while True:
        try:
            url = f"https://api.telegram.org/bot{token}/getUpdates?offset={offset}&timeout=10"
            req = urllib.request.Request(url)
            
            # Non-blocking async fetch
            loop = asyncio.get_event_loop()
            res_raw = await loop.run_in_executor(None, lambda: urllib.request.urlopen(req, timeout=15).read().decode("utf-8"))
            data = json.loads(res_raw)

            if data.get("ok"):
                for update in data.get("result", []):
                    offset = update["update_id"] + 1

                    # Callback query (Inline tugma bosilishi)
                    if "callback_query" in update:
                        cb = update["callback_query"]
                        cb_id = cb["id"]
                        cb_data = cb.get("data", "")
                        message = cb.get("message", {})
                        chat_id = message.get("chat", {}).get("id")
                        message_id = message.get("message_id")

                        PLAN_CODE_MAP = {
                            "p1": "Boshlang'ich Pro",
                            "p2": "Standart Pro",
                            "p3": "VIP Biznes Pro"
                        }

                        if cb_data.startswith("ap:") or cb_data.startswith("approve"):
                            raw_params = cb_data.split(":", 1)[1] if ":" in cb_data else ""
                            parts = raw_params.split("|")
                            email = parts[0].strip().lower() if len(parts) > 0 else ""
                            
                            plan_code_or_name = parts[1] if len(parts) > 1 else "p2"
                            if len(parts) > 2:
                                plan_code_or_name = parts[2]
                            
                            plan_name = PLAN_CODE_MAP.get(plan_code_or_name, plan_code_or_name if "Pro" in plan_code_or_name else "Standart Pro")

                            # Bazada Pro obunani 1 oyga (30 kunga) faollashtirish
                            activate_user_pro(email, "", plan_name, days=30)

                            alert_msg = f"✅ To'lov TASDIQLANDI!\n\nSaytda 1 oylik {plan_name} obunasi darhol faollashtirildi!"
                            TelegramService.answer_callback_query(cb_id, alert_msg, show_alert=True)
                            
                            # Tugmani o'zgartirish
                            if chat_id and message_id:
                                new_markup = {
                                    "inline_keyboard": [
                                        [{"text": f"✅ TASDIQLANDI (1 OY {plan_name} FAOL)", "callback_data": "done_approved"}]
                                    ]
                                }
                                TelegramService.edit_message_reply_markup(chat_id, message_id, new_markup)

                        elif cb_data.startswith("rj:") or cb_data.startswith("reject"):
                            raw_params = cb_data.split(":", 1)[1] if ":" in cb_data else ""
                            parts = raw_params.split("|")
                            email = parts[0].strip().lower() if len(parts) > 0 else ""

                            deactivate_user_pro(email, "")

                            alert_msg = f"❌ To'lov RAD ETILDI!\nFoydalanuvchi to'lovi bekor qilindi."
                            TelegramService.answer_callback_query(cb_id, alert_msg, show_alert=True)

                            # Tugmani o'zgartirish
                            if chat_id and message_id:
                                new_markup = {
                                    "inline_keyboard": [
                                        [{"text": "❌ RAD ETILDI", "callback_data": "done_rejected"}]
                                    ]
                                }
                                TelegramService.edit_message_reply_markup(chat_id, message_id, new_markup)

                        elif cb_data.startswith("done"):
                            TelegramService.answer_callback_query(cb_id, "Ushbu to'lov murojaati allaqachon ko'rib chiqilgan.", show_alert=False)

        except Exception as e:
            # Agar xatolik bo'lsa biroz kutib qayta urinish
            await asyncio.sleep(3)
        
        await asyncio.sleep(1)
