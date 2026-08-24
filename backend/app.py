"""
FastAPI Server for AI SMM Assistant.
API endpoints and static frontend serving.
"""

import os
from pathlib import Path
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, Field

from backend.ai_service import AISMMService

app = FastAPI(
    title="AI SMM Assistant API",
    description="Instagram 7-kunlik kontent-reja va kreativ marketing g'oyalari generatsiyasi",
    version="1.0.0"
)

# CORS sozlamalari
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ai_service = AISMMService()

# ----------------- PYDANTIC REQUEST MODELLARI -----------------

class PlanGenerateRequest(BaseModel):
    niche: str = Field(..., example="Restoran va Kafexona")
    target_audience: str = Field("20-35 yoshli faol yoshlar va oilalar", example="20-35 yoshli yoshlar")
    tone: str = Field("Do'stona va samimiy", example="Ekspert va professional")
    goal: str = Field("Obunachi va sotuvlarni oshirish", example="To'g'ridan-to'g'ri sotuv")
    language: str = Field("uz", example="uz")
    brand_name: Optional[str] = Field("", example="Chustiyosh")
    api_key: Optional[str] = None
    model_provider: Optional[str] = "auto"

class RegenerateDayRequest(BaseModel):
    day_number: int = Field(..., ge=1, le=7)
    niche: str
    target_audience: str
    tone: str
    goal: str
    language: str = "uz"
    brand_name: Optional[str] = ""
    content_type: Optional[str] = None
    api_key: Optional[str] = None

class CreativeReelsRequest(BaseModel):
    topic: str
    niche: str
    tone: Optional[str] = "Trendbop / Dinamik"
    language: Optional[str] = "uz"

class StoriesFunnelRequest(BaseModel):
    product_or_service: str
    niche: str
    goal: Optional[str] = "Sotuv"
    language: Optional[str] = "uz"

class HooksRequest(BaseModel):
    topic: str
    niche: str
    count: Optional[int] = 10
    language: Optional[str] = "uz"

class CaptionOptimizeRequest(BaseModel):
    draft_text: str
    tone: Optional[str] = "Sotuvchan va Jozibador"
    add_emojis: Optional[bool] = True

# ----------------- API ENDPOINTS -----------------

@app.post("/api/generate-plan")
async def generate_plan(req: PlanGenerateRequest):
    """
    7 kunlik to'liq Instagram kontent-rejasini generatsiya qilish.
    """
    try:
        plan = await ai_service.generate_7day_plan(
            niche=req.niche,
            target_audience=req.target_audience,
            tone=req.tone,
            goal=req.goal,
            language=req.language,
            brand_name=req.brand_name or "",
            api_key=req.api_key,
            model_provider=req.model_provider or "auto"
        )
        return JSONResponse(content={"success": True, "data": plan})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/regenerate-day")
async def regenerate_day(req: RegenerateDayRequest):
    """
    Alohida bir kunlik postni qayta generatsiya qilish.
    """
    try:
        new_day_data = await ai_service.regenerate_single_day(
            day_number=req.day_number,
            niche=req.niche,
            target_audience=req.target_audience,
            tone=req.tone,
            goal=req.goal,
            language=req.language,
            brand_name=req.brand_name or "",
            content_type=req.content_type,
            api_key=req.api_key
        )
        return JSONResponse(content={"success": True, "data": new_day_data})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/creative/reels")
async def creative_reels(req: CreativeReelsRequest):
    """
    Virusli Reels ssenariylari generatsiyasi.
    """
    try:
        reels = await ai_service.generate_creative_reels(
            topic=req.topic,
            niche=req.niche,
            tone=req.tone or "Trendbop",
            language=req.language or "uz"
        )
        return JSONResponse(content={"success": True, "data": reels})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/creative/stories")
async def creative_stories(req: StoriesFunnelRequest):
    """
    5 bosqichli Stories sotuv voronkasi generatsiyasi.
    """
    try:
        stories = await ai_service.generate_stories_funnel(
            product_or_service=req.product_or_service,
            niche=req.niche,
            goal=req.goal or "Sotuv",
            language=req.language or "uz"
        )
        return JSONResponse(content={"success": True, "data": stories})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/creative/hooks")
async def creative_hooks(req: HooksRequest):
    """
    10 xil viral Hook (ilmoq) sarlavhalar.
    """
    try:
        hooks = await ai_service.generate_viral_hooks(
            topic=req.topic,
            niche=req.niche,
            count=req.count or 10,
            language=req.language or "uz"
        )
        return JSONResponse(content={"success": True, "data": hooks})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/creative/optimize-caption")
async def optimize_caption_endpoint(req: CaptionOptimizeRequest):
    """
    Foydalanuvchi matnini AIDA formulasi bilan mukammallashtirish.
    """
    try:
        result = await ai_service.optimize_caption(
            draft_text=req.draft_text,
            tone=req.tone or "Sotuvchan",
            add_emojis=req.add_emojis if req.add_emojis is not None else True
        )
        return JSONResponse(content={"success": True, "data": result})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "app": "AI SMM Assistant"}

# ----------------- STATIC FRONTEND SERVING -----------------

BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"

if FRONTEND_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(FRONTEND_DIR)), name="static")

    @app.get("/")
    async def serve_index():
        index_file = FRONTEND_DIR / "index.html"
        if index_file.exists():
            return FileResponse(str(index_file))
        return {"message": "Frontend index.html topilmadi"}
