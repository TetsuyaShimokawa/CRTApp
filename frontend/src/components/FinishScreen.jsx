import { getCsvUrl } from "../api/client";

export default function FinishScreen({ subjectId }) {
  function handleDownload() {
    const url = getCsvUrl(subjectId);
    const a = document.createElement("a");
    a.href = url;
    a.click();
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <p style={styles.message}>実験は終了です。お疲れ様でした。</p>
        <button onClick={handleDownload} style={styles.button}>
          CSVダウンロード
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
    alignItems: "center",
    gap: "24px",
    minWidth: "340px",
  },
  message: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
  },
  button: {
    padding: "10px 28px",
    fontSize: "15px",
    backgroundColor: "#388e3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
