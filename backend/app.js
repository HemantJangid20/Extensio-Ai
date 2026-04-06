const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

/* Middlewares */

app.use(cors());
app.use(express.json());

/*  Serve tmp folder (IMPORTANT for zip download) */

app.use(
  "/tmp",
  express.static(
    path.join(__dirname, "tmp")
  )
);

/* Routes import */

const projectRoutes =
require("./routes/projectRoutes");

const generateRoutes =
require("./routes/generateRoutes");

/* Routes */

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/generate",
  generateRoutes
);

/* Root test */

app.get("/", (req, res) => {

  res.send("API running...");

});

module.exports = app;