const generateExtension = require("../services/llmService");
const validateJSON = require("../utils/jsonValidator");

const generateCode = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const rawOutput = await generateExtension(prompt);

    let parsed;

    try {
      parsed = JSON.parse(rawOutput);
    } catch (err) {
      return res.status(500).json({
        error: "Invalid JSON from LLM",
        raw: rawOutput,
      });
    }

    validateJSON(parsed);

    res.json({
      success: true,
      data: parsed,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = generateCode;