# Bookmark Manager

## Features

- Add new bookmarks with title, URL, and remember date
- View list of saved bookmarks ordered by remember date
- Highlight bookmarks with today's remember date
- Delete bookmarks
- URL validation
- Modern Material-UI interface
- Loading states and error handling

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.7 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- GET /bookmarks - Returns a list of saved bookmarks
- POST /bookmark - Adds a new bookmark
- DELETE /bookmark/{id} - Deletes a bookmark by ID

## Testing

To run the backend tests:
```bash
cd backend
pytest
``` 