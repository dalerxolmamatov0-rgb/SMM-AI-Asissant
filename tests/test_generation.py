def test_generate_post(client, auth_headers):
    payload = {
        "business_name": "Test Café",
        "business_type": "Restoran",
        "product_service": "Kofe va Pitsa",
        "platform": "Instagram",
        "goal": "Sotuv",
        "audience": "Yoshlar",
        "tone": "Do'stona",
        "topic": "Yangi desert"
    }
    response = client.post("/api/generate/post", json=payload, headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["type"] == "post"
    assert "title" in data["output"]
    assert "content" in data["output"]
    assert "cta" in data["output"]
    assert len(data["output"]["hashtags"]) > 0

def test_generate_reels(client, auth_headers):
    payload = {
        "business_type": "Kiyim do'koni",
        "product_service": "Pidjak",
        "goal": "Viral reach",
        "platform": "Instagram Reels",
        "topic": "Obraz yaratish"
    }
    response = client.post("/api/generate/reels", json=payload, headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["type"] == "reels"
    assert "hook" in data["output"]
    assert "timeline_scenes" in data["output"]
    assert len(data["output"]["timeline_scenes"]) > 0

def test_generate_content_plan(client, auth_headers):
    payload = {
        "business_type": "IT Kurslar",
        "platform": "Instagram",
        "goal": "Sotuv",
        "duration_days": 7
    }
    response = client.post("/api/generate/content-plan", json=payload, headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["type"] == "content_plan"
    assert data["output"]["duration_days"] == 7
    assert len(data["output"]["days"]) == 7

def test_generate_hashtags(client, auth_headers):
    payload = {
        "business_type": "Go'zallik Saloni",
        "product_service": "Makiyaj",
        "city": "Toshkent",
        "platform": "Instagram"
    }
    response = client.post("/api/generate/hashtags", json=payload, headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert "categories" in data["output"]
    assert "high_competition" in data["output"]["categories"]

def test_generate_ad_copy(client, auth_headers):
    payload = {
        "business_type": "Kurs",
        "product_service": "Ingliz tili",
        "target_audience": "Talabalar",
        "offer": "20% chegirma"
    }
    response = client.post("/api/generate/ad-copy", json=payload, headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert "short_version" in data["output"]
    assert "medium_version" in data["output"]
    assert "long_version" in data["output"]

def test_generate_image_prompt(client, auth_headers):
    payload = {
        "product_or_post_description": "Modern sneaker on podium",
        "style_preference": "Photorealistic, 8k",
        "brand_colors": "Blue and white"
    }
    response = client.post("/api/generate/image-prompt", json=payload, headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert "prompts" in data["output"]
    assert "negative_prompt" in data["output"]

def test_generate_audience(client, auth_headers):
    payload = {
        "business_name": "Premium Auto",
        "business_type": "Avtosalon",
        "product_service": "Elektromobillar",
        "price_segment": "Premium"
    }
    response = client.post("/api/generate/audience", json=payload, headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert "ideal_customer" in data["output"]
    assert "pain_points" in data["output"]
