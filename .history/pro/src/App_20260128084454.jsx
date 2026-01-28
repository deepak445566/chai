import { useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // API key ko .env file me rakho (IMPORTANT!)
  // .env.local file me: REACT_APP_GEMINI_API_KEY=your_key_here
  const API_KEY = AIzaSyAWIJ1ozowhpGd21D9KeR3NW5faJzGnpnw;

  const askGemini = () => {
    // Empty message check
    if (!msg.trim()) {
      setError("Please type something first!");
      return;
    }

    setLoading(true);
    setError("");
    setReply("");

    fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: msg }],
            },
          ],
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Check if response has correct structure
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
          setReply(data.candidates[0].content.parts[0].text);
        } else {
          throw new Error("Invalid response from Gemini");
        }
      })
      .catch((err) => {
        setError(err.message);
        console.error("API Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      askGemini();
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ color: "#4285f4" }}>Gemini Chatbot</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
          disabled={loading}
        />

        <button
          onClick={askGemini}
          disabled={loading || !msg.trim()}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#4285f4",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>

      {error && (
        <div
          style={{
            color: "red",
            backgroundColor: "#ffe6e6",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {reply && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong style={{ color: "#4285f4" }}>Reply:</strong>
          </p>
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
              borderLeft: "4px solid #4285f4",
              whiteSpace: "pre-wrap",
              lineHeight: "1.5",
            }}
          >
            {reply}
          </div>
        </div>
      )}

      {/* Important warning about API key */}
      {API_KEY === "YOUR_API_KEY_HERE" && (
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "5px",
            color: "#856404",
          }}
        >
          <strong>⚠️ Warning:</strong> API key not configured. Create a{" "}
          <code>.env.local</code> file and add{" "}
          <code>REACT_APP_GEMINI_API_KEY=your_key_here</code>
        </div>
      )}
    </div>
  );
}

export default App;