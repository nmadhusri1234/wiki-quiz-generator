# Wiki Quiz Generator

An AI-powered Wiki Quiz Generator built using React.js, FastAPI, PostgreSQL, BeautifulSoup, LangChain, and Groq LLM.

This application accepts a Wikipedia URL, scrapes article content, generates AI-based quiz questions, stores quiz history in PostgreSQL, and displays previous quizzes in a modern frontend interface.

---

# Features

- Generate quizzes from Wikipedia articles
- AI-powered quiz generation using LangChain + Groq
- PostgreSQL database integration
- Quiz history management
- Delete quizzes
- Quiz details modal popup
- Modern React frontend
- FastAPI backend APIs
- Swagger API documentation

---

# Tech Stack

| Technology | Purpose |
|------------|----------|
| React.js | Frontend |
| FastAPI | Backend |
| PostgreSQL | Database |
| SQLAlchemy | ORM |
| BeautifulSoup | Wikipedia scraping |
| LangChain | AI orchestration |
| Groq API | LLM Provider |
| Axios | API communication |

---

# Project Structure

wiki-quiz-generator/

├── backend/

├── frontend/

├── sample_data/

└── README.md

---

# Backend Setup

## Step 1: Open Backend Folder

cd backend

## Step 2: Create Virtual Environment

python -m venv venv

## Step 3: Activate Virtual Environment

### Windows

venv\Scripts\activate

## Step 4: Install Dependencies

pip install fastapi uvicorn sqlalchemy psycopg2 requests beautifulsoup4 python-dotenv

pip install langchain langchain-groq langchain-core

## Step 5: Create .env File

Inside backend folder create `.env`

Add:

GROQ_API_KEY=your_groq_api_key

---

# PostgreSQL Setup

## Step 1: Create Database

Open pgAdmin and create a database named:

wiki_quiz_db

## Step 2: Configure Database

Open `database.py`

Update database connection string:

DATABASE_URL = "postgresql://postgres:password@localhost/wiki_quiz_db"

Replace:
- postgres → your PostgreSQL username
- password → your PostgreSQL password
- wiki_quiz_db → your database name

## Step 3: Create Tables

Run:

python create_tables.py

This creates required tables inside PostgreSQL.

---

# Run Backend

Start FastAPI backend:

uvicorn main:app --reload

Backend runs at:

http://127.0.0.1:8000

Swagger API Documentation:

http://127.0.0.1:8000/docs

---

# Frontend Setup

## Step 1: Open Frontend Folder

cd frontend

## Step 2: Install Dependencies

npm install

Install Axios:

npm install axios

## Step 3: Start Frontend

npm run dev

Frontend runs at:

http://localhost:5173

---

# API Endpoints

## 1. Home Endpoint

### GET /

Returns backend status.

### Response

{
  "message": "Backend Running Successfully"
}

---

## 2. Generate Quiz

### POST /generate-quiz

Generates quiz from Wikipedia URL.

### Request

{
  "url": "https://en.wikipedia.org/wiki/Alan_Turing"
}

### Response

{
  "id": 1,
  "url": "https://en.wikipedia.org/wiki/Alan_Turing",
  "title": "Alan Turing",
  "quiz": "Generated quiz content"
}

---

## 3. Quiz History

### GET /history

Returns all previously generated quizzes.

### Response

[
  {
    "id": 1,
    "title": "Alan Turing",
    "url": "https://en.wikipedia.org/wiki/Alan_Turing",
    "quiz": "Quiz content"
  }
]

---

## 4. Delete Quiz

### DELETE /delete-quiz/{id}

Deletes quiz by ID.

### Example

/delete-quiz/1

### Response

{
  "message": "Quiz deleted successfully"
}

---

# How Quiz Generation Works

1. User enters Wikipedia URL
2. React frontend sends request to FastAPI backend
3. BeautifulSoup scrapes article content
4. LangChain sends content to Groq LLM
5. AI generates quiz questions
6. Quiz is stored in PostgreSQL
7. Frontend displays generated quiz and history

---

# Tested Wikipedia URLs

https://en.wikipedia.org/wiki/Alan_Turing

https://en.wikipedia.org/wiki/Artificial_intelligence

https://en.wikipedia.org/wiki/Python_(programming_language)

https://en.wikipedia.org/wiki/India

https://en.wikipedia.org/wiki/Gravity

---





# Future Improvements

- Quiz score system
- Multiple quiz categories
- Authentication
- Download quiz as PDF
- Timer-based quiz mode

---

# Conclusion

This project demonstrates:

- Full-stack web development
- AI integration using LangChain
- REST API development
- Database management
- Web scraping
- React frontend development

The application successfully generates dynamic AI-based quizzes from Wikipedia articles using modern AI technologies.