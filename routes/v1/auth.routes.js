const express = require("express");
const router = express.Router();
const validator = require("../../validator/validator");

const {
  signUp,
  logIn,
  verify,
  verifyOTP,
  forgotPassword,
  resetPassword,
  verifyEmail,
  logOut,
} = require("../../controllers/auth.controllers");

router.post("/register", validator.validate("register"), signUp);
router.post("/login", logIn);
router.get("/verify_email/:token", verifyEmail);
router.get("/forgot_password/:email", forgotPassword);
router.post("/reset_password", resetPassword);
router.get("/logout", logOut);

module.exports = router;
