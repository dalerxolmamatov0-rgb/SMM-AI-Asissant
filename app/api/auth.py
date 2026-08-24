from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.auth import UserRegister, UserLogin, GoogleAuthRequest, UserOut, Token, UsageOut
from app.services.auth_service import AuthService
from app.services.usage_service import UsageService
from app.api.deps import get_current_user
from app.models.user import User

from app.config import settings

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.get("/config")
def get_auth_config():
    """
    Frontend uchun ochiq autentifikatsiya sozlamalari (masalan, Google Client ID).
    """
    return {
        "google_client_id": settings.GOOGLE_CLIENT_ID or ""
    }

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    """
    Yangi foydalanuvchini ro'yxatdan o'tkazish va JWT token berish.
    """
    new_user = AuthService.register_user(db, user_data)
    auth_result = AuthService.authenticate_user(db, UserLogin(email=user_data.email, password=user_data.password))
    return auth_result

@router.post("/login", response_model=Token)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    """
    Tizimga kirish (Login) va JWT token olish.
    """
    return AuthService.authenticate_user(db, login_data)

@router.post("/google", response_model=Token)
def google_auth(google_data: GoogleAuthRequest, db: Session = Depends(get_db)):
    """
    Google orqali ro'yxatdan o'tish yoki kirish.
    """
    return AuthService.authenticate_google_user(db, google_data)

@router.get("/me", response_model=UserOut)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """
    Joriy foydalanuvchi ma'lumotlarini olish.
    """
    return current_user

@router.post("/logout")
def logout():
    """
    Tizimdan chiqish (Logout).
    """
    return {"message": "Tizimdan muvaffaqiyatli chiqildi"}

@router.get("/usage", response_model=UsageOut)
def get_usage(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Foydalanuvchining oylik AI generatsiyalari limiti va sarfini olish.
    """
    return UsageService.get_user_usage(db, current_user.id)

