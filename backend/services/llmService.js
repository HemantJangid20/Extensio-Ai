const openai = require("../config/openai");

const SYSTEM_PROMPT = `
You are an expert Chrome Extension Developer.

Your job:
Generate a valid Chrome Extension Manifest V3 project.

Return ONLY valid JSON.

Format:

{
  "projectName": "string",
  "files": [
    {
      "filename": "manifest.json",
      "content": "file content"
    }
  ]
}

Rules:

1. Always generate manifest.json
2. Always use Manifest Version 3
3. Include content.js
4. Include popup.html
5. Do NOT explain anything
6. Do NOT output markdown
7. Output ONLY JSON
`;

async function generateExtension(prompt) {
  try {
    const response = await openai.post("/chat/completions", {
      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.2,
    });

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error("LLM generation failed");
  }
}

module.exports = generateExtension;