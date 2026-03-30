const fs = require("fs-extra");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function writeExtensionFiles(projectData) {
  try {
    console.log("📁 Starting file creation");

    const projectId = uuidv4();

    const baseDir = path.join(process.cwd(), "tmp", projectId);

    console.log("📁 Base directory:", baseDir);

    await fs.ensureDir(baseDir);

    for (const file of projectData.files) {
      const filePath = path.join(baseDir, file.filename);

      console.log("📄 Writing file:", file.filename);

      await fs.writeFile(filePath, file.content);
    }

    return {
      projectId,
      projectPath: baseDir,
    };
  } catch (error) {
    console.error("❌ File writing error:", error);

    throw error;
  }
}

module.exports = writeExtensionFiles;
