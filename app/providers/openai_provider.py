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

class OpenAIProvider(BaseAIProvider):
    """
    OpenAI (GPT-4o / GPT-4o-mini) AI Provayderi.
    """

    def __init__(self, api_key: str, model: str = "gpt-4o-mini"):
        self.api_key = api_key
        self.model = model
        self.mock_fallback = MockAIProvider()

    async def _call_openai_json(self, prompt: str) -> Dict[str, Any]:
        if not self.api_key:
            raise ValueError("OpenAI API kaliti topilmadi")

        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": SMM_SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            "response_format": {"type": "json_object"},
            "temperature": 0.7
        }

        async with httpx.AsyncClient(timeout=35.0) as client:
            response = await client.post(url, headers=headers, json=payload)
            if response.status_code != 200:
                raise Exception(f"OpenAI API Error ({response.status_code}): {response.text}")
            
            data = response.json()
            raw_text = data["choices"][0]["message"]["content"]
            return json.loads(raw_text)

    async def generate_post(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = get_post_prompt(data)
            return await self._call_openai_json(prompt)
        except Exception as e:
            print(f"[OpenAI Error, fallback to mock]: {e}")
            return await self.mock_fallback.generate_post(data)

    async def generate_reels(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = get_reels_prompt(data)
            return await self._call_openai_json(prompt)
        except Exception as e:
            print(f"[OpenAI Error, fallback to mock]: {e}")
            return await self.mock_fallback.generate_reels(data)

    async def generate_content_plan(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = get_content_plan_prompt(data)
            return await self._call_openai_json(prompt)
        except Exception as e:
            print(f"[OpenAI Error, fallback to mock]: {e}")
            return await self.mock_fallback.generate_content_plan(data)

    async def generate_hashtags(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = get_hashtag_prompt(data)
            return await self._call_openai_json(prompt)
        except Exception as e:
            print(f"[OpenAI Error, fallback to mock]: {e}")
            return await self.mock_fallback.generate_hashtags(data)

    async def generate_ad_copy(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = get_ad_copy_prompt(data)
            return await self._call_openai_json(prompt)
        except Exception as e:
            print(f"[OpenAI Error, fallback to mock]: {e}")
            return await self.mock_fallback.generate_ad_copy(data)

    async def generate_image_prompt(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = get_image_prompt(data)
            return await self._call_openai_json(prompt)
        except Exception as e:
            print(f"[OpenAI Error, fallback to mock]: {e}")
            return await self.mock_fallback.generate_image_prompt(data)

    async def generate_audience_analysis(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = get_audience_prompt(data)
            return await self._call_openai_json(prompt)
        except Exception as e:
            print(f"[OpenAI Error, fallback to mock]: {e}")
            return await self.mock_fallback.generate_audience_analysis(data)

    async def generate_chat_response(self, messages: List[Dict[str, str]], context: Optional[str] = None) -> str:
        try:
            if not self.api_key:
                return await self.mock_fallback.generate_chat_response(messages, context)

            url = "https://api.openai.com/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            chat_msgs = [
                {"role": "system", "content": CHAT_MARKETING_SYSTEM_PROMPT + (f"\nKontekst: {context}" if context else "")}
            ]
            for m in messages:
                chat_msgs.append({"role": m["role"], "content": m["content"]})

            payload = {
                "model": self.model,
                "messages": chat_msgs,
                "temperature": 0.7
            }

            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(url, headers=headers, json=payload)
                if response.status_code == 200:
                    data = response.json()
                    return data["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"[OpenAI Chat Error, fallback to mock]: {e}")
        
        return await self.mock_fallback.generate_chat_response(messages, context)
