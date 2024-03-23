/** @format */

const router = require("express").Router();
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getSinglePost,
} = require("../controller/PostController");
const Authentication = require("../middleware/authentication");
const checkGroupMembers = require("../middleware/checkGroupMembers");
const { validatePostInput } = require("../middleware/validator");

/**
 * @CREATE_NEW_POST
 * @URL: http://localhost:8080/api/post/create-post
 * @QUERY: group_id
 */
router.post(
  "/create-post",
  Authentication,
  validatePostInput,
  checkGroupMembers,
  createPost
);

/**
 * @GET_GROUP_RELATED_POSTS
 * @URL: http://localhost:8080/api/post/get-posts
 * @QUERY: group_id
 */
router.get("/get-posts", Authentication, checkGroupMembers, getPosts);

/**
 * @VIEW_SINGLE_POST
 * @URL: http://localhost:8080/api/post/get-post/:id
 * @params: post_id
 * @QUERY: group_id
 */
router.get("/get-post/:id", Authentication, checkGroupMembers, getSinglePost);

// update post
/**
 * @UPDATE_GROUP_POST
 * @URL: http://localhost:8080/api/post/update-post/:id
 * @params: post_id
 * @QUERY: group_id
 */
router.put(
  "/update-post/:id",
  Authentication,
  validatePostInput,
  checkGroupMembers,
  updatePost
);

/**
 * @DELETE_GROUP_POST
 * @URL: http://localhost:8080/api/post/delete-post/:id
 * @params: post_id
 * @QUERY: group_id
 */
router.delete(
  "/delete-post/:id",
  Authentication,
  checkGroupMembers,
  deletePost
);

module.exports = router;
