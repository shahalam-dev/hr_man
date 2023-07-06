"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tblcompanytypemaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tblcompanytypemaster.init(
    {
      company_type: DataTypes.STRING,
      company_type_value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tblcompanytypemaster",
    }
  );
  return tblcompanytypemaster;
};
