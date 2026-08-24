from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000, description="Foydalanuvchi savoli")
    context_business: Optional[str] = None

class ChatMessageOut(BaseModel):
    id: str
    role: str
    message: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ChatResponse(BaseModel):
    response: str
    message_id: str
