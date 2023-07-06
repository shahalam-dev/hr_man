"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tblauthmaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tblauthmaster.init(
    {
      full_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      verified: DataTypes.STRING,
      account_status: DataTypes.STRING,
      role: DataTypes.INTEGER,
      token: DataTypes.STRING,
      profile_ref: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "tblauthmaster",
    }
  );
  return tblauthmaster;
};
