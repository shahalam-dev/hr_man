const express = require("express");
const router = express.Router();
const validator = require("../../validator/validator");
console.log("🚀 ~ file: auth.routes.js:4 ~ validate:", validator.validate);
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
router.post("/logout", logOut);

module.exports = router;
