"""
AI SMM Assistant - Serverni ishga tushirish skripti.
"""

import sys
import os
import webbrowser
import threading
import time

def open_browser():
    time.sleep(1.2)
    url = "http://localhost:8000"
    print(f"\n🚀 Brauzer ochilmoqda: {url}")
    webbrowser.open(url)

if __name__ == "__main__":
    import uvicorn
    
    # Brauzerni avtomatik ochish
    threading.Thread(target=open_browser, daemon=True).start()

    print("=" * 60)
    print("🤖 AI SMM Assistant Server Ishga Tushmoqda...")
    print("📍 URL: http://localhost:8000")
    print("=" * 60)

    uvicorn.run("backend.app:app", host="127.0.0.1", port=8000, reload=True)
