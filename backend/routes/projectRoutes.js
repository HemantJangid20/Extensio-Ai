const express =
require("express");

const {

  getProjects

} = require(
  "../controllers/projectController"
);

const router =
express.Router();

/* GET all projects */

router.get("/", getProjects);

module.exports =
router;