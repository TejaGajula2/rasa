const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const { friendValidation } = require("../../validations");
const { friendController } = require("../../controllers");

const router = express.Router();

router
  .route("/:userId")
  .get(
    auth("getfiends"),
    validate(friendValidation.userId),
    friendController.getFriendUser
  );

module.exports = router;
