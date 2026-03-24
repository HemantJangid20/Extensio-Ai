const express = require("express");
const cors = require("cors");

const generateRoutes = require("./routes/generateRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/generate", generateRoutes);

module.exports = app;