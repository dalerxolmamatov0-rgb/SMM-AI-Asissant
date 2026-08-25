from sqlalchemy import create_engine, text, inspect
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings

connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False, "timeout": 30}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    echo=False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

_tables_initialized = False

def init_db():
    """
    Ma'lumotlar bazasi jadvallarini yaratish va yangi ustunlarni tekshirib qo'shish.
    """
    global _tables_initialized
    try:
        Base.metadata.create_all(bind=engine)
        inspector = inspect(engine)
        table_names = inspector.get_table_names()
        if "users" in table_names:
            columns = [c["name"] for c in inspector.get_columns("users")]
            with engine.begin() as conn:
                if "auth_provider" not in columns:
                    conn.execute(text("ALTER TABLE users ADD COLUMN auth_provider VARCHAR(50) DEFAULT 'local'"))
                if "avatar_url" not in columns:
                    conn.execute(text("ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500)"))
                if "is_pro" not in columns:
                    conn.execute(text("ALTER TABLE users ADD COLUMN is_pro VARCHAR(20) DEFAULT 'false'"))
                if "pro_plan" not in columns:
                    conn.execute(text("ALTER TABLE users ADD COLUMN pro_plan VARCHAR(100)"))
                if "telegram_username" not in columns:
                    conn.execute(text("ALTER TABLE users ADD COLUMN telegram_username VARCHAR(100)"))
                if "pro_activated_at" not in columns:
                    conn.execute(text("ALTER TABLE users ADD COLUMN pro_activated_at DATETIME"))
                if "pro_expires_at" not in columns:
                    conn.execute(text("ALTER TABLE users ADD COLUMN pro_expires_at DATETIME"))
        if "feedbacks" in table_names:
            f_columns = [c["name"] for c in inspector.get_columns("feedbacks")]
            with engine.begin() as conn:
                if "telegram_username" not in f_columns:
                    conn.execute(text("ALTER TABLE feedbacks ADD COLUMN telegram_username VARCHAR(100)"))
        _tables_initialized = True
    except Exception as e:
        print("Database migration notice:", e)

def get_db():
    """
    FastAPI dependency injection uchun ma'lumotlar bazasi sessiyasi.
    """
    global _tables_initialized
    if not _tables_initialized:
        init_db()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
