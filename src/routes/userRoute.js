/** @format */

const router = require("express").Router();
const {
  userRegistration,
  userLogin,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} = require("../controller/userController");
const { validateRegisterInput } = require("../middleware/validator");
const Authentication = require("../middleware/authentication");

/**
 * @REGISTER_USER
 * @URL: http://localhost:8080/api/user/register
 */
router.post("/register", validateRegisterInput, userRegistration);

/**
 * @LOGIN_URER
 * @URL: http://localhost:8080/api/user/login
 */
router.post("/login", validateRegisterInput, userLogin);

/**
 * @SEND_FRIEND_REQUEST
 * @URL: http://localhost:8080/api/user/send-friend-request/:id
 */
router.put("/send-friend-request/:id", Authentication, sendFriendRequest);

/**
 * @ACCEPT_FRIEND_REQUEST
 * @URL: http://localhost:8080/api/user/accept-friend-request/:id
 */
router.put("/accept-friend-request/:id", Authentication, acceptFriendRequest);

/**
 * @REJECT_FRIEND_REQUEST
 * @URL: http://localhost:8080/api/user/reject-friend-request/:id
 */
router.put("/reject-friend-request/:id", Authentication, rejectFriendRequest);

module.exports = router;
