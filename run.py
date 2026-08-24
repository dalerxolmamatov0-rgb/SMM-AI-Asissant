import uvicorn
import webbrowser
import threading
import time
from app.config import settings

def open_browser():
    time.sleep(1.2)
    url = f"http://127.0.0.1:{settings.PORT}"
    print(f"\n🚀 Brauzerda ochilmoqda: {url}")
    webbrowser.open(url)

if __name__ == "__main__":
    print("=" * 65)
    print("🤖 AI SMM Assistant - Professional Marketing Platform")
    print(f"📍 Manzil: http://127.0.0.1:{settings.PORT}")
    print("📍 Hujjatlar (Swagger): http://127.0.0.1:8000/docs")
    print("=" * 65)

    threading.Thread(target=open_browser, daemon=True).start()
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
