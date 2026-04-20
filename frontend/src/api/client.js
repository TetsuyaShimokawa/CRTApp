const BASE_URL = "https://knowledge-assessment-backend-oazk.onrender.com";

export async function fetchQuestions() {
  const res = await fetch(`${BASE_URL}/api/crt/questions`);
  if (!res.ok) throw new Error("Failed to fetch questions");
  return res.json();
}

export async function postResult(payload) {
  const res = await fetch(`${BASE_URL}/api/crt/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to post result");
  return res.json();
}

export function getCsvUrl(subjectId) {
  return `${BASE_URL}/api/crt/results/${encodeURIComponent(subjectId)}/csv`;
}
