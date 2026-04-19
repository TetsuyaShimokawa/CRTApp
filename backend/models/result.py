from pydantic import BaseModel


class Result(BaseModel):
    subject_id: str
    question_index: int
    response: str
    correct_answer: str
