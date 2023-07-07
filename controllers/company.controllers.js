const fromServices = require("../services/company").companyServices;
const { tryCatch } = require("../utils/tryCatch");
const { validate } = require("../utils/validate");

exports.createCompany = async (req, res, next) => {
  await tryCatch(async () => {
    validate(req, next);

    const result = await (
      await fromServices.CreateCompany(req, res, next)
    ).execute();

    res.status(201).json({
      message: result.message,
      data: result.data,
    });
  }, next);
};

exports.readCompany = async (req, res, next) => {
  await tryCatch(async () => {
    validate(req, next);

    const result = await (
      await fromServices.ReadCompany(req, res, next)
    ).execute();

    res.status(200).json({
      message: result.message,
      data: result.data,
    });
  }, next);
};

exports.updateCompany = async (req, res, next) => {
  await tryCatch(async () => {
    validate(req, next);
    const result = await (
      await fromServices.UpdateCompany(req, res, next)
    ).execute();

    res.status(200).json({
      message: result.message,
      data: result.data,
    });
  }, next);
};

exports.deleteCompany = async (req, res, next) => {
  await tryCatch(async () => {
    validate(req, next);
    const result = await (
      await fromServices.DeleteCompany(req, res, next)
    ).execute();

    res.status(202).json({
      message: result.message,
      data: result.data,
    });
  }, next);
};

exports.fetchCompanies = async (req, res, next) => {
  await tryCatch(async () => {
    validate(req, next);
    const result = await (
      await fromServices.FetchCompanies(req, res, next)
    ).execute();

    res.status(200).json({
      message: result.message,
      data: result.data,
    });
  }, next);
};

exports.fetchCompanyTypes = async (req, res, next) => {
  await tryCatch(async () => {
    validate(req, next);
    const result = await (
      await fromServices.FetchCompanyTypes(req, res, next)
    ).execute();

    res.status(200).json({
      message: result.message,
      data: result.data,
    });
  }, next);
};

exports.addCompanyTypes = async (req, res, next) => {
  await tryCatch(async () => {
    // validate(req, next);
    const result = await (
      await fromServices.AddCompanyTypes(req, res, next)
    ).execute();

    res.status(200).json({
      message: result.message,
      data: result.data,
    });
  }, next);
};
