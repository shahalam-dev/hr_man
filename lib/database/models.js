const connection = require("./connection");
const db = connection.db;

exports.models = {
  Auth: db.Auth,
};
