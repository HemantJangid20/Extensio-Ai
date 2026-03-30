const archiver = require("archiver");
const fs = require("fs");
const path = require("path");

function createZip(projectPath, projectName) {
  return new Promise((resolve, reject) => {
    const zipPath = path.join(projectPath, "..", `${projectName}.zip`);

    console.log("📦 ZIP path:", zipPath);

    const output = fs.createWriteStream(zipPath);

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    output.on("close", () => {
      console.log("✅ ZIP finalized:", archive.pointer(), "bytes");

      resolve(zipPath);
    });

    archive.on("error", (err) => {
      console.error("❌ ZIP error:", err);

      reject(err);
    });

    archive.pipe(output);

    archive.directory(projectPath, false);

    archive.finalize();
  });
}

module.exports = createZip;
