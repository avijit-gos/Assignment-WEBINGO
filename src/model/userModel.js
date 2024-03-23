/**
 * eslint-disable no-unused-vars
 *
 * @format
 */

/** @format */

const mongoose = require("mongoose");
const User = require("../schema/userSchema");
const FriendRequest = require("../schema/friendRequestSchema");
const createError = require("http-errors");
const {
  hashUserPassword,
  generateToken,
  comparePassword,
} = require("../helper/helper");

class UserModel {
  constructor() {}

  async handleRegisterUser(body) {
    try {
      // check user already exists with same email or not
      const user = await User.findOne({ email: body.email });
      // if user already exists
      if (user) return { msg: "Email already been exists" };

      // if user doest not exists
      // encrypt user password
      const hashPassword = await hashUserPassword(body.password);

      // after hash user password save user details in db
      const newUser = User({
        _id: new mongoose.Types.ObjectId(),
        email: body.email,
        password: hashPassword,
      });

      // saved details data in DB
      const savedUser = await newUser.save();

      // after saving data generate JWT token
      const token = await generateToken(savedUser);
      return { msg: "User successfully registed", token };
    } catch (error) {
      throw createError.BadRequest({ msg: error.message });
    }
  }

  async handleSendFriendRequest(profileId, userId) {
    try {
      // Create a new FriendRequest object with properties
      const newFriendRequest = new FriendRequest({
        _id: new mongoose.Types.ObjectId(), // Generate a unique ID
        toUser: profileId, // ID of the user the request is being sent to
        fromUser: userId, // ID of the user sending the request
      });

      // Save the new friend request to the database
      const savedData = await newFriendRequest.save();

      // Return a success message and the saved data (optional)
      return { msg: "Your request has been sent", savedData };
    } catch (error) {
      // Handle errors during friend request creation
      throw createError.BadRequest({ msg: error.message }); // Re-throw as BadRequest with error message
    }
  }

  async handleUpdateStatus(profileId, userId, statusValue) {
    try {
      // Find and update the friend request
      const updatedRequest = await FriendRequest.findOneAndUpdate(
        { $and: [{ toUser: userId }, { fromUser: profileId }] }, // Query criteria
        { status: statusValue }, // Update to be applied
        { new: true } // Return the modified document
      );

      // Prepare response message based on the status value
      const msg =
        statusValue === "accepted"
          ? "Request has been accepted"
          : "Request has been rejected";

      // Return the message
      return { msg };
    } catch (error) {
      // If an error occurs during the update process, throw a BadRequest error
      throw createError.BadRequest(error.message);
    }
  }

  async handleLoginUser(body) {
    try {
      // check user already exists with same email or not
      const user = await User.findOne({ email: body.email });
      // if user already exists
      if (!user) return { msg: "Email does not exists" };

      // if user doest not exists
      // encrypt user password
      const isCorrectPassword = await comparePassword(body.password, user);
      if (!isCorrectPassword) {
        throw createError.BadRequest({ msg: "Incorrect password" });
      }
      const token = await generateToken(user);
      return { msg: "User successfully loggedin", token };
    } catch (error) {
      throw createError.BadRequest({ msg: error.message });
    }
  }
}
module.exports = new UserModel();
