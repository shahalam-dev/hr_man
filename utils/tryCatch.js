const { logger } = require("../utils/logger");
const createError = require("http-errors");

exports.tryCatch = async (cb, next) => {
  try {
    await cb();
  } catch (error) {
    logger.log("error", {
      message: error.message,
      errorStack: error.stack,
    });
    return next(createError.InternalServerError());
  }
};
