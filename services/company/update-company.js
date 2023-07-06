const { v4: uuidv4 } = require("uuid");
const models = require("../../database/models").models;
const createError = require("http-errors");
const { logger } = require("../../utils/logger");

exports.updateCompany = (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        const { id } = req.params;
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

        const company = await models.Company.upsert({ id: id, ...companyData });

        return {
          message: "company has been updated",
          data: company[0],
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
