from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Quiz(Base):

    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)

    url = Column(String)

    title = Column(String)

    content = Column(Text)

    quiz = Column(Text)