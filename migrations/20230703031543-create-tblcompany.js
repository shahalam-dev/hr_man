'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tblcompanies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_type: {
        type: Sequelize.STRING
      },
      legal_name: {
        type: Sequelize.STRING
      },
      trading_name: {
        type: Sequelize.STRING
      },
      abn: {
        type: Sequelize.STRING
      },
      acn: {
        type: Sequelize.STRING
      },
      arbn: {
        type: Sequelize.STRING
      },
      shareholding_structure: {
        type: Sequelize.NUMBER
      },
      incorporation_number: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tblcompanies');
  }
};