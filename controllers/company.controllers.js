const fromServices = require("../services/company").companyServices;
const { validationResult } = require("express-validator");
const createError = require("http-errors");
const { tryCatch } = require("../utils/tryCatch");
const { logger } = require("../utils/logger");

exports.createCompany = (req, res, next) => {
  const run = async () => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = errors.mapped();
        return next(createError.NotAcceptable(err));
      } else {
        const result = await (
          await fromServices.CreateCompany(req, res, next)
        ).execute();
        res.status(201).json({
          message: result.message,
          data: result.data,
        });
      }
    } catch (error) {
      logger.log("error", {
        message: error.message,
        errorStack: error.stack,
      });
      return next(createError.InternalServerError());
    }
  };
  run();
};

exports.readCompany = (req, res, next) => {
  const run = async () => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = errors.mapped();
        return next(createError.NotAcceptable(err));
      } else {
        const result = await (
          await fromServices.ReadCompany(req, res, next)
        ).execute();

        res.status(200).json({
          message: result.message,
          data: result.data,
        });
      }
    } catch (error) {
      logger.log("error", {
        message: error.message,
        errorStack: error.stack,
      });
      return next(createError.InternalServerError());
    }
  };
  run();
};

exports.updateCompany = (req, res, next) => {
  const run = async () => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = errors.mapped();
        return next(createError.NotAcceptable(err));
      } else {
        const result = await (
          await fromServices.UpdateCompany(req, res, next)
        ).execute();

        res.status(200).json({
          message: result.message,
          data: result.data,
        });
      }
    } catch (error) {
      logger.log("error", {
        message: error.message,
        errorStack: error.stack,
      });
      return next(createError.InternalServerError());
    }
  };
  run();
};

exports.deleteCompany = (req, res, next) => {
  const run = async () => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = errors.mapped();
        return next(createError.NotAcceptable(err));
      } else {
        const result = await (
          await fromServices.DeleteCompany(req, res, next)
        ).execute();

        res.status(202).json({
          message: result.message,
          data: result.data,
        });
      }
    } catch (error) {
      logger.log("error", {
        message: error.message,
        errorStack: error.stack,
      });
      return next(createError.InternalServerError());
    }
  };
  run();
};

exports.fetchCompanies = (req, res, next) => {
  const run = async () => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = errors.mapped();
        return next(createError.NotAcceptable(err));
      } else {
        const result = await (
          await fromServices.FetchCompanies(req, res, next)
        ).execute();

        res.status(200).json({
          message: result.message,
          data: result.data,
        });
      }
    } catch (error) {
      logger.log("error", {
        message: error.message,
        errorStack: error.stack,
      });
      return next(createError.InternalServerError());
    }
  };
  run();
};

exports.fetchCompanyTypes = (req, res, next) => {
  const run = async () => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = errors.mapped();
        return next(createError.NotAcceptable(err));
      } else {
        const result = await (
          await fromServices.FetchCompanyTypes(req, res, next)
        ).execute();

        res.status(200).json({
          message: result.message,
          data: result.data,
        });
      }
    } catch (error) {
      logger.log("error", {
        message: error.message,
        errorStack: error.stack,
      });
      return next(createError.InternalServerError());
    }
  };
  run();
};
