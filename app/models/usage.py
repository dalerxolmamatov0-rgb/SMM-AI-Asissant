import uuid
from sqlalchemy import Column, String, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.database.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class Usage(Base):
    __tablename__ = "usages"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    month = Column(String(7), nullable=False, index=True) # Format: 'YYYY-MM'
    generation_count = Column(Integer, default=0, nullable=False)

    __table_args__ = (
        UniqueConstraint('user_id', 'month', name='uq_user_month_usage'),
    )

    # Relationships
    user = relationship("User", back_populates="usages")
