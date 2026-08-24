def test_google_auth_new_user(client):
    # Yangi Google foydalanuvchisi ro'yxatdan o'tishi
    payload = {
        "email": "googleuser@gmail.com",
        "name": "Google User Test",
        "avatar_url": "https://lh3.googleusercontent.com/a/test-avatar"
    }
    response = client.post("/api/auth/google", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["email"] == "googleuser@gmail.com"
    assert data["user"]["name"] == "Google User Test"
    assert data["user"]["auth_provider"] == "google"
    assert data["user"]["avatar_url"] == "https://lh3.googleusercontent.com/a/test-avatar"

def test_google_auth_existing_user_login(client):
    # Oldin mavjud bo'lgan foydalanuvchiga Google orqali kirish
    client.post("/api/auth/register", json={
        "name": "Existing User",
        "email": "existing@gmail.com",
        "password": "password123"
    })

    # Endi shu email bilan Google orqali kirish
    payload = {
        "email": "existing@gmail.com",
        "name": "Existing User Updated"
    }
    response = client.post("/api/auth/google", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["email"] == "existing@gmail.com"

def test_google_auth_missing_email_failure(client):
    # Email berilmaganda xatolik
    payload = {
        "name": "No Email User"
    }
    response = client.post("/api/auth/google", json=payload)
    assert response.status_code == 400
    assert "Google akkauntidan email ma'lumotlarini olib bo'lmadi" in response.json()["detail"]
