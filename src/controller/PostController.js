/** @format */
// const createError = require("http-errors");

const createError = require("http-errors");
const {
  handleCreatePost,
  handleGetPosts,
  handleGetSinglePost,
  handleUpdatePost,
  handleDeletePost,
} = require("../model/postModel");

class PostController {
  constructor() {}
  // create a new post
  async createPost(req, res, next) {
    try {
      const result = await handleCreatePost(
        req.body,
        req.user,
        req.query.group
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // get group related posts
  async getPosts(req, res, next) {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const groupId = req.query.group;
      const result = await handleGetPosts(page, limit, groupId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // view single post
  async getSinglePost(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest({ msg: "Post id is not present" });
      } else {
        const result = await handleGetSinglePost(
          req.params.id,
          req.query.group
        );
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  // update post
  async updatePost(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest({ msg: "Post id is not present" });
      } else {
        const result = await handleUpdatePost(
          req.params.id,
          req.query.group,
          req.body
        );
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  // delete post
  async deletePost(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest({ msg: "Post id is not present" });
      } else {
        const result = await handleDeletePost(req.params.id);
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new PostController();
