const { v4: uuidv4 } = require("uuid");
const models = require("../../database/models").models;
const createError = require("http-errors");
const { logger } = require("../../utils/logger");

exports.addCompanyTypes = async (req, res, next) => {
  return Object.freeze({
    execute: async () => {
      try {
        // const { company_types } = req.body;
        const { company_type, company_type_value } = req.body;
        let companyTypes = {};

        const isExist = await models.CompanyType.findOne({
          where: {
            company_type: company_type,
          },
        });

        if (isExist) {
          return next(createError.Conflict(`"${company_type}" already exist`));
        } else {
          const company_type_data = {
            id: uuidv4(),
            company_type,
            company_type_value,
          };

          companyTypes = await models.CompanyType.create(company_type_data);
        }

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

// {
//   "company_type": "sole-trader",
//   "company_type_value": "Sole Trader"
// },
// {
//   "company_type": "partnership",
//   "company_type_value": "Partnership"
// },
// {
//   "company_type": "shareholding-company",
//   "company_type_value": "Shareholding Company"
// },
// {
//   "company_type": "company-limited-by-guarantee",
//   "company_type_value": "Company Limited By Guarantee"
// },
// {
//   "company_type": "trust",
//   "company_type_value": "Trust"
// },
// {
//   "company_type": "incorporated-association",
//   "company_type_value": "Incorporated Association"
// }
