const validateSecurity =
require("../utils/securityValidator");

const Project =
require("../models/Project");

const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const { v4: uuidv4 } = require("uuid");

/* ✅ Prompt Sanitizer */

const sanitizePrompt =
(prompt) => {

  if (!prompt) return "";

  return prompt
    .replace(/</g, "")
    .replace(/>/g, "");

};

const generateCode = async (req, res) => {

  console.log("🔥 Generate route hit");

  try {

    /* ✅ Sanitize Prompt */

    const sanitizedPrompt =
      sanitizePrompt(
        req.body.prompt
      );

    if (!sanitizedPrompt) {

      return res.status(400).json({
        error: "Prompt is required"
      });

    }

    /* ✅ Security Validation */

    const isSafe =
      validateSecurity(
        sanitizedPrompt
      );

    if (!isSafe) {

      return res.status(400).json({
        error: "Unsafe content detected"
      });

    }

    /* Generate Project ID */

    const projectId = uuidv4();

    console.log("Project ID:", projectId);

    /* Create Base Folder */

    const baseDir = path.join(
      __dirname,
      "..",
      "tmp",
      projectId
    );

    fs.mkdirSync(baseDir, { recursive: true });

    console.log("📁 Folder created");

    /* Write manifest.json */

    const manifestPath =
      path.join(baseDir, "manifest.json");

    fs.writeFileSync(
      manifestPath,
      JSON.stringify({
        manifest_version: 3,
        name: "Test Extension",
        version: "1.0",

        action: {
          default_popup: "popup.html"
        }

      }, null, 2)
    );

    console.log("📄 manifest.json written");

    /* Write popup.html */

    const popupPath =
      path.join(baseDir, "popup.html");

    fs.writeFileSync(
      popupPath,
      "<h1>Hello Extensio.ai 🚀</h1>"
    );

    console.log("📄 popup.html written");

    /* Create ZIP */

    const zipPath = path.join(
      __dirname,
      "..",
      "tmp",
      projectId + ".zip"
    );

    const output =
      fs.createWriteStream(zipPath);

    const archive =
      archiver("zip", {
        zlib: { level: 9 }
      });

    archive.pipe(output);

    archive.directory(baseDir, false);

    archive.finalize();

    /* When ZIP finishes */

    output.on("close", async () => {

      console.log(
        "✅ ZIP finished:",
        archive.pointer(),
        "bytes"
      );

      /* Save project */

      const newProject =
      await Project.create({

        name: "Generated Extension",

        prompt: sanitizedPrompt,

        zipPath: zipPath

      });

      console.log(
        "💾 Project saved:",
        newProject._id
      );

      /* Send ZIP */

      res.download(
        zipPath,
        "extension.zip",
        (err) => {

          if (err) {

            console.error(
              "Download error:",
              err
            );

          }

          /* 🧹 Cleanup */

          try {

            fs.rmSync(
              baseDir,
              { recursive: true, force: true }
            );

            console.log(
              "🧹 Temp folder deleted"
            );

          } catch (cleanupError) {

            console.error(
              "Cleanup error:",
              cleanupError
            );

          }

        }
      );

    });

  } catch (error) {

    console.error(
      "❌ FULL ERROR:",
      error
    );

    res.status(500).json({
      error: error.message
    });

  }

};

module.exports = generateCode;