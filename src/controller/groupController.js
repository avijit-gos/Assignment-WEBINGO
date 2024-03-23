/** @format */

const createError = require("http-errors");
const {
  handleCreateGroup,
  handleAddMembers,
  handleInviteRequest,
} = require("../model/groupModel");

class GroupController {
  constructor() {}

  // create new group
  async createGroup(req, res, next) {
    try {
      const result = await handleCreateGroup(req.body, req.user);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  // add members to a particular group
  async addMembers(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest({ msg: "Group id is not present" });
      } else if (!req.body.userId) {
        throw createError.BadRequest({ msg: "User id is not present" });
      } else {
        const result = await handleAddMembers(req.body.userId, req.params.id);
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  // send group joining request to user
  async inviteRequest(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest({ msg: "Group id is not present" });
      } else if (!req.body.userId) {
        throw createError.BadRequest({ msg: "User id is not present" });
      } else {
        const result = await handleInviteRequest(
          req.body.userId,
          req.params.id
        );
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GroupController();
