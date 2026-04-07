const express = require("express");
const cors = require("cors");
const path = require("path");

const helmet =
require("helmet");

const rateLimit =
require("express-rate-limit");

const app = express();

/* ✅ Security Middlewares */

/* Helmet for secure headers */

app.use(helmet());

/* Rate Limiter */

const limiter =
rateLimit({

  windowMs:
    15 * 60 * 1000, // 15 minutes

  max: 100,

  message: {
    error:
    "Too many requests, please try again later."
  }

});

app.use(limiter);

/* Standard Middlewares */

app.use(cors());
app.use(express.json());

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