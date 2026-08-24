from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional
from datetime import datetime

class FeedbackCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Murojaatchi ismi")
    email: EmailStr = Field(..., description="Elektron pochta manzili")
    telegram_username: str = Field(..., min_length=2, max_length=100, description="Telegram username (@username) - Shart")
    type: str = Field("suggestion", description="Murojaat turi: suggestion, complaint, question, other")
    subject: str = Field(..., min_length=3, max_length=200, description="Mavzu")
    message: str = Field(..., min_length=5, max_length=5000, description="Batafsil xabar")

class FeedbackOut(BaseModel):
    id: str
    user_id: Optional[str] = None
    name: str
    email: str
    telegram_username: str
    type: str
    subject: str
    message: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
