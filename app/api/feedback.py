from typing import List, Optional
from fastapi import APIRouter, Depends, status, Header
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.feedback import Feedback
from app.models.user import User
from app.schemas.feedback import FeedbackCreate, FeedbackOut
from app.utils.security import decode_access_token

from app.services.telegram_service import TelegramService

router = APIRouter(prefix="/api/feedback", tags=["Feedback"])

@router.post("", response_model=FeedbackOut, status_code=status.HTTP_201_CREATED)
def submit_feedback(
    data: FeedbackCreate,
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None)
):
    """
    Shikoyat va taklif yuborish (ham tizimga kirgan foydalanuvchilar, ham mehmonlar uchun).
    """
    user_id = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        payload = decode_access_token(token)
        if payload and "sub" in payload:
            user_id = payload["sub"]

    feedback = Feedback(
        user_id=user_id,
        name=data.name,
        email=data.email,
        telegram_username=data.telegram_username,
        type=data.type,
        subject=data.subject,
        message=data.message,
        status="new"
    )
    db.add(feedback)
    db.commit()
    db.refresh(feedback)

    # Telegram Bot orqali xabar yuborish
    try:
        TelegramService.send_feedback_notification({
            "type": feedback.type,
            "name": feedback.name,
            "email": feedback.email,
            "telegram_username": feedback.telegram_username,
            "subject": feedback.subject,
            "message": feedback.message,
            "created_at": feedback.created_at.strftime("%Y-%m-%d %H:%M:%S") if feedback.created_at else ""
        })
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
