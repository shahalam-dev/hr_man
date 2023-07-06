const { v4: uuidv4 } = require("uuid");
const models = require("../../database/models").models;
const createError = require("http-errors");

exports.readCompany = async (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        const { id } = req.params;
        const company = await models.Company.findOne({ where: { id: id } });

        return {
          message: "company has been updated",
          data: { ...company.dataValues },
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
