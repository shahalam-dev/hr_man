const models = require("../../database/models").models;
const createError = require("http-errors");

exports.fetchCompanyTypes = async (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        const companyTypes = await models.CompanyType.findAll();

        return {
          message: "company has been updated",
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
