import json
import httpx
from typing import Dict, Any, List, Optional
from app.providers.base import BaseAIProvider
from app.providers.mock_provider import MockAIProvider
from app.prompts.system_prompts import SMM_SYSTEM_PROMPT, CHAT_MARKETING_SYSTEM_PROMPT
from app.prompts.templates import (
    get_post_prompt, get_reels_prompt, get_content_plan_prompt,
    get_hashtag_prompt, get_ad_copy_prompt, get_image_prompt, get_audience_prompt
)

class GeminiProvider(BaseAIProvider):
    """
    Google Gemini 1.5 / 2.0 Flash AI Provayderi.
    """

    def __init__(self, api_key: str, model: str = "gemini-1.5-flash"):
        self.api_key = api_key
        self.model = model
        self.mock_fallback = MockAIProvider()

    async def _call_gemini_json(self, prompt: str) -> Dict[str, Any]:
        if not self.api_key:
            raise ValueError("Gemini API kaliti topilmadi")

        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"
        
        payload = {
            "system_instruction": {
                "parts": [{"text": SMM_SYSTEM_PROMPT}]
            },
            "contents": [
                {
                    "parts": [{"text": prompt}]
                }
            ],
            "generationConfig": {
                "response_mime_type": "application/json",
                "temperature": 0.7
            }
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(url, json=payload)
            if response.status_code != 200:
                raise Exception(f"Gemini API Error ({response.status_code}): {response.text}")
            
            data = response.json()
            raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
            return json.loads(raw_text)

    async def generate_post(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = get_post_prompt(data)
            return await self._call_gemini_json(prompt)
        except Exception as e:
            print(f"[Gemini Error, fallback to mock]: {e}")
            return await self.mock_fallback.generate_post(data)

    async def generate_reels(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = get_reels_prompt(data)
            return await self._call_gemini_json(prompt)
        except Exception as e:
            print(f"[Gemini Error, fallback to mock]: {e}")
            return await self.mock_fallback.generate_reels(data)

    async def generate_content_plan(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = get_content_plan_prompt(data)
            return await self._call_gemini_json(prompt)
        except Exception as e:
            print(f"[Gemini Error, fallback to mock]: {e}")
            return await self.mock_fallback.generate_content_plan(data)

    async def generate_hashtags(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = get_hashtag_prompt(data)
            return await self._call_gemini_json(prompt)
        except Exception as e:
            print(f"[Gemini Error, fallback to mock]: {e}")
            return await self.mock_fallback.generate_hashtags(data)

    async def generate_ad_copy(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = get_ad_copy_prompt(data)
            return await self._call_gemini_json(prompt)
        except Exception as e:
            print(f"[Gemini Error, fallback to mock]: {e}")
            return await self.mock_fallback.generate_ad_copy(data)

    async def generate_image_prompt(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = get_image_prompt(data)
            return await self._call_gemini_json(prompt)
        except Exception as e:
            print(f"[Gemini Error, fallback to mock]: {e}")
            return await self.mock_fallback.generate_image_prompt(data)

    async def generate_audience_analysis(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = get_audience_prompt(data)
            return await self._call_gemini_json(prompt)
        except Exception as e:
            print(f"[Gemini Error, fallback to mock]: {e}")
            return await self.mock_fallback.generate_audience_analysis(data)

    async def generate_chat_response(self, messages: List[Dict[str, str]], context: Optional[str] = None) -> str:
        try:
            if not self.api_key:
                return await self.mock_fallback.generate_chat_response(messages, context)

            url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"
            
            gemini_contents = []
            for m in messages:
                role = "user" if m["role"] == "user" else "model"
                gemini_contents.append({"role": role, "parts": [{"text": m["content"]}]})

            payload = {
                "system_instruction": {
                    "parts": [{"text": CHAT_MARKETING_SYSTEM_PROMPT + (f"\nKontekst: {context}" if context else "")}]
                },
                "contents": gemini_contents,
                "generationConfig": {"temperature": 0.7}
            }

            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(url, json=payload)
                if response.status_code == 200:
                    data = response.json()
                    return data["candidates"][0]["content"]["parts"][0]["text"]
        except Exception as e:
            print(f"[Gemini Chat Error, fallback to mock]: {e}")
        
        return await self.mock_fallback.generate_chat_response(messages, context)
