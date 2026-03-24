import { useState } from "react";
import API from "../services/api";

function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await API.post("/generate", {
        prompt,
      });

      setResult(res.data.data);

    } catch (err) {
      console.error(err);
      alert("Generation failed");
    }
  };

  return (
    <div>

      <h2>Extensio.ai Generator</h2>

      <textarea
        rows="5"
        cols="60"
        placeholder="Enter extension request..."
        value={prompt}
        onChange={(e) =>
          setPrompt(e.target.value)
        }
      />

      <br />

      <button onClick={handleSubmit}>
        Generate
      </button>

      {result && (
        <pre>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

    </div>
  );
}

export default PromptForm;