const express = require("express");
const cors = require("cors");

const generateRoutes =
require("./routes/generateRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* Root test */

app.get("/", (req, res) => {

  res.send("API running...");

});

/* Correct route */

app.use("/api/generate", generateRoutes);

module.exports = app;