from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional

class BaseAIProvider(ABC):
    """
    Barcha AI provayderlar uchun abstrakt asosiy sinf (Base AI Provider Interface).
    """

    @abstractmethod
    async def generate_post(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Post generatsiya qilish"""
        pass

    @abstractmethod
    async def generate_reels(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Reels g'oyasi va ssenariysi generatsiya qilish"""
        pass

    @abstractmethod
    async def generate_content_plan(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """7, 14 yoki 30 kunlik kontent-reja generatsiya qilish"""
        pass

    @abstractmethod
    async def generate_hashtags(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Hashtaglar generatsiya qilish"""
        pass

    @abstractmethod
    async def generate_ad_copy(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Reklama matnlari generatsiya qilish"""
        pass

    @abstractmethod
    async def generate_image_prompt(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """AI Image Prompts generatsiya qilish"""
        pass

    @abstractmethod
    async def generate_audience_analysis(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Maqsadli auditoriya tahlili generatsiya qilish"""
        pass

    @abstractmethod
    async def generate_chat_response(self, messages: List[Dict[str, str]], context: Optional[str] = None) -> str:
        """AI Marketing Chat javobi generatsiya qilish"""
        pass
