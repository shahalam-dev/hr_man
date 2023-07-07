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

        const data = {
          legal_name,
          trading_name,
          abn,
          acn,
          arbn,
          other_license_number,
          shareholding_structure,
          incorporation_number,
        };

        const companyData = Object.fromEntries(
          Object.entries(data).filter(([_, v]) => v != null)
        );

        const company = await models.Company.update(companyData, {
          where: { id: id },
        });

        return {
          message:
            company[0] === 1
              ? "company has been updated"
              : "provided company id is invalid",
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
