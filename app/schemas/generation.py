from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime

# ----------------- 1. AI POST GENERATOR -----------------
class PostGenerateRequest(BaseModel):
    business_name: Optional[str] = Field("", description="Biznes nomi")
    business_type: str = Field(..., description="Biznes turi (Masalan: Restoran, Kiyim do'koni)")
    product_service: str = Field(..., description="Mahsulot yoki xizmat")
    platform: str = Field("Instagram", description="Platforma (Instagram, Telegram, Facebook, TikTok)")
    goal: str = Field("Sotuvni oshirish", description="Post maqsadi")
    audience: Optional[str] = Field("18-35 yoshli faol auditoriya", description="Maqsadli auditoriya")
    tone: Optional[str] = Field("Do'stona va jozibador", description="Tone of voice")
    topic: str = Field(..., description="Post mavzusi")

class PostGenerateResponse(BaseModel):
    title: str
    content: str
    cta: str
    hashtags: List[str]
    emoji_recommendations: List[str]
    best_time: Optional[str] = "18:00 - 20:00"

# ----------------- 2. REELS IDEA GENERATOR -----------------
class ReelsGenerateRequest(BaseModel):
    business_type: str
    product_service: str
    goal: str = "Viral reach va obunachi jalb qilish"
    platform: str = "Instagram Reels"
    topic: Optional[str] = ""

class SceneItem(BaseModel):
    time: str
    visual_action: str
    text_on_screen: str
    voice_over: str

class ReelsGenerateResponse(BaseModel):
    idea_title: str
    hook: str
    video_script: str
    timeline_scenes: List[SceneItem]
    voice_over: str
    cta: str
    caption: str
    hashtags: List[str]
    audio_suggestion: str

# ----------------- 3. CONTENT PLAN GENERATOR -----------------
class ContentPlanGenerateRequest(BaseModel):
    business_type: str
    platform: str = "Instagram"
    goal: str = "Sotuv va ishonchni mustahkamlash"
    duration_days: int = Field(7, description="Davomiylik (7, 14 yoki 30 kun)")
    business_name: Optional[str] = ""
    audience: Optional[str] = ""
    tone: Optional[str] = ""

class DayContentItem(BaseModel):
    day_number: int
    date_label: str
    content_type: str
    topic: str
    hook: str
    caption: str
    cta: str
    format_type: str
    hashtags: List[str]
    recommended_time: str

class ContentPlanGenerateResponse(BaseModel):
    business_type: str
    duration_days: int
    strategy_summary: str
    days: List[DayContentItem]

# ----------------- 4. HASHTAG GENERATOR -----------------
class HashtagGenerateRequest(BaseModel):
    business_type: str
    product_service: str
    city: Optional[str] = "Toshkent"
    platform: str = "Instagram"

class HashtagCategoryGroup(BaseModel):
    high_competition: List[str]
    medium_competition: List[str]
    niche: List[str]
    local: List[str]
    branded: List[str]

class HashtagGenerateResponse(BaseModel):
    summary: str
    categories: HashtagCategoryGroup
    all_hashtags: List[str]

# ----------------- 5. AD COPY GENERATOR -----------------
class AdCopyGenerateRequest(BaseModel):
    business_type: str
    product_service: str
    target_audience: str
    offer: str
    platform: str = "Instagram / Facebook Ads"

class AdVersion(BaseModel):
    hook: str
    body: str
    cta: str

class AdCopyGenerateResponse(BaseModel):
    short_version: AdVersion
    medium_version: AdVersion
    long_version: AdVersion
    target_recommendations: str

# ----------------- 6. AI IMAGE PROMPT GENERATOR -----------------
class ImagePromptGenerateRequest(BaseModel):
    product_or_post_description: str
    style_preference: Optional[str] = "Photorealistic, Studio Lighting, 8k"
    brand_colors: Optional[str] = ""

class PromptTypes(BaseModel):
    instagram_post: str
    instagram_story: str
    reels_cover: str
    product_photo: str
    advertisement: str
    lifestyle_photo: str

class ImagePromptGenerateResponse(BaseModel):
    prompts: PromptTypes
    negative_prompt: str
    lighting_and_camera_tips: str

# ----------------- 7. TARGET AUDIENCE ANALYZER -----------------
class AudienceAnalyzeRequest(BaseModel):
    business_name: Optional[str] = ""
    business_type: str
    product_service: str
    price_segment: Optional[str] = "O'rtacha / Premium"
    location: Optional[str] = "O'zbekiston"

class AudienceAnalyzeResponse(BaseModel):
    ideal_customer: str
    age_segment: str
    interests: List[str]
    pain_points: List[str]
    core_needs: List[str]
    buying_triggers: List[str]
    content_reaction: str
    marketing_angles: List[str]

# ----------------- GENERATION HISTORY OUT -----------------
class GenerationOut(BaseModel):
    id: str
    type: str
    input_data: Dict[str, Any]
    output_data: Dict[str, Any]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
