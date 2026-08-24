from pydantic import BaseModel, EmailStr, Field, ConfigDict, model_validator
from typing import Optional
from datetime import datetime

class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Foydalanuvchi ismi")
    email: EmailStr = Field(..., description="Elektron pochta manzili")
    password: str = Field(..., min_length=8, max_length=100, description="Parol (kamida 8 ta belgi)")
    confirm_password: Optional[str] = Field(None, min_length=8, max_length=100, description="Parolni tasdiqlash")

    @model_validator(mode="after")
    def check_passwords_match(self):
        if self.confirm_password is not None and self.password != self.confirm_password:
            raise ValueError("Parollar mos kelmadi. Iltimos, bir xil parol kiriting.")
        return self

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class GoogleAuthRequest(BaseModel):
    credential: Optional[str] = Field(None, description="Google Identity Services ID Token")
    email: Optional[EmailStr] = Field(None, description="Google orqali berilgan email (fallback/test uchun)")
    name: Optional[str] = Field(None, description="Foydalanuvchi ismi")
    avatar_url: Optional[str] = Field(None, description="Profil rasmi")

class UserOut(BaseModel):
    id: str
    name: str
    email: str
    auth_provider: Optional[str] = "local"
    avatar_url: Optional[str] = None
    is_pro: Optional[str] = "false"
    pro_plan: Optional[str] = None
    telegram_username: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

class UsageOut(BaseModel):
    month: str
    used: int
    limit: int
    remaining: int
    is_pro: Optional[bool] = False
    pro_plan: Optional[str] = None
