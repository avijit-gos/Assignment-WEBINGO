/** @format */

const createHttpError = require("http-errors");
const {
  handleRegisterUser,
  handleSendFriendRequest,
  handleUpdateStatus,
  handleLoginUser,
} = require("../model/userModel");

class UserController {
  constructor() {}

  async userRegistration(req, res, next) {
    try {
      if (!req.body.email.trim() || !req.body.password) {
        throw createHttpError.BadRequest({
          msg: "Email & Password is not valid",
        });
      } else {
        const result = await handleRegisterUser(req.body);
        return res.status(201).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  async sendFriendRequest(req, res, next) {
    try {
      if (!req.params.id) {
        throw createHttpError.BadRequest({ msg: "Invaild request parameter" });
      } else {
        const result = await handleSendFriendRequest(
          req.params.id,
          req.user._id
        );
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  async acceptFriendRequest(req, res, next) {
    try {
      if (!req.params.id) {
        throw createHttpError.BadRequest({ msg: "Invaild request parameter" });
      } else {
        const result = await handleUpdateStatus(
          req.params.id,
          req.user._id,
          "accepted"
        );
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  async rejectFriendRequest(req, res, next) {
    try {
      if (!req.params.id) {
        throw createHttpError.BadRequest({ msg: "Invaild request parameter" });
      } else {
        const result = await handleUpdateStatus(
          req.params.id,
          req.user._id,
          "rejected"
        );
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  async userLogin(req, res, next) {
    try {
      if (!req.body.email.trim() || !req.body.password) {
        throw createHttpError.BadRequest({
          msg: "Email & Password is not valid",
        });
      } else {
        const result = await handleLoginUser(req.body);
        return res.status(201).json(result);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
