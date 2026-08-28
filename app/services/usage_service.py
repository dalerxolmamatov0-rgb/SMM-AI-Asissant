from datetime import datetime, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.usage import Usage
from app.models.user import User
from app.config import settings
from app.services.pro_service import ProSubscriptionService

class UsageService:
    @staticmethod
    def get_current_month_str() -> str:
        now = datetime.now(timezone.utc)
        return now.strftime("%Y-%m")

    @classmethod
    def get_user_usage(cls, db: Session, user_id: str) -> dict:
        current_month = cls.get_current_month_str()
        user = db.query(User).filter(User.id == user_id).first()
        
        # Pro statusini tekshirish
        pro_status = ProSubscriptionService.check_pro_status(user.email if user else "", user)
        is_pro = pro_status["is_pro"]
        pro_plan = pro_status["plan"]

        usage_record = db.query(Usage).filter(
            Usage.user_id == user_id,
            Usage.month == current_month
        ).first()

        used = usage_record.generation_count if usage_record else 0
        if is_pro:
            limit = pro_status["limit"]
            remaining = 999999 if limit >= 999999 else max(0, limit - used)
        else:
            limit = settings.FREE_MONTHLY_LIMIT
            remaining = max(0, limit - used)

        return {
            "month": current_month,
            "used": used,
            "limit": limit,
            "remaining": remaining,
            "is_pro": is_pro,
            "pro_plan": pro_plan,
            "remaining_days": pro_status.get("remaining_days", 0)
        }

    @classmethod
    def check_and_increment_usage(cls, db: Session, user_id: str) -> dict:
        """
        Foydalanuvchi limitini tekshiradi va 1 taga oshiradi.
        """
        current_month = cls.get_current_month_str()
        user = db.query(User).filter(User.id == user_id).first()
        
        pro_status = ProSubscriptionService.check_pro_status(user.email if user else "", user)
        is_pro = pro_status["is_pro"]
        pro_plan = pro_status["plan"]

        usage_record = db.query(Usage).filter(
            Usage.user_id == user_id,
            Usage.month == current_month
        ).first()

        if not usage_record:
            usage_record = Usage(
                user_id=user_id,
                month=current_month,
                generation_count=0
            )
            db.add(usage_record)
            db.flush()

        current_limit = pro_status["limit"] if is_pro else settings.FREE_MONTHLY_LIMIT

        if usage_record.generation_count >= current_limit:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Sizning oylik AI generatsiya limitingiz tugadi. Yuqoriroq Pro ta'rifga o'ting yoki keyingi oyni kuting."
            )

        usage_record.generation_count += 1
        db.commit()
        db.refresh(usage_record)

        limit = current_limit
        remaining = 999999 if current_limit >= 999999 else max(0, limit - usage_record.generation_count)

        return {
            "month": current_month,
            "used": usage_record.generation_count,
            "limit": limit,
            "remaining": remaining,
            "is_pro": is_pro,
            "pro_plan": pro_plan,
            "remaining_days": pro_status.get("remaining_days", 0)
        }
