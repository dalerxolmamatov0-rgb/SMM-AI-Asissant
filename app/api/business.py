from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.business import BusinessProfile
from app.schemas.business import BusinessProfileCreate, BusinessProfileUpdate, BusinessProfileOut

router = APIRouter(prefix="/api/business", tags=["Business Profile"])

@router.get("/profile", response_model=BusinessProfileOut)
def get_business_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Foydalanuvchining saqlangan biznes profilini olish.
    """
    profile = db.query(BusinessProfile).filter(BusinessProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Biznes profil hali yaratilmagan"
        )
    return profile

@router.post("/profile", response_model=BusinessProfileOut)
def create_or_update_business_profile(
    profile_data: BusinessProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Biznes profil yaratish yoki mavjudini yangilash.
    """
    profile = db.query(BusinessProfile).filter(BusinessProfile.user_id == current_user.id).first()
    
    if profile:
        profile.business_name = profile_data.business_name
        profile.business_type = profile_data.business_type
        profile.description = profile_data.description
        profile.target_audience = profile_data.target_audience
        profile.tone = profile_data.tone
        profile.platform = profile_data.platform
    else:
        profile = BusinessProfile(
            user_id=current_user.id,
            business_name=profile_data.business_name,
            business_type=profile_data.business_type,
            description=profile_data.description,
            target_audience=profile_data.target_audience,
            tone=profile_data.tone,
            platform=profile_data.platform
        )
        db.add(profile)

    db.commit()
    db.refresh(profile)
    return profile
