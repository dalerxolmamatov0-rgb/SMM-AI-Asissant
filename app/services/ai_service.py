from typing import Dict, Any
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.providers import get_ai_provider
from app.services.usage_service import UsageService
from app.models.generation import Generation

class AIService:
    @classmethod
    async def generate_and_track(
        cls,
        db: Session,
        user_id: str,
        gen_type: str,
        input_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        1. Limitni tekshiradi va oshiradi.
        2. AI provayderdan generatsiya so'raydi.
        3. Natijani ma'lumotlar bazasiga (Generation) saqlaydi.
        4. Natija va qolgan limit hisobini qaytaradi.
        """
        # 1. Limit nazorati (Backend level)
        usage_info = UsageService.check_and_increment_usage(db, user_id)

        # 2. AI provayderni chaqirish
        provider = get_ai_provider()
        try:
            if gen_type == "post":
                output_data = await provider.generate_post(input_data)
            elif gen_type == "reels":
                output_data = await provider.generate_reels(input_data)
            elif gen_type == "content_plan":
                output_data = await provider.generate_content_plan(input_data)
            elif gen_type == "hashtags":
                output_data = await provider.generate_hashtags(input_data)
            elif gen_type == "ad_copy":
                output_data = await provider.generate_ad_copy(input_data)
            elif gen_type == "image_prompt":
                output_data = await provider.generate_image_prompt(input_data)
            elif gen_type == "audience":
                output_data = await provider.generate_audience_analysis(input_data)
            else:
                raise ValueError(f"Noma'lum generatsiya turi: {gen_type}")
        except Exception as e:
            # Agar AI xizmatida xatolik bo'lsa, xatolik beramiz
            print(f"[AI Service Error]: {e}")
            raise HTTPException(
                status_code=500,
                detail="AI xizmatida vaqtinchalik muammo yuz berdi. Iltimos, birozdan keyin qayta urinib ko'ring."
            )

        # 3. Bazaga tarixga saqlash
        generation_entry = Generation(
            user_id=user_id,
            type=gen_type,
            input_data=input_data,
            output_data=output_data
        )
        db.add(generation_entry)
        db.commit()
        db.refresh(generation_entry)

        return {
            "id": generation_entry.id,
            "type": gen_type,
            "output": output_data,
            "usage": usage_info,
            "created_at": generation_entry.created_at
        }
