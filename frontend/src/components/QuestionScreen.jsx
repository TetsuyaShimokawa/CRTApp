import { useState } from "react";

export default function QuestionScreen({ question, index, total, onNext }) {
  const [response, setResponse] = useState("");

  function handleNext() {
    onNext(response);
    setResponse("");
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <p style={styles.progress}>
          問題 {index + 1} / {total}
        </p>

        <p style={styles.questionText}>{question.text}</p>

        <div style={styles.answerRow}>
          <span style={styles.answerLabel}>回答（半角数字）</span>
          <input
            type="text"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNext()}
            style={styles.input}
            inputMode="numeric"
          />
          {question.unit && (
            <span style={styles.unit}>{question.unit}</span>
          )}
        </div>

        <div style={styles.buttonRow}>
          <button onClick={handleNext} style={styles.button}>
            次へ
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "24px",
    boxSizing: "border-box",
  },
  card: {
    background: "#fff",
    padding: "40px 48px",
    borderRadius: "8px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
    maxWidth: "680px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  progress: {
    margin: 0,
    fontSize: "13px",
    color: "#888",
  },
  questionText: {
    margin: 0,
    fontSize: "16px",
    lineHeight: "1.7",
    whiteSpace: "pre-wrap",
  },
  answerRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  answerLabel: {
    color: "red",
    fontWeight: "bold",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
  input: {
    fontSize: "15px",
    padding: "6px 10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "120px",
    outline: "none",
  },
  unit: {
    fontSize: "14px",
    color: "#333",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    padding: "10px 28px",
    fontSize: "15px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
