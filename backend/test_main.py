from fastapi.testclient import TestClient
from datetime import datetime
from main import app

client = TestClient(app)

def test_create_bookmark():
    response = client.post(
        "/bookmark",
        json={
            "title": "Test Bookmark",
            "url": "https://example.com",
            "remember_date": datetime.now().isoformat()
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Bookmark"
    assert data["url"] == "https://example.com"
    assert "id" in data

def test_get_bookmarks():
    response = client.get("/bookmarks")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_delete_bookmark():
    # First create a bookmark
    create_response = client.post(
        "/bookmark",
        json={
            "title": "To Delete",
            "url": "https://example.com",
            "remember_date": datetime.now().isoformat()
        }
    )
    bookmark_id = create_response.json()["id"]
    
    # Then delete it
    delete_response = client.delete(f"/bookmark/{bookmark_id}")
    assert delete_response.status_code == 200
    
    # Verify it's deleted
    get_response = client.get("/bookmarks")
    bookmarks = get_response.json()
    assert not any(b["id"] == bookmark_id for b in bookmarks) 