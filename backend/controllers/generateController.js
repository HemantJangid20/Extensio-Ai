const generateExtensionCode = require("../utils/aiGenerator");
const validateSecurity = require("../utils/securityValidator");
const Project = require("../models/Project");
const fs = require("fs").promises;
const { createWriteStream } = require("fs");
const path = require("path");
const archiver = require("archiver");
const crypto = require("crypto");

/**
 * Sanitizes the user prompt to prevent basic injection.
 */
const sanitizePrompt = (prompt) => {
  if (!prompt) return "";
  return prompt.replace(/</g, "").replace(/>/g, "");
};

const generateCode = async (req, res) => {
  console.log("🚀 Starting optimized generation process...");

  // Create a unique ID for this specific request to prevent file collisions
  const requestId = crypto.randomUUID();
  const baseDir = path.join(__dirname, "..", "tmp", requestId);
  const zipPath = path.join(__dirname, "..", "tmp", `${requestId}.zip`);

  try {
    /* 1. Sanitize & Validate Input */
    const sanitizedPrompt = sanitizePrompt(req.body.prompt);
    if (!sanitizedPrompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    validateSecurity([{ content: sanitizedPrompt }]);

    /* 2. Generate AI Code */
    const aiResponse = await generateExtensionCode(sanitizedPrompt);
    
    let files;
    try {
      files = typeof aiResponse === "string" ? JSON.parse(aiResponse) : aiResponse;
    } catch (err) {
      console.error("❌ JSON Parse Error:", err);
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    /* 3. Prepare Workspace (Async) */
    await fs.mkdir(baseDir, { recursive: true });

    /* 4. Write Files in Parallel */
    // Using Promise.all is significantly faster than a for-loop for multiple files
   /* 4. Write Files in Parallel */
await Promise.all(
  Object.entries(files).map(async ([fileName, fileContent]) => {
    // Check if content is an object (like the manifest often is)
    // and convert it to a string if necessary.
    const sanitizedContent = typeof fileContent === "object" 
      ? JSON.stringify(fileContent, null, 2) 
      : String(fileContent);

    validateSecurity([{ content: sanitizedContent }]);
    
    const filePath = path.join(baseDir, fileName);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    
    // Now writing will succeed because it's a string
    return fs.writeFile(filePath, sanitizedContent);
  })
);

    /* 5. Create ZIP (Promisified) */
    await new Promise((resolve, reject) => {
      const output = createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", resolve);
      archive.on("error", (err) => reject(err));

      archive.pipe(output);
      archive.directory(baseDir, false);
      archive.finalize();
    });

    /* 6. Save to Database */
    const count = await Project.countDocuments();
    const newProject = await Project.create({
      name: `extension-${count + 1}`,
      prompt: sanitizedPrompt,
      zipPath: zipPath,
    });

    /* 7. Send File & Cleanup */
    res.download(zipPath, "extension.zip", async (err) => {
      if (err) {
        console.error("❌ Download Error:", err);
      }

      // Cleanup: Delete the temp folder and the zip file after the user downloads it
      try {
        await fs.rm(baseDir, { recursive: true, force: true });
        await fs.unlink(zipPath); 
        console.log(`🧹 Cleaned up temporary files for ${requestId}`);
      } catch (cleanupErr) {
        console.error("⚠️ Cleanup Warning:", cleanupErr.message);
      }
    });

  } catch (error) {
    console.error("❌ FULL ERROR:", error);
    
    // Attempt cleanup even if generation fails
    try {
      await fs.rm(baseDir, { recursive: true, force: true });
    } catch (ignore) {}

    res.status(500).json({
      error: error.message || "An error occurred during generation",
    });
  }
};

module.exports = generateCode;