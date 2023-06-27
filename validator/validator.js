const { body } = require("express-validator");
const models = require("../database/models").models;

exports.validate = (method) => {
  switch (method) {
    case "register": {
      return [
        body("full_name").exists().withMessage("name is required"),
        body("email")
          .isEmail()
          .withMessage("Invalid email")
          .custom(async (value) => {
            const user = await models.Auth.findOne({ where: { email: value } });
            if (!(user.length > 0)) {
              throw "Email already in use";
            }
          }),
        body("password")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?!.*\s).{8,}$/
          )
          .withMessage(
            "Password must minimum combination of 8 character one uppercase one lowercase and one character."
          ),
      ];
    }
    case "login": {
      return [
        body("email")
          .isEmail()
          .withMessage("invalid email")
          .exists()
          .whitelist("email is required"),
        body("password").exists().withMessage("password is required"),
      ];
    }
  }
};
