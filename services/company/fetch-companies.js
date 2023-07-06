const { v4: uuidv4 } = require("uuid");
const models = require("../../database/models").models;
const createError = require("http-errors");
const { logger } = require("../../utils/logger");

exports.fetchCompanies = async (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        const { id } = req.params;
        const companies = await models.Company.findAll({
          where: { created_by: id },
        });
        console.log(
          "🚀 ~ file: fetch-companies.js:14 ~ execute: ~ companies:",
          companies
        );

        return {
          message: "company has been updated",
          data: [...companies],
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
