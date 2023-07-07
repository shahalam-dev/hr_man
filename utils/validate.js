const { logger } = require("../utils/logger");
const createError = require("http-errors");
const { validationResult } = require("express-validator");

exports.validate = (req, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.mapped();
    return next(createError.NotAcceptable(err));
  }
};
