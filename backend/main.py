import csv
import io
import random
from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from data.questions import QUESTIONS
from models.result import Result

app = FastAPI()

origins = [
    "https://crtapp-frontend.onrender.com",
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

results_store: dict[str, list[dict]] = {}


@app.get("/api/questions")
def get_questions():
    shuffled = QUESTIONS.copy()
    random.shuffle(shuffled)
    return shuffled


@app.post("/api/results")
def post_result(result: Result):
    if result.subject_id not in results_store:
        results_store[result.subject_id] = []
    entries = results_store[result.subject_id]
    for i, entry in enumerate(entries):
        if entry["question_index"] == result.question_index:
            entries[i] = result.model_dump()
            return {"status": "ok"}
    entries.append(result.model_dump())
    return {"status": "ok"}


@app.get("/api/results/{subject_id}/csv")
def download_csv(subject_id: str):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"AnsCRT_{subject_id}_{timestamp}.csv"

    rows = results_store.get(subject_id, [])

    output = io.StringIO()
    writer = csv.DictWriter(
        output,
        fieldnames=["SubjectID", "QuestionIndex", "Response", "CorrectAnswer"],
    )
    writer.writeheader()
    for row in rows:
        writer.writerow(
            {
                "SubjectID": row["subject_id"],
                "QuestionIndex": row["question_index"],
                "Response": row["response"],
                "CorrectAnswer": row["correct_answer"],
            }
        )

    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue().encode("utf-8-sig")]),
        media_type="text/csv; charset=utf-8-sig",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
