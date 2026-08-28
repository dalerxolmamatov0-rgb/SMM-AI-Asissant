import json
import logging
from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from app.config import settings
from app.database.session import get_db
from app.services.telegram_bot_poller import activate_user_pro, deactivate_user_pro
from app.services.telegram_service import TelegramService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/telegram", tags=["Telegram Webhook"])

@router.post("/webhook")
async def telegram_webhook(request: Request):
    """
    Telegram Bot Webhook: [✅ Tasdiqlash] va [❌ Rad etish] tugmalari bosilishini qabul qilish.
    """
    try:
        data = await request.json()
        
        # 1. Inline button callback query
        if "callback_query" in data:
            cb = data["callback_query"]
            cb_id = cb["id"]
            cb_data = cb.get("data", "")
            message = cb.get("message", {})
            chat_id = message.get("chat", {}).get("id")
            message_id = message.get("message_id")

            # Parse plan codes
            PLAN_CODE_MAP = {
                "p1": "Boshlang'ich Pro",
                "p2": "Standart Pro",
                "p3": "VIP Biznes Pro"
            }

            from app.services.pro_service import ProSubscriptionService

            if cb_data.startswith("ap:") or cb_data.startswith("approve"):
                raw_params = cb_data.split(":", 1)[1] if ":" in cb_data else ""
                parts = raw_params.split("|")
                email = parts[0].strip().lower() if len(parts) > 0 else ""
                
                # Check plan code or plan name
                plan_code_or_name = parts[1] if len(parts) > 1 else "p2"
                if len(parts) > 2:
                    plan_code_or_name = parts[2]
                
                plan_name = PLAN_CODE_MAP.get(plan_code_or_name, plan_code_or_name if "Pro" in plan_code_or_name else "Standart Pro")

                # Bazada va serverless doimiy xotirada 1 oylik (30 kun) Pro obunani faollashtirish
                ProSubscriptionService.activate_pro(email, plan_name, days=30)
                activate_user_pro(email, "", plan_name, days=30)

                alert_msg = f"✅ To'lov TASDIQLANDI!\n\n{email} uchun 1 oylik {plan_name} faollashtirildi! 🌟"
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

                ProSubscriptionService.deactivate_pro(email)
                deactivate_user_pro(email, "")

                alert_msg = "❌ To'lov RAD ETILDI!\nFoydalanuvchi to'lovi bekor qilindi."
                TelegramService.answer_callback_query(cb_id, alert_msg, show_alert=True)

                if chat_id and message_id:
                    new_markup = {
                        "inline_keyboard": [
                            [{"text": "❌ RAD ETILDI", "callback_data": "done_rejected"}]
                        ]
                    }
                    TelegramService.edit_message_reply_markup(chat_id, message_id, new_markup)

            elif cb_data.startswith("done"):
                TelegramService.answer_callback_query(cb_id, "Ushbu to'lov allaqachon ko'rib chiqilgan.", show_alert=False)

        # 2. Text message command
        elif "message" in data:
            msg = data["message"]
            text = msg.get("text", "").strip()
            chat_id = msg.get("chat", {}).get("id")

            if text.startswith("/start"):
                welcome_text = (
                    "👋 <b>Assalomu alaykum!</b>\n\n"
                    "AI SMM Assistant to'lov cheklari va murojaatlar boshqaruv botiga xush kelibsiz.\n\n"
                    "Foydalanuvchilar saytdan to'lov qilganda cheklar shu yerga keladi va siz <b>[✅ Tasdiqlash]</b> tugmasi orqali ularga 1 oylik Pro obuna berishingiz mumkin.\n\n"
                    "💡 Shuningdek, <code>/approve email@manzil.com</code> buyrug'i orqali ham to'g'ridan-to'g'ri faollashtirishingiz mumkin."
                )
                import urllib.request
                token = settings.TELEGRAM_BOT_TOKEN
                if token and chat_id:
                    url = f"https://api.telegram.org/bot{token}/sendMessage"
                    payload = {"chat_id": chat_id, "text": welcome_text, "parse_mode": "HTML"}
                    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json"})
                    urllib.request.urlopen(req, timeout=5)

            elif text.startswith("/approve") or text.startswith("/pro"):
                parts = text.split()
                target_email = parts[1].strip().lower() if len(parts) > 1 else ""
                target_plan = "Standart Pro"
                if len(parts) > 2:
                    if "vip" in text.lower() or "100" in text.lower():
                        target_plan = "VIP Biznes Pro"
                    elif "boshlang" in text.lower():
                        target_plan = "Boshlang'ich Pro"
                
                if target_email and "@" in target_email:
                    from app.services.pro_service import ProSubscriptionService
                    ProSubscriptionService.activate_pro(target_email, target_plan, days=30)
                    activate_user_pro(target_email, "", target_plan, days=30)
                    resp_text = f"✅ <b>Muvaffaqiyatli!</b>\n\n<code>{target_email}</code> uchun 1 oylik <b>{target_plan}</b> faollashtirildi!"
                else:
                    resp_text = "⚠️ Iltimos, email manzilni kiriting.\nMasalan: <code>/approve user@gmail.com</code>"

                import urllib.request
                token = settings.TELEGRAM_BOT_TOKEN
                if token and chat_id:
                    url = f"https://api.telegram.org/bot{token}/sendMessage"
                    payload = {"chat_id": chat_id, "text": resp_text, "parse_mode": "HTML"}
                    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json"})
                    urllib.request.urlopen(req, timeout=5)

        return {"ok": True}
    except Exception as e:
        logger.error("Telegram webhook error: %s", str(e))
        return {"ok": False, "error": str(e)}
