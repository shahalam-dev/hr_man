const { body, param, cookie } = require("express-validator");
const models = require("../database/models").models;

exports.validate = (method) => {
  switch (method) {
    case "register": {
      return [
        body("full_name").exists().withMessage("name is required"),
        body("email")
          .exists()
          .withMessage("email is required")
          .isEmail()
          .withMessage("Invalid email"),
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
    case "forgot-pass": {
      return [
        param("email")
          .isEmail()
          .withMessage("invalid email")
          .exists()
          .whitelist("email parameter is required"),
      ];
    }
    case "reset-pass": {
      return [
        body("token").exists().withMessage("token is required"),
        body("password").exists().withMessage("password is required"),
      ];
    }
    case "verify-email": {
      return [param("token").exists().whitelist("token parameter is required")];
    }
    case "email-verification-link": {
      return [param("email").exists().whitelist("email parameter is required")];
    }
    case "logout": {
      return [cookie("auth").exists().whitelist("auth cookie not found")];
    }
    // auth request validation ended
    case "create-company": {
      return [
        body("company_type")
          .exists()
          .withMessage("company type is required")
          .isIn([
            "sole-trader",
            "partnership",
            "shareholding-company",
            "company-limited-by-guarantee",
            "trust",
            "incorporated-association",
          ])
          .withMessage("invalid company type"),
        body("company_type_ref")
          .exists()
          .withMessage("company type ref id is required")
          .isUUID()
          .withMessage("company type ref uuid is invalid"),
        body("legal_name")
          .exists()
          .withMessage("legal name is required")
          .isString()
          .withMessage("company legal name must be a string"),
        body("trading_name")
          .exists()
          .withMessage("trading name is required")
          .isString()
          .withMessage("company trading ame must be string"),
        body("abn")
          .exists()
          .withMessage("ABN is required")
          .isString()
          .withMessage("ABN must be a string"),
        body("acn").isString().withMessage("ACN must be a string"),
        body("arbn").isString().withMessage("ARBN must be a string"),
        body("other_license_number")
          .exists()
          .withMessage("license number is required"),
        body("shareholding_structure")
          .isInt()
          .withMessage("shareholding must be a number"),
        body("incorporation_number")
          .isString()
          .withMessage("incorporation number must be a string"),
        body("created_by")
          .isUUID()
          .withMessage("company type ref uuid is invalid"),
      ];
    }
    case "update-company": {
      return [
        param("id")
          .exists()
          .withMessage("company id param is required")
          .isUUID()
          .withMessage("invalid param"),
        body("legal_name")
          .optional()
          .isString()
          .withMessage("company legal name must be a string"),
        body("trading_name")
          .optional()
          .isString()
          .withMessage("company trading ame must be string"),
        body("abn").optional().isString().withMessage("ABN must be a string"),
        body("acn").optional().isString().withMessage("ACN must be a string"),
        body("arbn").optional().isString().withMessage("ARBN must be a string"),
        body("other_license_number")
          .optional()
          .isString()
          .withMessage("ABN must be a string"),
        body("shareholding_structure")
          .optional()
          .isInt()
          .withMessage("shareholding must be a number"),
        body("incorporation_number")
          .optional()
          .isString()
          .withMessage("incorporation number must be a string"),
      ];
    }
    case "read-company": {
      return [
        param("id")
          .exists()
          .withMessage("company id param is required")
          .isUUID()
          .withMessage("invalid param"),
      ];
    }
    case "delete-company": {
      return [
        param("id")
          .exists()
          .withMessage("company id param is required")
          .isUUID()
          .withMessage("invalid param"),
      ];
    }
    case "fetch-companies": {
      return [
        param("id")
          .exists()
          .withMessage("owner's id param is required")
          .isUUID()
          .withMessage("invalid param"),
      ];
    }
  }
};
