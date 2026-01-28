import { useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // IMPORTANT: Pehle jo API key di thi woh galat tha ya expired
  // Naya key lo: https://aistudio.google.com/app/apikey
  const API_KEY = ""; // Ya process.env.REACT_APP_GEMINI_API_KEY

  const askGemini = () => {
    // Empty message check
    if (!msg.trim()) {
      setError("Please type something first!");
      return;
    }

    setLoading(true);
    setError("");
    setReply("");

    // CORRECTED API ENDPOINT
    // NOTE: 'gemini-pro' model ab Google AI Studio mein 'gemini-1.5-pro' ya 'gemini-1.0-pro' ho sakta hai
    fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
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
          return res.text().then(text => {
            throw new Error(`Error ${res.status}: ${text}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data); // Debug ke liye
        
        // Check if response has correct structure
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
          setReply(data.candidates[0].content.parts[0].text);
        } else if (data.error) {
          throw new Error(data.error.message || "API Error");
        } else {
          throw new Error("Invalid response from Gemini");
        }
      })
      .catch((err) => {
        setError(err.message);
        console.error("API Error Details:", err);
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

  // Alternative: Latest Gemini 1.5 model try karo
  const askGeminiAlternative = () => {
    if (!msg.trim()) {
      setError("Please type something first!");
      return;
    }

    setLoading(true);
    setError("");
    setReply("");

    // Try different models
    const models = [
      "gemini-1.5-pro-latest",
      "gemini-1.0-pro",
      "gemini-pro-vision" // Text only ke liye bhi kaam karta hai
    ];

    // Sabse pehle gemini-1.5-pro-latest try karo
    fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${models[0]}:generateContent?key=${API_KEY}`,
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
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${text}`);
        }
        return JSON.parse(text);
      })
      .then((data) => {
        console.log("API Response:", data);
        
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          setReply(data.candidates[0].content.parts[0].text);
        } else if (data.error) {
          throw new Error(data.error.message || "API Error");
        } else {
          throw new Error("Unexpected response format");
        }
      })
      .catch((err) => {
        setError(`Failed: ${err.message}. Trying gemini-1.0-pro...`);
        
        // Fallback to gemini-1.0-pro
        return fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${API_KEY}`,
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
          .then(res => res.json())
          .then(data => {
            if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
              setReply(data.candidates[0].content.parts[0].text);
            } else {
              setError("All models failed. Check API key.");
            }
          })
          .catch(() => {
            setError("Check your API key and try again.");
          });
      })
      .finally(() => {
        setLoading(false);
      });
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
          onClick={askGeminiAlternative} // Updated to use alternative
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
            fontSize: "14px",
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

      {/* Debug info */}
      <div style={{ 
        marginTop: "30px", 
        padding: "10px", 
        backgroundColor: "#f5f5f5", 
        fontSize: "12px",
        color: "#666"
      }}>
        <p><strong>Debug Info:</strong></p>
        <p>• Try with new API key from <a href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</a></p>
        <p>• Models available: gemini-1.5-pro-latest, gemini-1.0-pro</p>
      </div>
    </div>
  );
}

export default App;