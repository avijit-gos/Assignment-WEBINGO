/** @format */

const mongoose = require("mongoose");
const Group = require("../schema/groupSchema");
const createError = require("http-errors");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const groupId = req.query.group || req.params.id;
    if (!groupId || !mongoose.Types.ObjectId.isValid(groupId)) {
      throw createError.BadRequest({ msg: "Invalid group id" });
    } else if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw createError.BadRequest({ msg: "Invalid user id" });
    } else {
      const group = await Group.findById(groupId).select("members");
      // console.log("group", group);
      if (!group.members.includes(userId)) {
        throw createError.BadRequest({ msg: "You are not group member" });
      }
      next();
    }
  } catch (error) {
    next(error);
  }
};
