from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:MadhuRaj%40143@localhost:5432/wiki_quiz_db"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind = engine)
from sqlalchemy.orm import Session