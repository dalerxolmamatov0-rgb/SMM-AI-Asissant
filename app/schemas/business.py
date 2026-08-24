from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime

class BusinessProfileBase(BaseModel):
    business_name: str = Field(..., max_length=120)
    business_type: str = Field(..., max_length=100)
    description: Optional[str] = None
    target_audience: Optional[str] = None
    tone: Optional[str] = "Do'stona va samimiy"
    platform: Optional[str] = "Instagram"

class BusinessProfileCreate(BusinessProfileBase):
    pass

class BusinessProfileUpdate(BaseModel):
    business_name: Optional[str] = None
    business_type: Optional[str] = None
    description: Optional[str] = None
    target_audience: Optional[str] = None
    tone: Optional[str] = None
    platform: Optional[str] = None

class BusinessProfileOut(BusinessProfileBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
