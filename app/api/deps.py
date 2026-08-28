from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.utils.security import decode_access_token
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    """
    JWT tokenni tekshirib, joriy foydalanuvchini qaytaruvchi dependency.
    """
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Tizimga kirish talab etiladi (Token topilmadi)",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Yaroqsiz yoki muddati o'tgan token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id: str = payload.get("sub")
    email: str = payload.get("email")

    user = None
    if user_id:
        user = db.query(User).filter(User.id == user_id).first()
    if not user and email:
        user = db.query(User).filter(User.email == email.strip().lower()).first()

    from app.services.pro_service import ProSubscriptionService
    user_email = email or (user.email if user else "")

    # Agar serverless konteyner almashgan bo'lsa va JWT imzosi to'g'ri bo'lsa:
    if user is None:
        if email or user_id:
            import uuid
            user_name = (email.split("@")[0] if email else "Foydalanuvchi").capitalize()
            pro_st = ProSubscriptionService.check_pro_status(user_email)
            user = User(
                id=user_id or str(uuid.uuid4()),
                name=user_name,
                email=email or f"user_{str(user_id)[:8]}@gmail.com",
                password_hash="verified_jwt_session",
                auth_provider="local",
                is_pro="true" if pro_st["is_pro"] else "false",
                pro_plan=pro_st["plan"]
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Foydalanuvchi sessiyasi topilmadi. Iltimos, qayta kiring.",
            )
    else:
        # Sync Pro status
        pro_st = ProSubscriptionService.check_pro_status(user.email, user)
        if pro_st["is_pro"] and str(user.is_pro).lower() not in ["true", "1", "yes"]:
            user.is_pro = "true"
            user.pro_plan = pro_st["plan"]
            db.commit()

    return user
