import { useState } from "react";
import SetupScreen from "./components/SetupScreen";
import QuestionScreen from "./components/QuestionScreen";
import FinishScreen from "./components/FinishScreen";
import { fetchQuestions, postResult } from "./api/client";

function App() {
  const [screen, setScreen] = useState("setup");
  const [subjectId, setSubjectId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");

  async function handleStart(id) {
    try {
      const qs = await fetchQuestions();
      setSubjectId(id);
      setQuestions(qs);
      setCurrentIndex(0);
      setScreen("question");
    } catch {
      setError("問題の取得に失敗しました。バックエンドが起動しているか確認してください。");
    }
  }

  async function handleNext(response) {
    const q = questions[currentIndex];
    try {
      await postResult({
        subject_id: subjectId,
        question_index: q.id,
        response: response,
        correct_answer: q.correct_answer,
      });
    } catch (e) {
      console.error("Failed to post result:", e);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setScreen("finish");
    }
  }

  if (error) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p style={{ color: "red", fontSize: "16px" }}>{error}</p>
      </div>
    );
  }

  if (screen === "setup") return <SetupScreen onStart={handleStart} />;
  if (screen === "question") {
    return (
      <QuestionScreen
        question={questions[currentIndex]}
        index={currentIndex}
        total={questions.length}
        onNext={handleNext}
      />
    );
  }
  return <FinishScreen subjectId={subjectId} />;
}

export default App;
