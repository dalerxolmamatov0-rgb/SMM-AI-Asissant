def test_register_and_login_success(client):
    # 1. Register
    reg_response = client.post("/api/auth/register", json={
        "name": "Alisher Navoiy",
        "email": "alisher@example.com",
        "password": "strongpassword123",
        "confirm_password": "strongpassword123"
    })
    assert reg_response.status_code == 201
    reg_data = reg_response.json()
    assert "access_token" in reg_data
    assert reg_data["user"]["email"] == "alisher@example.com"

    # 2. Login
    login_response = client.post("/api/auth/login", json={
        "email": "alisher@example.com",
        "password": "strongpassword123"
    })
    assert login_response.status_code == 200
    login_data = login_response.json()
    assert "access_token" in login_data
    assert login_data["user"]["name"] == "Alisher Navoiy"

def test_register_password_validation(client):
    # Short password (< 8 chars)
    short_res = client.post("/api/auth/register", json={
        "name": "User Short",
        "email": "short@example.com",
        "password": "123"
    })
    assert short_res.status_code == 422

    # Password mismatch
    mismatch_res = client.post("/api/auth/register", json={
        "name": "User Mismatch",
        "email": "mismatch@example.com",
        "password": "password123",
        "confirm_password": "password456"
    })
    assert mismatch_res.status_code == 422

def test_register_duplicate_email(client):
    client.post("/api/auth/register", json={
        "name": "User One",
        "email": "duplicate@example.com",
        "password": "password123"
    })
    
    dup_res = client.post("/api/auth/register", json={
        "name": "User Two",
        "email": "duplicate@example.com",
        "password": "password123"
    })
    assert dup_res.status_code == 400
    assert "allaqachon ro'yxatdan o'tgan" in dup_res.json()["detail"]

def test_login_invalid_credentials(client):
    response = client.post("/api/auth/login", json={
        "email": "nonexistent@example.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 401

def test_get_current_user_me(client, auth_headers):
    response = client.get("/api/auth/me", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["name"] == "Test User"

def test_unauthorized_access(client):
    response = client.get("/api/auth/me")
    assert response.status_code == 401

def test_logout(client):
    response = client.post("/api/auth/logout")
    assert response.status_code == 200
    assert "muvaffaqiyatli" in response.json()["message"]
