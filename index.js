/** @format */

require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
require("./database");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

// importing user route
app.use("/api/user", require("./src/routes/userRoute"));

// importing group route
app.use("/api/group", require("./src/routes/groupRoute"));

// importing group post route
app.use("/api/post", require("./src/routes/PostRoute"));

app.use(async (req, res, next) => {
  next(createError.NotFound("Page not found"));
});
// Error message
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 8080;

const server = app.listen(port, () =>
  console.log(`Server listening on port:${port}`)
);

module.exports = server;
