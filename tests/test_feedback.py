def test_submit_feedback_guest(client):
    # Mehmon tomonidan taklif yuborilishi (telegram_username kiritilishi shart)
    payload = {
        "name": "Mehmon Foydalanuvchi",
        "email": "mehmon@example.com",
        "telegram_username": "@mehmon_user",
        "type": "suggestion",
        "subject": "Telegram bot integratsiyasi",
        "message": "Platformaga Telegram bot orqali post generatsiya qilish funksiyasini qo'shsangiz yaxshi bo'lardi."
    }
    response = client.post("/api/feedback", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Mehmon Foydalanuvchi"
    assert data["telegram_username"] == "@mehmon_user"
    assert data["type"] == "suggestion"
    assert data["subject"] == "Telegram bot integratsiyasi"
    assert data["status"] == "new"
    assert data["user_id"] is None

def test_submit_feedback_authenticated_user(client, auth_headers):
    # Tizimga kirgan foydalanuvchi tomonidan shikoyat yuborilishi
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "telegram_username": "@testuser_official",
        "type": "complaint",
        "subject": "Generatsiya sekin ishlayapti",
        "message": "Reels g'oyalari generatsiyasida biroz sekinlik kuzatildi."
    }
    response = client.post("/api/feedback", json=payload, headers=auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["type"] == "complaint"
    assert data["telegram_username"] == "@testuser_official"
    assert data["user_id"] is not None

    # O'z murojaatlarini olish (/api/feedback/my)
    my_feedbacks = client.get("/api/feedback/my", headers=auth_headers)
    assert my_feedbacks.status_code == 200
    items = my_feedbacks.json()
    assert len(items) == 1
    assert items[0]["subject"] == "Generatsiya sekin ishlayapti"

def test_submit_feedback_validation_error(client):
    # Maydonlar qisqa yoki noto'g'ri bo'lganda validatsiya xatosi (yoki telegram username bo'lmaganda)
    payload = {
        "name": "A",
        "email": "invalid-email",
        "type": "suggestion",
        "subject": "X",
        "message": "qisqa"
    }
    response = client.post("/api/feedback", json=payload)
    assert response.status_code == 422
