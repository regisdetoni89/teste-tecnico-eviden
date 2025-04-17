from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import List, Optional

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
bookmarks = []

class Bookmark(BaseModel):
    id: Optional[int] = None
    title: str
    url: HttpUrl
    remember_date: datetime

@app.get("/bookmarks", response_model=List[Bookmark])
async def get_bookmarks():
    return bookmarks

@app.post("/bookmark", response_model=Bookmark)
async def create_bookmark(bookmark: Bookmark):
    bookmark.id = len(bookmarks) + 1
    bookmarks.append(bookmark)
    bookmarks.sort(key=lambda x: x.remember_date)
    return bookmark

@app.delete("/bookmark/{bookmark_id}")
async def delete_bookmark(bookmark_id: int):
    for i, bookmark in enumerate(bookmarks):
        if bookmark.id == bookmark_id:
            return bookmarks.pop(i)
    raise HTTPException(status_code=404, detail="Bookmark not found") 

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)