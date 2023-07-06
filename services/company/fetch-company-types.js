const models = require("../../database/models").models;
const createError = require("http-errors");
const { logger } = require("../../utils/logger");

exports.fetchCompanyTypes = async (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        const companyTypes = await models.CompanyType.findAll();

        return {
          message:
            companyTypes === 0
              ? "no company types found"
              : "fetched company type successfully",
          data: [...companyTypes],
        };
      } catch (error) {
        logger.log("error", {
          message: error.message,
          errorStack: error.stack,
        });
        return next(createError.InternalServerError());
      }
    },
  });
};
