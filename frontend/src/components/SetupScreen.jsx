import { useState } from "react";

export default function SetupScreen({ onStart }) {
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  function handleStart() {
    if (!id.trim()) {
      setError("IDを入力してください。");
      return;
    }
    setError("");
    onStart(id.trim());
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>認知反射テスト（CRT）</h2>
        <label style={styles.label}>Input your ID</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleStart()}
          style={styles.input}
          placeholder="被験者IDを入力"
        />
        {error && <p style={styles.error}>{error}</p>}
        <button onClick={handleStart} style={styles.button}>
          Start
        </button>
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
  },
  card: {
    background: "#fff",
    padding: "48px 56px",
    borderRadius: "8px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    minWidth: "340px",
  },
  title: {
    margin: "0 0 8px",
    fontSize: "20px",
    textAlign: "center",
  },
  label: {
    fontSize: "15px",
    fontWeight: "bold",
  },
  input: {
    fontSize: "15px",
    padding: "8px 10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  error: {
    margin: 0,
    color: "red",
    fontSize: "13px",
  },
  button: {
    marginTop: "8px",
    padding: "10px",
    fontSize: "15px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
