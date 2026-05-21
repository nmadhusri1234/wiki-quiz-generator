from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from scraper import scrape_wikipedia
from quiz_generator import generate_quiz

from database import SessionLocal
from models import Quiz

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class URLRequest(BaseModel):
    url: str


@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}


@app.post("/generate-quiz")
def generate_quiz_api(data: URLRequest):

    scraped_data = scrape_wikipedia(data.url)

    quiz_text = generate_quiz(scraped_data["content"])

    db = SessionLocal()

    new_quiz = Quiz(
        url=data.url,
        title=scraped_data["title"],
        content=scraped_data["content"],
        quiz=quiz_text
    )

    db.add(new_quiz)

    db.commit()

    db.refresh(new_quiz)

    return {
        "id": new_quiz.id,
        "url": new_quiz.url,
        "title": new_quiz.title,
        "quiz": new_quiz.quiz
    }


@app.get("/history")
def get_history():

    db = SessionLocal()

    quizzes = db.query(Quiz).all()

    results = []

    for quiz in quizzes:

        results.append({
            "id": quiz.id,
            "url": quiz.url,
            "title": quiz.title,
            "quiz": quiz.quiz
        })

    return results


@app.delete("/delete-quiz/{quiz_id}")
def delete_quiz(quiz_id: int):

    db = SessionLocal()

    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()

    if not quiz:
        return {"message": "Quiz not found"}

    db.delete(quiz)

    db.commit()

    return {"message": "Quiz deleted successfully"}