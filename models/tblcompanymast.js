"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tblcompanymast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tblcompanymast.init(
    {
      company_type: DataTypes.STRING,
      company_type_ref: DataTypes.UUID,
      legal_name: DataTypes.STRING,
      trading_name: DataTypes.STRING,
      abn: DataTypes.STRING,
      acn: DataTypes.STRING,
      arbn: DataTypes.STRING,
      other_license_number: DataTypes.STRING,
      shareholding_structure: DataTypes.NUMBER,
      incorporation_number: DataTypes.STRING,
      created_by: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "tblcompanymast",
    }
  );
  return tblcompanymast;
};
