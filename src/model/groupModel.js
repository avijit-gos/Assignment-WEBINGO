/** @format */

const { default: mongoose } = require("mongoose");
const Group = require("../schema/groupSchema");
const User = require("../schema/userSchema");
const createError = require("http-errors");

class GroupModel {
  constructor() {}

  // create new group
  async handleCreateGroup(body, user) {
    try {
      // Creating a new instance of a Mongoose GROUP model
      const newGroup = Group({
        _id: new mongoose.Types.ObjectId(), // Generating a new ObjectId for the group
        name: body.name, // Assigning the group name from the request body
        creator: user._id, // Assigning the creator ID (assuming `user` is the authenticated user)
        members: [user._id], // Adding the creator's ID to the members array
      });

      // Save group data into the database
      const groupData = await newGroup.save();

      // Populate creator's details
      const group = await groupData.populate({
        path: "creator", // Path to populate (creator field)
        select: "email _id", // Selecting specific fields to populate (email and _id)
      });

      // Return success message along with the created group data
      return { msg: "Group has been created", group };
    } catch (error) {
      // If an error occurs during group creation, throw a BadRequest error with the error message
      throw createError.BadRequest({ msg: error.message });
    }
  }

  // add members to a particular group
  async handleAddMembers(userId, groupId) {
    try {
      // Find the group by its ID
      const group = await Group.findById(groupId);

      // Check if the user is already a member of the group
      const isMember = group.members && group.members.includes(userId);

      // Determine the update option based on whether the user is already a member
      const option = isMember ? "$pull" : "$addToSet";

      // Update the group with the new member
      const updateGroup = await Group.findByIdAndUpdate(
        groupId,
        {
          [option]: { members: userId }, // Adding or removing the user from the members array
        },
        { new: true } // Return the updated group after the update operation
      );

      // Return a success message based on whether the user was added or removed
      return {
        msg: isMember
          ? "User has been removed from member"
          : "User has been added as member",
        group: updateGroup, // Return the updated group data
      };
    } catch (error) {
      // If an error occurs during the process, throw a BadRequest error with the error message
      throw createError.BadRequest({ msg: error.message });
    }
  }

  // send group joining request to user
  async handleInviteRequest(userId, groupId) {
    try {
      // Find the user by their ID
      const user = await User.findById(userId);

      // Check if the user is already invited to the group
      const isInvited = user.invites && user.invites.includes(groupId);

      // Determine the update option based on whether the user is already invited
      const option = isInvited ? "$pull" : "$addToSet";

      // Update the user's invites with the new invite request
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          [option]: { invites: groupId }, // Adding or removing the group ID from the invites array
        },
        { new: true } // Return the updated user after the update operation
      );

      // Return a success message based on whether the user was invited or the invite request was removed
      return {
        msg: isInvited
          ? "Invite request has been removed"
          : "Invite request has been sent",
      };
    } catch (error) {
      // If an error occurs during the process, throw a BadRequest error with the error message
      throw createError.BadRequest({ msg: error.message });
    }
  }
}

module.exports = new GroupModel();
