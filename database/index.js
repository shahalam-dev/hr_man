const { logger } = require("../utils/logger");
const connection = require("./connection");

const db = connection.db;
const operators = connection.operators;

const models = require("./models").models;

module.exports.database = {
  connectionTest: () => {
    console.log("start connecting to database");
    db.sequelize
      .authenticate()
      .then(() => {
        console.log("database connected");
        return true;
      })
      .catch((err) => {
        logger.error(err);
        return false;
      });
  },
  sequelize: connection.sequelize,
  operators,
  models,
};
