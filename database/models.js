const connection = require("./connection");
const db = connection.db;

exports.models = {
  Auth: db.tblauthmaster,
  Company: db.tblcompanymast,
  CompanyType: db.tblcompanytypemaster,
};
