const fromCreateCompany = require("./create-company");
const fromReadCompany = require("./read-company");
const fromUpdateCompany = require("./update-company");
const fromDeleteCompany = require("./delete-company");
const fromFetchCompanies = require("./fetch-companies");
const fromFetchCompanyTypes = require("./fetch-company-types");
const fromAddCompanyTypes = require("./add-company-types");

exports.companyServices = {
  CreateCompany: fromCreateCompany.createCompany,
  ReadCompany: fromReadCompany.readCompany,
  UpdateCompany: fromUpdateCompany.updateCompany,
  DeleteCompany: fromDeleteCompany.deleteCompany,
  FetchCompanies: fromFetchCompanies.fetchCompanies,
  FetchCompanyTypes: fromFetchCompanyTypes.fetchCompanyTypes,
  AddCompanyTypes: fromAddCompanyTypes.addCompanyTypes,
};
