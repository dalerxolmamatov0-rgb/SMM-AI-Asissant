from typing import List, Optional
from fastapi import APIRouter, Depends, status, Header
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.feedback import Feedback
from app.models.user import User
from app.schemas.feedback import FeedbackCreate, FeedbackOut
from app.utils.security import decode_access_token

from app.services.telegram_service import TelegramService

from fastapi import APIRouter, Depends, status, Header, Request
from app.services.telegram_service import TelegramService
from app.services.pro_service import ProSubscriptionService

router = APIRouter(prefix="/api/feedback", tags=["Feedback"])

@router.post("", response_model=FeedbackOut, status_code=status.HTTP_201_CREATED)
def submit_feedback(
    data: FeedbackCreate,
    request: Request,
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None)
):
    """
    Shikoyat va taklif yuborish (ham tizimga kirgan foydalanuvchilar, ham mehmonlar uchun).
    """
    user_id = None
    user_email = data.email
    user_name = data.name

    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        payload = decode_access_token(token)
        if payload:
            user_id = payload.get("sub")
            if not user_email and payload.get("email"):
                user_email = payload.get("email")

    if user_id and (not user_email or not user_name):
        u = db.query(User).filter(User.id == user_id).first()
        if u:
            user_email = user_email or u.email
            user_name = user_name or u.name

    user_email = user_email or "foydalanuvchi@gmail.com"
    user_name = user_name or user_email.split("@")[0].capitalize()

    feedback = Feedback(
        user_id=user_id,
        name=user_name,
        email=user_email,
        telegram_username=data.telegram_username or "",
        type=data.type or "payment",
        subject=data.subject or "Pro Ta'rif To'lovi",
        message=data.message or "Pro obuna to'lovi so'rovi",
        status="new"
    )
    db.add(feedback)
    db.commit()
    db.refresh(feedback)

    # Telegram Bot Webhookni avtomatik sozlash va xabar yuborish
    try:
        base_url = str(request.base_url)
        ProSubscriptionService.ensure_telegram_webhook(base_url)
    except Exception:
        pass

    try:
        TelegramService.send_feedback_notification({
            "type": feedback.type,
            "name": feedback.name,
            "email": feedback.email,
            "telegram_username": feedback.telegram_username,
            "subject": feedback.subject,
            "message": feedback.message,
            "is_payment": True,
            "with_buttons": True,
            "created_at": feedback.created_at.strftime("%Y-%m-%d %H:%M:%S") if feedback.created_at else ""
        })
    except Exception as e:
        print("Telegram send error:", e)
    except Exception:
        pass

    return feedback

@router.get("/my", response_model=List[FeedbackOut])
def get_my_feedbacks(
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None)
):
    """
    Foydalanuvchining yuborgan shikoyat va takliflari ro'yxatini olish.
    """
    if not authorization or not authorization.startswith("Bearer "):
        return []

    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        return []

    user_id = payload["sub"]
    feedbacks = db.query(Feedback).filter(Feedback.user_id == user_id).order_by(Feedback.created_at.desc()).all()
    return feedbacks
