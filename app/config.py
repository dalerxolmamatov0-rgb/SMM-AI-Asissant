import os
from pathlib import Path
from dotenv import load_dotenv

# .env faylini yuklash
BASE_DIR = Path(__file__).resolve().parent.parent
env_path = BASE_DIR / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

class Settings:
    PROJECT_NAME: str = "AI SMM Assistant"
    VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    
    # Server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))

    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "smm_ai_super_secret_jwt_key_default_development_change_in_prod")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440")) # 24 soat

    # Database
    default_db = f"sqlite:////tmp/smm_assistant.db" if os.getenv("VERCEL") else f"sqlite:///{BASE_DIR}/smm_assistant.db"
    DATABASE_URL: str = os.getenv("DATABASE_URL", default_db)

    # AI Provider ('mock', 'gemini', 'openai')
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "mock")
    AI_API_KEY: str = os.getenv("AI_API_KEY", "")
    AI_MODEL: str = os.getenv("AI_MODEL", "gemini-1.5-flash")

    # Usage Limits
    FREE_MONTHLY_LIMIT: int = int(os.getenv("FREE_MONTHLY_LIMIT", "10"))

    # Google OAuth
    GOOGLE_CLIENT_ID: str = os.getenv(
        "GOOGLE_CLIENT_ID",
        "1084877712345-gsiwebclientappforaismm.apps.googleusercontent.com"
    )
    GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    GOOGLE_REDIRECT_URI: str = os.getenv("GOOGLE_REDIRECT_URI", "")

    # Telegram Feedback Bot
    TELEGRAM_BOT_TOKEN: str = os.getenv("TELEGRAM_BOT_TOKEN", "8646563898:AAFAWpPT6VQbvrRowFKovf0AGWw-UMV951U")
    TELEGRAM_BOT_USERNAME: str = os.getenv("TELEGRAM_BOT_USERNAME", "taklif_va_shikoyat_qabul_bot")
    TELEGRAM_CHAT_ID: str = os.getenv("TELEGRAM_CHAT_ID", "5894569294")

    # Static/Frontend directory
    FRONTEND_DIR: Path = BASE_DIR / "frontend"

settings = Settings()
