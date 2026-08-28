from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime

class FeedbackCreate(BaseModel):
    name: Optional[str] = Field("Foydalanuvchi", description="Murojaatchi ismi")
    email: Optional[str] = Field(None, description="Elektron pochta manzili")
    telegram_username: Optional[str] = Field(None, description="Telegram username (@username)")
    type: Optional[str] = Field("payment", description="Murojaat turi: payment, suggestion, complaint, question, other")
    subject: Optional[str] = Field("Pro Ta'rif To'lovi", description="Mavzu")
    message: Optional[str] = Field("Pro obunani faollashtirish so'rovi", description="Batafsil xabar")

class FeedbackOut(BaseModel):
    id: str
    user_id: Optional[str] = None
    name: Optional[str] = "Foydalanuvchi"
    email: Optional[str] = ""
    telegram_username: Optional[str] = None
    type: Optional[str] = "payment"
    subject: Optional[str] = ""
    message: Optional[str] = ""
    status: Optional[str] = "new"
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
