/** @format */

const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, trim: true, require: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
