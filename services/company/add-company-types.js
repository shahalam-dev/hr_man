const { v4: uuidv4 } = require("uuid");
const models = require("../../database/models").models;
const createError = require("http-errors");
const { logger } = require("../../utils/logger");

exports.addCompanyTypes = async (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        const { company_types } = req.body;

        let companyTypeData = [];
        company_types.map((type) => {
          const typeData = {
            id: uuidv4(),
            company_type: type.company_type,
            company_type_value: type.company_type_value,
          };
          companyTypeData.push(typeData);
        });

        const companyTypes = await models.CompanyType.bulkCreate(
          companyTypeData
        );

        return {
          message: "company types been added successfully",
          data: companyTypes,
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
