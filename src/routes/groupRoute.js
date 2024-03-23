/** @format */

const router = require("express").Router();
const {
  createGroup,
  addMembers,
  inviteRequest,
} = require("../controller/groupController");
const Authentication = require("../middleware/authentication");
const {
  validateGroupCreateInput,
  validateParamsId,
} = require("../middleware/validator");

/**
 * @CREATE_NEW_POST
 * @URL: http://localhost:8080/api/group
 */
router.post("/", Authentication, validateGroupCreateInput, createGroup);

/**
 * @ADD_MEMBER_TO_GROUP
 * @URL: http://localhost:8080/api/group/add-members/:id
 * @PARAMS: group_id
 */
router.put("/add-members/:id", Authentication, validateParamsId, addMembers);

/**
 * @SEND_GROUP_JOIN_REQUEST
 * @URL: http://localhost:8080/api/group/invite-request/:id
 * @PARAMS: group_id
 */
router.put(
  "/invite-request/:id",
  Authentication,
  validateParamsId,
  inviteRequest
);

module.exports = router;
