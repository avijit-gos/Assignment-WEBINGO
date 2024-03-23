/** @format */
const createError = require("http-errors");
const Post = require("../schema/postsSchema");
// const Group = require("../schema/groupSchema");
const { default: mongoose } = require("mongoose");

class PostModel {
  constructor() {}
  // create a new post
  async handleCreatePost(body, user, id) {
    try {
      // Create a new Post instance with provided data
      const newPost = new Post({
        _id: new mongoose.Types.ObjectId(), // Generate a new unique ID
        content: body.content, // Set the content of the post
        creator: user._id, // Set the creator of the post
        group: id, // Set the group associated with the post (optional)
      });

      // Save the new post to the database
      const post = await newPost.save();

      // Return the newly created post object
      return post;
    } catch (error) {
      // If an error occurs during post creation, throw a BadRequest error
      throw createError.BadRequest({ msg: error.message });
    }
  }

  // get group related posts
  async handleGetPosts(page, limit, id) {
    try {
      // Find posts associated with the specified group, populate creator information,
      // skip posts based on pagination, limit the number of posts, and sort by createdAt descending
      const posts = await Post.find({ group: id })
        .populate({ path: "creator", select: "email _id" }) // Populate creator's email and ID
        .skip((Number(page) - 1) * Number(limit)) // Skip posts based on pagination
        .limit(Number(limit)) // Limit the number of posts per page
        .sort({ createdAt: -1 }); // Sort posts by createdAt in descending order

      // Return the retrieved posts
      return posts;
    } catch (error) {
      // If an error occurs during post retrieval, throw a BadRequest error
      throw createError.BadRequest({ msg: error.message });
    }
  }

  // view single post
  async handleGetSinglePost(id, groupId) {
    try {
      // Find a single post with the given ID and associated group,
      // and populate creator information (email and ID)
      const result = await Post.findOne({
        $and: [{ _id: id }, { group: groupId }],
      }).populate({ path: "creator", select: "email _id" });

      // Return the retrieved post
      return result;
    } catch (error) {
      // If an error occurs during post retrieval, throw a BadRequest error
      throw createError.BadRequest({ msg: error.message });
    }
  }

  // update post
  async handleUpdatePost(id, groupId, body) {
    try {
      // Find and update the post with the given ID and associated group,
      // updating the content field with the provided content in the request body
      const result = await Post.findOneAndUpdate(
        {
          $and: [{ _id: id }, { group: groupId }],
        },
        { $set: { content: body.content } }, // Set the updated content
        { new: true } // Return the modified document after update
      ).populate({ path: "creator", select: "email _id" }); // Populate creator information

      // Return the updated post
      return result;
    } catch (error) {
      // If an error occurs during post update, throw a BadRequest error
      throw createError.BadRequest({ msg: error.message });
    }
  }

  // delete post
  async handleDeletePost(id) {
    try {
      // Find and delete the post with the given ID
      const result = await Post.findByIdAndDelete(id);

      // Return a message indicating successful deletion and the deleted post
      return { msg: "Post has been deleted", post: result };
    } catch (error) {
      // If an error occurs during post deletion, throw a BadRequest error
      throw createError.BadRequest({ msg: error.message });
    }
  }
}
module.exports = new PostModel();
