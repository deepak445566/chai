import { useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const API_KEY = "AIzaSyDl_ie0040L8YvB7JHAD4EMVdZnJGk-928";

  const askGemini = () => {
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
      .then((res) => res.json())
      .then((data) => {
        setReply(
          data.candidates[0].content.parts[0].text
        );
      });
  };

  return (
    <div>
      <h2>Gemini Chatbot</h2>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type here"
      />

      <button onClick={askGemini}>Send</button>

      <p><b>Reply:</b></p>
      <p>{reply}</p>
    </div>
  );
}

export default App;