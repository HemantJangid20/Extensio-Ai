const express = require("express");

const generateCode =
require("../controllers/generateController");

const router = express.Router();

router.post("/", generateCode);

module.exports = router;