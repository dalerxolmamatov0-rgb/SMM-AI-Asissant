from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.services.ai_service import AIService
from app.schemas.generation import (
    PostGenerateRequest, ReelsGenerateRequest, ContentPlanGenerateRequest,
    HashtagGenerateRequest, AdCopyGenerateRequest, ImagePromptGenerateRequest,
    AudienceAnalyzeRequest
)

router = APIRouter(prefix="/api/generate", tags=["AI Generation"])

@router.post("/post")
async def generate_post_endpoint(
    req: PostGenerateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    AI Post Generator: Sarlavha, matn, CTA, hashtaglar va emojilar.
    """
    return await AIService.generate_and_track(
        db=db,
        user_id=current_user.id,
        gen_type="post",
        input_data=req.model_dump()
    )

@router.post("/reels")
async def generate_reels_endpoint(
    req: ReelsGenerateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Reels Idea Generator: G'oya, Hook, Ssenariy, Kadrlar ketma-ketligi, Voice-over.
    """
    return await AIService.generate_and_track(
        db=db,
        user_id=current_user.id,
        gen_type="reels",
        input_data=req.model_dump()
    )

@router.post("/content-plan")
async def generate_content_plan_endpoint(
    req: ContentPlanGenerateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Content Plan Generator: 7, 14 yoki 30 kunlik kontent-reja va kalendar.
    """
    return await AIService.generate_and_track(
        db=db,
        user_id=current_user.id,
        gen_type="content_plan",
        input_data=req.model_dump()
    )

@router.post("/hashtags")
async def generate_hashtags_endpoint(
    req: HashtagGenerateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Hashtag Generator: High, Medium, Niche, Local va Branded hashtaglar.
    """
    return await AIService.generate_and_track(
        db=db,
        user_id=current_user.id,
        gen_type="hashtags",
        input_data=req.model_dump()
    )

@router.post("/ad-copy")
async def generate_ad_copy_endpoint(
    req: AdCopyGenerateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Ad Copy Generator: Short, Medium va Long versiyadagi reklama matnlari.
    """
    return await AIService.generate_and_track(
        db=db,
        user_id=current_user.id,
        gen_type="ad_copy",
        input_data=req.model_dump()
    )

@router.post("/image-prompt")
async def generate_image_prompt_endpoint(
    req: ImagePromptGenerateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    AI Image Prompt Generator: Post, Story, Reels cover, Product + Negative prompt.
    """
    return await AIService.generate_and_track(
        db=db,
        user_id=current_user.id,
        gen_type="image_prompt",
        input_data=req.model_dump()
    )

@router.post("/audience")
async def generate_audience_endpoint(
    req: AudienceAnalyzeRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Target Audience Analyzer: Ideal customer, yosh, qiziqishlar, og'riqlar, marketing angles.
    """
    return await AIService.generate_and_track(
        db=db,
        user_id=current_user.id,
        gen_type="audience",
        input_data=req.model_dump()
    )
