const { v4: uuidv4 } = require("uuid");
const models = require("../../database/models").models;
const createError = require("http-errors");

exports.deleteCompany = async (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        const { id } = req.params;
        const company = await models.Company.destroy({ where: { id: id } });

        return {
          message:
            company === 1
              ? "company has been deleted"
              : "company with provided id not found",
          data: {},
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
