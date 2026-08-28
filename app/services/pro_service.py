import os
import json
import logging
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

# File-based cache for serverless environments
DATA_DIR = Path("/tmp") if os.getenv("VERCEL") else Path(__file__).resolve().parent.parent / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)
PRO_STORE_FILE = DATA_DIR / "pro_subscriptions.json"

PLAN_LIMITS = {
    "Boshlang'ich Pro": 35,
    "Standart Pro": 50,
    "VIP Biznes Pro": 999999
}

class ProSubscriptionService:
    @staticmethod
    def _read_store() -> Dict[str, Any]:
        try:
            if PRO_STORE_FILE.exists():
                with open(PRO_STORE_FILE, "r", encoding="utf-8") as f:
                    return json.load(f)
        except Exception as e:
            logger.error("Error reading pro store: %s", e)
        return {}

    @staticmethod
    def _write_store(data: Dict[str, Any]):
        try:
            with open(PRO_STORE_FILE, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            logger.error("Error writing pro store: %s", e)

    @classmethod
    def activate_pro(cls, email: str, plan_name: str = "Standart Pro", days: int = 30) -> bool:
        """
        Foydalanuvchiga Pro obunani 1 oy (yoki ko'rsatilgan kun) muddatga faollashtirish.
        """
        clean_email = str(email).strip().lower()
        if not clean_email or "@" not in clean_email:
            return False

        # Plan normalization
        norm_plan = "Standart Pro"
        if "vip" in plan_name.lower() or "100" in plan_name.lower() or "biznes" in plan_name.lower():
            norm_plan = "VIP Biznes Pro"
        elif "boshlang" in plan_name.lower() or "30" in plan_name.lower():
            norm_plan = "Boshlang'ich Pro"
        elif "standart" in plan_name.lower() or "50" in plan_name.lower() or "59" in plan_name.lower():
            norm_plan = "Standart Pro"

        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(days=days)

        # 1. Update JSON store (works across all serverless instances)
        store = cls._read_store()
        store[clean_email] = {
            "email": clean_email,
            "is_pro": True,
            "plan": norm_plan,
            "limit": PLAN_LIMITS.get(norm_plan, 50),
            "activated_at": now.isoformat(),
            "expires_at": expires_at.isoformat(),
            "expires_timestamp": expires_at.timestamp()
        }
        cls._write_store(store)

        # 2. Update SQLite Database if available
        try:
            from app.database.session import SessionLocal
            from app.models.user import User
            db = SessionLocal()
            try:
                user = db.query(User).filter(User.email == clean_email).first()
                if user:
                    user.is_pro = "true"
                    user.pro_plan = norm_plan
                    user.pro_activated_at = now
                    user.pro_expires_at = expires_at
                    db.commit()
            finally:
                db.close()
        except Exception as e:
            logger.error("DB update error in activate_pro: %s", e)

        logger.info("PRO activated for %s: %s (expires: %s)", clean_email, norm_plan, expires_at)
        return True

    @classmethod
    def deactivate_pro(cls, email: str) -> bool:
        clean_email = str(email).strip().lower()
        store = cls._read_store()
        if clean_email in store:
            store.pop(clean_email, None)
            cls._write_store(store)

        try:
            from app.database.session import SessionLocal
            from app.models.user import User
            db = SessionLocal()
            try:
                user = db.query(User).filter(User.email == clean_email).first()
                if user:
                    user.is_pro = "false"
                    user.pro_plan = None
                    db.commit()
            finally:
                db.close()
        except Exception as e:
            logger.error("DB update error in deactivate_pro: %s", e)

        return True

    @classmethod
    def check_pro_status(cls, email: str, db_user=None) -> Dict[str, Any]:
        """
        Foydalanuvchining Pro holati va qolgan muddatini tekshirish.
        """
        clean_email = str(email).strip().lower()
        now = datetime.now(timezone.utc)
        now_ts = now.timestamp()

        # 1. Check JSON store first
        store = cls._read_store()
        if clean_email in store:
            item = store[clean_email]
            exp_ts = item.get("expires_timestamp", 0)
            if exp_ts > now_ts:
                return {
                    "is_pro": True,
                    "plan": item.get("plan", "Standart Pro"),
                    "limit": item.get("limit", 50),
                    "expires_at": item.get("expires_at"),
                    "remaining_days": max(1, int((exp_ts - now_ts) / 86400))
                }
            else:
                # Expired
                store.pop(clean_email, None)
                cls._write_store(store)

        # 2. Check Database user object
        if db_user and str(db_user.is_pro).lower() in ["true", "1", "yes"]:
            if db_user.pro_expires_at:
                exp = db_user.pro_expires_at.replace(tzinfo=timezone.utc) if db_user.pro_expires_at.tzinfo is None else db_user.pro_expires_at
                if exp > now:
                    plan = db_user.pro_plan or "Standart Pro"
                    return {
                        "is_pro": True,
                        "plan": plan,
                        "limit": PLAN_LIMITS.get(plan, 50),
                        "expires_at": exp.isoformat(),
                        "remaining_days": max(1, int((exp.timestamp() - now_ts) / 86400))
                    }
                else:
                    db_user.is_pro = "false"
            else:
                plan = db_user.pro_plan or "Standart Pro"
                return {
                    "is_pro": True,
                    "plan": plan,
                    "limit": PLAN_LIMITS.get(plan, 50),
                    "expires_at": None,
                    "remaining_days": 30
                }

        return {
            "is_pro": False,
            "plan": None,
            "limit": 10,
            "expires_at": None,
            "remaining_days": 0
        }

    @staticmethod
    def ensure_telegram_webhook(base_url: str) -> bool:
        """
        Telegram botga avtomatik Webhook URL ni sozlash.
        """
        from app.config import settings
        token = settings.TELEGRAM_BOT_TOKEN
        if not token or not base_url:
            return False

        clean_base = base_url.rstrip("/")
        webhook_url = f"{clean_base}/api/telegram/webhook"
        set_url = f"https://api.telegram.org/bot{token}/setWebhook?url={urllib.request.quote(webhook_url)}"
        
        try:
            req = urllib.request.Request(set_url)
            with urllib.request.urlopen(req, timeout=5) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                return data.get("ok", False)
        except Exception as e:
            logger.error("Set webhook error: %s", e)
            return False
