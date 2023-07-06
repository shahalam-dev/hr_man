const { v4: uuidv4 } = require("uuid");
const models = require("../../database/models").models;
const createError = require("http-errors");

exports.login = async (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        const {
          legal_name,
          trading_name,
          abn,
          acn,
          arbn,
          other_license_number,
          shareholding_structure,
          incorporation_number,
        } = req.body;
        const generatedId = await uuidv4();
        const companyData = {
          legal_name,
          trading_name,
          abn,
          acn,
          arbn,
          other_license_number,
          shareholding_structure,
          incorporation_number,
        };

        const company = await models.Company.create(companyData);

        return {
          message: "company has been updated",
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
