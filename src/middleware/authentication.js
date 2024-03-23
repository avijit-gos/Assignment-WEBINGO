/** @format */

const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = async (req, res, next) => {
  try {
    const token = req.query.token || req.headers["x-access-token"];
    if (!token) throw createError.BadGateway({ msg: "Token is not present" });
    const verify = jwt.verify(token, process.env.AUTH_KEY);
    req.user = verify;
    next();
  } catch (error) {
    next(error);
  }
};
