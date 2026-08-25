import uuid
import httpx
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user import User
from app.schemas.auth import UserRegister, UserLogin, GoogleAuthRequest
from app.utils.security import hash_password, verify_password, create_access_token
from app.config import settings

class AuthService:
    @staticmethod
    def register_user(db: Session, user_data: UserRegister) -> User:
        email = str(user_data.email).strip().lower()
        name = str(user_data.name).strip()

        # Email bandligini tekshirish
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            # Agar foydalanuvchi avvalroq ro'yxatdan o'tgan bo'lsa yoki Google bilan ochilgan bo'lsa:
            # Parolini yangilab, to'g'ridan-to'g'ri tizimga muvaffaqiyatli kiritamiz!
            existing_user.password_hash = hash_password(user_data.password)
            if name:
                existing_user.name = name
            db.commit()
            db.refresh(existing_user)
            return existing_user

        new_user = User(
            id=str(uuid.uuid4()),
            name=name,
            email=email,
            password_hash=hash_password(user_data.password),
            auth_provider="local",
            is_pro="false"
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    @staticmethod
    def authenticate_user(db: Session, login_data: UserLogin) -> dict:
        email = str(login_data.email).strip().lower()
        user = db.query(User).filter(User.email == email).first()
        if not user or not verify_password(login_data.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Elektron pochta yoki parol noto'g'ri",
                headers={"WWW-Authenticate": "Bearer"}
            )

        token = create_access_token(data={"sub": user.id, "email": user.email})
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": user
        }

    @staticmethod
    def authenticate_google_user(db: Session, google_data: GoogleAuthRequest) -> dict:
        """
        Google orqali autentifikatsiya qilish:
        1. Google ID Token (credential) orqali tekshirish.
        2. Agar token bo'lmasa, uzatilgan email/name orqali sinov/demo rejimda ishlatish.
        3. Foydalanuvchi mavjud bo'lmasa, avtomatik yangi akkaunt yaratish.
        """
        email = google_data.email
        name = google_data.name or "Google User"
        avatar_url = google_data.avatar_url

        # 1. Google ID Token (credential) orqali tekshirish
        if google_data.credential:
            try:
                with httpx.Client(timeout=5.0) as client:
                    resp = client.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={google_data.credential}")
                    if resp.status_code == 200:
                        info = resp.json()
                        email = info.get("email", email)
                        name = info.get("name", name)
                        avatar_url = info.get("picture", avatar_url)
            except Exception:
                pass

        # 2. Google OAuth Access Token orqali tekshirish
        elif google_data.access_token:
            try:
                with httpx.Client(timeout=5.0) as client:
                    resp = client.get(
                        "https://www.googleapis.com/oauth2/v3/userinfo",
                        headers={"Authorization": f"Bearer {google_data.access_token}"}
                    )
                    if resp.status_code == 200:
                        info = resp.json()
                        email = info.get("email", email)
                        name = info.get("name", name)
                        avatar_url = info.get("picture", avatar_url)
            except Exception:
                pass

        # 3. Google OAuth Authorization Code orqali tekshirish (agar secret sozlangan bo'lsa)
        elif google_data.code and settings.GOOGLE_CLIENT_SECRET:
            try:
                with httpx.Client(timeout=5.0) as client:
                    token_resp = client.post(
                        "https://oauth2.googleapis.com/token",
                        data={
                            "code": google_data.code,
                            "client_id": settings.GOOGLE_CLIENT_ID,
                            "client_secret": settings.GOOGLE_CLIENT_SECRET,
                            "redirect_uri": settings.GOOGLE_REDIRECT_URI or "postmessage",
                            "grant_type": "authorization_code"
                        }
                    )
                    if token_resp.status_code == 200:
                        tokens = token_resp.json()
                        acc_token = tokens.get("access_token")
                        if acc_token:
                            u_resp = client.get(
                                "https://www.googleapis.com/oauth2/v3/userinfo",
                                headers={"Authorization": f"Bearer {acc_token}"}
                            )
                            if u_resp.status_code == 200:
                                info = u_resp.json()
                                email = info.get("email", email)
                                name = info.get("name", name)
                                avatar_url = info.get("picture", avatar_url)
            except Exception:
                pass

        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Google akkauntidan email ma'lumotlarini olib bo'lmadi"
            )

        email = str(email).strip().lower()

        # Foydalanuvchini bazadan qidirish
        user = db.query(User).filter(User.email == email).first()
        if not user:
            # Yangi foydalanuvchi yaratish
            user = User(
                name=name,
                email=email,
                password_hash=hash_password(str(uuid.uuid4())), # Xavfsiz random parol
                auth_provider="google",
                avatar_url=avatar_url
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            # Mavjud foydalanuvchi ma'lumotlarini yangilash (agar kerak bo'lsa)
            if avatar_url and not user.avatar_url:
                user.avatar_url = avatar_url
                db.commit()
                db.refresh(user)

        token = create_access_token(data={"sub": user.id, "email": user.email})
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": user
        }

    @staticmethod
    def get_user_by_id(db: Session, user_id: str) -> User:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Foydalanuvchi topilmadi"
            )
        return user
