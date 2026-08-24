def test_monthly_limit_enforcement(client, auth_headers):
    # 1. Boshida 0 / 10 bo'lishi kerak
    usage_res = client.get("/api/auth/usage", headers=auth_headers)
    assert usage_res.status_code == 200
    assert usage_res.json()["used"] == 0
    assert usage_res.json()["remaining"] == 10

    payload = {
        "business_name": "Test",
        "business_type": "Kafexona",
        "product_service": "Kofe",
        "platform": "Instagram",
        "goal": "Sotuv",
        "topic": "Haftalik post"
    }

    # 2. 10 marta muvaffaqiyatli generatsiya qilish
    for i in range(10):
        res = client.post("/api/generate/post", json=payload, headers=auth_headers)
        assert res.status_code == 200, f"Generatsiya {i+1} muvaffaqiyatsiz bo'ldi"
        assert res.json()["usage"]["used"] == i + 1

    # 3. Limit tekshiruvi: used = 10, remaining = 0
    usage_res2 = client.get("/api/auth/usage", headers=auth_headers)
    assert usage_res2.json()["used"] == 10
    assert usage_res2.json()["remaining"] == 0

    # 4. 11-generatsiya rad etilishi shart (HTTP 403 Forbidden)
    res_11 = client.post("/api/generate/post", json=payload, headers=auth_headers)
    assert res_11.status_code == 403
    assert "limitingiz tugadi" in res_11.json()["detail"]
