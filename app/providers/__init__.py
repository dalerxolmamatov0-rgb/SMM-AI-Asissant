import os
from app.config import settings
from app.providers.base import BaseAIProvider
from app.providers.mock_provider import MockAIProvider
from app.providers.gemini_provider import GeminiProvider
from app.providers.openai_provider import OpenAIProvider

def get_ai_provider() -> BaseAIProvider:
    """
    AI Provayder fabrikasi (Factory method).
    Konfiguratsiya va API kalit mavjudligiga qarab mos AI provayderni qaytaradi.
    """
    provider_name = (settings.AI_PROVIDER or "mock").lower()
    api_key = settings.AI_API_KEY

    if provider_name == "gemini" and api_key:
        return GeminiProvider(api_key=api_key, model=settings.AI_MODEL or "gemini-1.5-flash")
    elif provider_name == "openai" and api_key:
        return OpenAIProvider(api_key=api_key, model=settings.AI_MODEL or "gpt-4o-mini")
    
    # Standart holatda yoki API key bo'lmaganda mukammal Mock provider
    return MockAIProvider()

__all__ = ["BaseAIProvider", "MockAIProvider", "GeminiProvider", "OpenAIProvider", "get_ai_provider"]
