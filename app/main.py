from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.exceptions import RequestValidationError

from app.config import settings
from app.database.session import init_db
import app.models # Barcha modellarni ro'yxatdan o'tkazish
from app.api.auth import router as auth_router
from app.api.generation import router as generation_router
from app.api.business import router as business_router
from app.api.history import router as history_router
from app.api.chat import router as chat_router
from app.api.feedback import router as feedback_router
from app.api.telegram import router as telegram_router
from app.middleware.error_handler import validation_exception_handler, generic_exception_handler

# Ma'lumotlar bazasi jadvallarini avtomatik yaratish va yangilash
init_db()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Kichik biznes, SMM mutaxassislari va freelancerlar uchun zamonaviy AI SMM yordamchisi",
    docs_url="/docs",
    redoc_url="/redoc"
)

@app.on_event("startup")
async def startup_event():
    import os
    # Vercel serverless muhitida cheksiz polling vazifasini ishga tushirmaymiz (timeout bo'lmasligi uchun)
    if not os.getenv("VERCEL"):
        import asyncio
        from app.services.telegram_bot_poller import start_telegram_poller
        asyncio.create_task(start_telegram_poller())

# CORS sozlamalari
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handlers
app.add_exception_handler(RequestValidationError, validation_exception_handler)

# API Routerni ulash
app.include_router(auth_router)
app.include_router(generation_router)
app.include_router(business_router)
app.include_router(history_router)
app.include_router(chat_router)
app.include_router(feedback_router)
app.include_router(telegram_router)

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "provider": settings.AI_PROVIDER
    }

# Statik Frontend fayllarni ulash
frontend_dir = settings.FRONTEND_DIR
if frontend_dir.exists():
    app.mount("/static", StaticFiles(directory=str(frontend_dir)), name="static")

    @app.get("/")
    async def serve_index():
        index_file = frontend_dir / "index.html"
        if index_file.exists():
            return FileResponse(str(index_file))
        return JSONResponse({"message": "Frontend fayli topilmadi"})
