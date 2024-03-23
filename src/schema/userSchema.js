/** @format */

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    email: { type: String, trim: true, require: true, unique: true },
    password: { type: String, require: true },
    frineds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    pending: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    invites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
