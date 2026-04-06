const Project =
require("../models/Project");

/* Get all projects */

const getProjects =
async (req, res) => {

  try {

    const projects =
      await Project.find()
      .sort({ createdAt: -1 });

    res.json(projects);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

};

module.exports = {

  getProjects

};