/** @format */

const mongoose = require("mongoose");

// eslint-disable-next-line no-undef
mongoose.connect(process.env.DB_URL);
mongoose.connection.on("error", () => console.log("DB is not connected"));
mongoose.connection.on("connected", () => console.log("DB is connected"));
