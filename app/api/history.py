from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.database.session import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.generation import Generation
from app.schemas.generation import GenerationOut

router = APIRouter(prefix="/api/history", tags=["Generation History"])

@router.get("", response_model=List[GenerationOut])
def get_history(
    skip: int = Query(0, ge=0, description="O'tkazib yuborish soni"),
    limit: int = Query(20, ge=1, le=100, description="Maksimal natijalar soni"),
    type: Optional[str] = Query(None, description="Generatsiya turi bo'yicha filter (post, reels, ...)"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Foydalanuvchining generatsiya tarixini paginatsiya bilan olish.
    """
    query = db.query(Generation).filter(Generation.user_id == current_user.id)
    if type:
        query = query.filter(Generation.type == type)

    history_items = query.order_by(desc(Generation.created_at)).offset(skip).limit(limit).all()
    return history_items

@router.get("/{gen_id}", response_model=GenerationOut)
def get_single_generation(
    gen_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Bitta aniq generatsiya ma'lumotini olish.
    """
    item = db.query(Generation).filter(
        Generation.id == gen_id,
        Generation.user_id == current_user.id
    ).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Generatsiya topilmadi")
    return item

@router.delete("/{gen_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_generation(
    gen_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Generatsiyani tarixdan o'chirish.
    """
    item = db.query(Generation).filter(
        Generation.id == gen_id,
        Generation.user_id == current_user.id
    ).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Generatsiya topilmadi")

    db.delete(item)
    db.commit()
    return None
