from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.chat import ChatMessage
from app.schemas.chat import ChatRequest, ChatMessageOut, ChatResponse
from app.providers import get_ai_provider

router = APIRouter(prefix="/api/chat", tags=["AI Marketing Assistant Chat"])

@router.post("", response_model=ChatResponse)
async def chat_with_assistant(
    req: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    AI Marketing Assistant bilan suhbat (kontekstli chat).
    """
    # 1. Foydalanuvchi xabarini saqlash
    user_msg = ChatMessage(
        user_id=current_user.id,
        role="user",
        message=req.message
    )
    db.add(user_msg)
    db.commit()

    # 2. Oxirgi suhbatlar tarixini olish (oxirgi 6 ta xabar)
    recent_history = db.query(ChatMessage).filter(
        ChatMessage.user_id == current_user.id
    ).order_by(ChatMessage.created_at.desc()).limit(6).all()
    recent_history.reverse()

    messages_payload = [{"role": m.role, "content": m.message} for m in recent_history]

    # 3. AI provayderdan javob olish
    provider = get_ai_provider()
    ai_response_text = await provider.generate_chat_response(
        messages=messages_payload,
        context=req.context_business
    )

    # 4. AI javobini saqlash
    ai_msg = ChatMessage(
        user_id=current_user.id,
        role="assistant",
        message=ai_response_text
    )
    db.add(ai_msg)
    db.commit()
    db.refresh(ai_msg)

    return {
        "response": ai_response_text,
        "message_id": ai_msg.id
    }

@router.get("/history", response_model=List[ChatMessageOut])
def get_chat_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Foydalanuvchining barcha chat xabarlari tarixini olish.
    """
    messages = db.query(ChatMessage).filter(
        ChatMessage.user_id == current_user.id
    ).order_by(ChatMessage.created_at.asc()).all()
    return messages

@router.delete("/clear", status_code=status.HTTP_204_NO_CONTENT)
def clear_chat_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Foydalanuvchining chat tarixini tozalash.
    """
    db.query(ChatMessage).filter(ChatMessage.user_id == current_user.id).delete()
    db.commit()
    return None
