const { v4: uuidv4 } = require("uuid");
const models = require("../../database/models").models;
const createError = require("http-errors");
const { logger } = require("../../utils/logger");

exports.createCompany = async (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        const {
          company_type,
          company_type_ref,
          legal_name,
          trading_name,
          abn,
          acn,
          arbn,
          other_license_number,
          shareholding_structure,
          incorporation_number,
          created_by,
        } = req.body;

        const companyData = {
          id: uuidv4(),
          company_type,
          company_type_ref,
          legal_name,
          trading_name,
          abn,
          acn,
          arbn,
          other_license_number,
          shareholding_structure,
          incorporation_number,
          created_by,
        };

        const company = await models.Company.create(companyData);

        return {
          message: "company has been created",
          data: company,
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
