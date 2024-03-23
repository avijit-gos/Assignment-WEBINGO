/** @format */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

class Helper {
  constructor() {}

  async hashUserPassword(data) {
    try {
      const hash = await bcrypt.hash(data, 10);
      return hash;
    } catch (error) {
      throw createError.BadRequest({ msg: error.message });
    }
  }

  async generateToken(user) {
    try {
      // eslint-disable-next-line no-undef
      const token = await jwt.sign({ _id: user._id }, process.env.AUTH_KEY, {
        expiresIn: "30d",
      });
      return token;
    } catch (error) {
      throw createError.BadRequest({ msg: error.message });
    }
  }

  async comparePassword(data, user) {
    try {
      const result = await bcrypt.compare(data, user.password);
      return result;
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }
}

module.exports = new Helper();
