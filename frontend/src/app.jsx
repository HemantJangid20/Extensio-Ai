import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "./services/api";
import "./App.css";

function App() {

  const navigate = useNavigate();   // ✅ Added navigation

  const [prompt, setPrompt] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleGenerate =
    async () => {

      if (!prompt) return;

      try {

        setLoading(true);

        const response =
          await API.post(
            "/generate",
            { prompt },
            {
              responseType: "blob"
            }
          );

        const blob =
          new Blob([response.data]);

        const url =
          window.URL.createObjectURL(blob);

        const link =
          document.createElement("a");

        link.href = url;
        link.download = "extension.zip";

        link.click();

      } catch (error) {

        console.error(error);

        alert(
          "Extension generation failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

<div className="app">

{/* Floating Blobs */}

<div className="blob blob1"></div>
<div className="blob blob2"></div>

{/* Main Card */}

<div className="card">

<h1 className="title">

Extensio.ai 🚀

</h1>

<p className="subtitle">

Turn ideas into Chrome extensions instantly

</p>

<textarea

className="textarea"

placeholder="Try: Block all images on websites..."

value={prompt}

onChange={(e) =>
  setPrompt(e.target.value)
}

/>

<button

onClick={handleGenerate}

disabled={loading}

className="btn"

>

{loading
? "Generating magic..."
: "Generate Extension ⚡"}

</button>

{/* ✅ New Button Added */}

<button
onClick={() => navigate("/projects")}
className="btn"
>

View Projects 📦

</button>

</div>

</div>

  );

}

export default App;