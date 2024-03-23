/** @format */

const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    content: { type: String, trim: true, require: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", index: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
