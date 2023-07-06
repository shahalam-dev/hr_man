"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tblcompanymasts", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      company_type: {
        type: Sequelize.STRING,
      },
      company_type_ref: {
        type: Sequelize.UUID,
      },
      legal_name: {
        type: Sequelize.STRING,
      },
      trading_name: {
        type: Sequelize.STRING,
      },
      abn: {
        type: Sequelize.STRING,
      },
      acn: {
        type: Sequelize.STRING,
      },
      arbn: {
        type: Sequelize.STRING,
      },
      other_license_number: {
        type: Sequelize.STRING,
      },
      shareholding_structure: {
        type: Sequelize.INTEGER,
      },
      incorporation_number: {
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tblcompanymasts");
  },
};
