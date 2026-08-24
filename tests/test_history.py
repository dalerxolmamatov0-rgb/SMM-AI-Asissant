def test_history_creation_and_isolation(client, auth_headers):
    # Generatsiya yaratish
    client.post("/api/generate/post", json={
        "business_name": "My Brand",
        "business_type": "Kiyim",
        "product_service": "Ko'ylak",
        "platform": "Instagram",
        "goal": "Sotuv",
        "topic": "Bahor"
    }, headers=auth_headers)

    client.post("/api/generate/reels", json={
        "business_type": "Kiyim",
        "product_service": "Ko'ylak",
        "goal": "Viral reach",
        "platform": "Instagram Reels",
        "topic": "Reels"
    }, headers=auth_headers)

    # Tarixni olish
    history_res = client.get("/api/history", headers=auth_headers)
    assert history_res.status_code == 200
    items = history_res.json()
    assert len(items) == 2

    # Filter bo'yicha olish
    reels_only = client.get("/api/history?type=reels", headers=auth_headers)
    assert reels_only.status_code == 200
    assert len(reels_only.json()) == 1
    assert reels_only.json()[0]["type"] == "reels"

    # Boshqa foydalanuvchi ko'ra olmasligi (Data isolation)
    other_user = client.post("/api/auth/register", json={
        "name": "Other User",
        "email": "other@example.com",
        "password": "password123"
    })
    other_token = other_user.json()["access_token"]
    other_headers = {"Authorization": f"Bearer {other_token}"}

    other_history = client.get("/api/history", headers=other_headers)
    assert other_history.status_code == 200
    assert len(other_history.json()) == 0
