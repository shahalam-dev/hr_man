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
const { auth } = require("../../middlewares/auth.middleware");

router.post(
  "/create_company",
  auth,
  validator.validate("create-company"),
  createCompany
);

router.post(
  "/update_company/:id",
  auth,
  validator.validate("update-company"),
  updateCompany
);

router.get(
  "/read_company/:id",
  auth,
  validator.validate("read-company"),
  readCompany
);

router.delete(
  "/delete_company/:id",
  auth,
  validator.validate("delete-company"),
  deleteCompany
);

router.get(
  "/fetch_companies/:id",
  auth,
  validator.validate("fetch-companies"),
  fetchCompanies
);

router.get(
  "/fetch_company_types",
  auth,
  validator.validate("fetch-company-types"),
  fetchCompanyTypes
);

router.post(
  "/add_company_types",
  auth,
  validator.validate("fetch-company-types"),
  addCompanyTypes
);

module.exports = router;
