const express = require("express");
const router = express.Router();
const validator = require("../../validator/validator");

const {
  createCompany,
  updateCompany,
  readCompany,
  deleteCompany,
  fetchCompanies,
  fetchCompanyTypes,
  addCompanyTypes,
} = require("../../controllers/company.controllers");

router.post(
  "/create_company",
  validator.validate("create-company"),
  createCompany
);

router.post(
  "/update_company/:id",
  validator.validate("update-company"),
  updateCompany
);

router.get(
  "/read_company/:id",
  validator.validate("read-company"),
  readCompany
);

router.delete(
  "/delete_company/:id",
  validator.validate("delete-company"),
  deleteCompany
);

router.get(
  "/fetch_companies/:id",
  validator.validate("fetch-companies"),
  fetchCompanies
);

router.get(
  "/fetch_company_types",
  // validator.validate("fetch-company-types"),
  fetchCompanyTypes
);

router.post(
  "/add_company_types",
  // validator.validate("fetch-company-types"),
  addCompanyTypes
);

module.exports = router;
