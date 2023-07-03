'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tblcompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tblcompany.init({
    company_type: DataTypes.STRING,
    legal_name: DataTypes.STRING,
    trading_name: DataTypes.STRING,
    abn: DataTypes.STRING,
    acn: DataTypes.STRING,
    arbn: DataTypes.STRING,
    shareholding_structure: DataTypes.NUMBER,
    incorporation_number: DataTypes.STRING,
    created_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tblcompany',
  });
  return tblcompany;
};