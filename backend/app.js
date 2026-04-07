const express = require("express");
const cors = require("cors");
const path = require("path");
const rateLimit =
require("express-rate-limit");

const app = express();

/* ✅ Rate Limiter Setup */

const limiter =
rateLimit({

  windowMs:
    15 * 60 * 1000, // 15 minutes

  max: 100, // limit each IP to 100 requests

  message: {
    error:
    "Too many requests, please try again later."
  }

});

/* Middlewares */

app.use(cors());
app.use(express.json());

/* ✅ Apply Rate Limiter */

app.use(limiter);

/* ✅ Serve tmp folder */

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