from datetime import datetime, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.usage import Usage
from app.models.user import User
from app.config import settings

class UsageService:
    @staticmethod
    def get_current_month_str() -> str:
        now = datetime.now(timezone.utc)
        return now.strftime("%Y-%m")

    @classmethod
    def get_user_usage(cls, db: Session, user_id: str) -> dict:
        current_month = cls.get_current_month_str()
        user = db.query(User).filter(User.id == user_id).first()
        now = datetime.now(timezone.utc)
        
        is_pro = False
        if user and str(user.is_pro).lower() in ["true", "1", "yes"]:
            if user.pro_expires_at:
                expires_at = user.pro_expires_at.replace(tzinfo=timezone.utc) if user.pro_expires_at.tzinfo is None else user.pro_expires_at
                if expires_at > now:
                    is_pro = True
                else:
                    user.is_pro = "false"
                    db.commit()
            else:
                is_pro = True

        pro_plan = user.pro_plan if (user and is_pro) else None

        usage_record = db.query(Usage).filter(
            Usage.user_id == user_id,
            Usage.month == current_month
        ).first()

        used = usage_record.generation_count if usage_record else 0
        if is_pro:
            if pro_plan and "boshlang'ich" in str(pro_plan).lower():
                limit = 35
                remaining = max(0, limit - used)
            elif pro_plan and "standart" in str(pro_plan).lower():
                limit = 50
                remaining = max(0, limit - used)
            else:
                limit = 999999
                remaining = 999999
        else:
            limit = settings.FREE_MONTHLY_LIMIT
            remaining = max(0, limit - used)

        return {
            "month": current_month,
            "used": used,
            "limit": limit,
            "remaining": remaining,
            "is_pro": is_pro,
            "pro_plan": pro_plan
        }

    @classmethod
    def check_and_increment_usage(cls, db: Session, user_id: str) -> dict:
        """
        Foydalanuvchi limitini tekshiradi va 1 taga oshiradi.
        """
        current_month = cls.get_current_month_str()
        user = db.query(User).filter(User.id == user_id).first()
        now = datetime.now(timezone.utc)
        
        is_pro = False
        if user and str(user.is_pro).lower() in ["true", "1", "yes"]:
            if user.pro_expires_at:
                expires_at = user.pro_expires_at.replace(tzinfo=timezone.utc) if user.pro_expires_at.tzinfo is None else user.pro_expires_at
                if expires_at > now:
                    is_pro = True
                else:
                    user.is_pro = "false"
                    db.commit()
            else:
                is_pro = True

        pro_plan = user.pro_plan if (user and is_pro) else None

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

        current_limit = settings.FREE_MONTHLY_LIMIT
        if is_pro:
            if pro_plan and "boshlang'ich" in str(pro_plan).lower():
                current_limit = 35
            elif pro_plan and "standart" in str(pro_plan).lower():
                current_limit = 50
            else:
                current_limit = 999999

        if usage_record.generation_count >= current_limit:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Sizning oylik AI generatsiya limitingiz tugadi. Yuqoriroq Pro ta'rifga o'ting yoki keyingi oyni kuting."
            )

        usage_record.generation_count += 1
        db.commit()
        db.refresh(usage_record)

        limit = current_limit
        remaining = 999999 if current_limit == 999999 else max(0, limit - usage_record.generation_count)

        return {
            "month": current_month,
            "used": usage_record.generation_count,
            "limit": limit,
            "remaining": remaining,
            "is_pro": is_pro,
            "pro_plan": pro_plan
        }
