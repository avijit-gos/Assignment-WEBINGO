/** @format */

// validation.js
const { validationResult, body, param } = require("express-validator");
const createError = require("http-errors");
const mongoose = require("mongoose");

exports.validateRegisterInput = [
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("password", { msg: "Password is required" }).trim().isLength({ min: 3 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError.Conflict({ errors: errors.array()[0] });
    }
    next(); // Call the next middleware if validation passes
  },
];

exports.validateGroupCreateInput = [
  body("name", { msg: "Group name is required" }).trim().isLength({ min: 3 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError.Conflict({ errors: errors.array()[0] });
    }
    next();
  },
];

exports.validateParamsId = [
  // eslint-disable-next-line no-unused-vars
  param("id").custom((value, { req, res, next }) => {
    if (!mongoose.Types.ObjectId.isValid(req.body.user)) {
      throw createError.BadRequest({
        msg: "Invalid object id",
      });
    }
    next();
  }),
];

exports.validatePostInput = [
  body("content", { msg: "Post content is required" })
    .trim()
    .isLength({ min: 3 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError.Conflict({ errors: errors.array()[0] });
    }
    next(); // Call the next middleware if validation passes
  },
];
