const Project =
require("../models/Project");

const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const { v4: uuidv4 } = require("uuid");

const generateCode = async (req, res) => {

  console.log("🔥 Generate route hit");

  try {

    const projectId = uuidv4();

    console.log("Project ID:", projectId);

    const baseDir = path.join(
      __dirname,
      "..",
      "tmp",
      projectId
    );

    console.log("BaseDir:", baseDir);

    /* Create folder */

    fs.mkdirSync(baseDir, { recursive: true });

    console.log("📁 Folder created");

    /* Write manifest */

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

    /* Write popup */

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

    console.log("ZIP path:", zipPath);

    const output =
      fs.createWriteStream(zipPath);

    const archive =
      archiver("zip", {
        zlib: { level: 9 }
      });

    archive.pipe(output);

    archive.directory(baseDir, false);

    archive.finalize();

    output.on("close", async () => {
      console.log(
        "✅ ZIP finished:",
        archive.pointer(),
        "bytes"
      );

      /* Save project to MongoDB */

const newProject =
await Project.create({

  name: "Generated Extensions",

  prompt: req.body.prompt,

  zipPath: zipPath

});

console.log(
  "💾 Project saved:",
  newProject._id
);

/* Send ZIP */

res.download(zipPath);

    });

  } catch (error) {

    console.error("❌ FULL ERROR:", error);

    res.status(500).json({
      error: error.message
    });

  }

};

module.exports = generateCode;