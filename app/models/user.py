import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from app.database.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    auth_provider = Column(String(50), default="local", nullable=False) # 'local' or 'google'
    avatar_url = Column(String(500), nullable=True)
    is_pro = Column(String(20), default="false", nullable=False) # "true" or "false" or Boolean
    pro_plan = Column(String(100), nullable=True) # e.g. "Standart Pro", "VIP Biznes Pro", "Boshlang'ich Pro"
    telegram_username = Column(String(100), nullable=True)
    pro_activated_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationships
    generations = relationship("Generation", back_populates="user", cascade="all, delete-orphan")
    usages = relationship("Usage", back_populates="user", cascade="all, delete-orphan")
    business_profiles = relationship("BusinessProfile", back_populates="user", cascade="all, delete-orphan")
    chat_messages = relationship("ChatMessage", back_populates="user", cascade="all, delete-orphan")
    feedbacks = relationship("Feedback", back_populates="user", cascade="all, delete-orphan")
