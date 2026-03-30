import { useState } from "react";
import API from "./services/api";

function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    console.log("Button Clicked"); // DEBUG

    if (!prompt) {
      alert("Enter prompt first");
      return;
    }

    try {
      setLoading(true);

      console.log("Sending request...");

      const response = await API.post(
        "/generate",
        { prompt },
        { responseType: "blob" }
      );

      console.log("Response received");

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "extension.zip");

      document.body.appendChild(link);

      link.click();
    } catch (error) {
      console.error("Error:", error);

      alert("Extension generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>🚀 Extensio.ai</h1>

      <h2>No-Code Extension Factory</h2>

      <textarea
        rows="6"
        cols="60"
        placeholder="Enter your extension request..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleGenerate}>
        {loading ? "Generating..." : "Generate Extension"}
      </button>
    </div>
  );
}

export default App;
