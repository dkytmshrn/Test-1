'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Debtors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      obligationNumber: {
        allowNull: false,
        unique:true,
        type: Sequelize.STRING
      },
      policeNumber: {
        allowNull: false,
        unique:true,
        type: Sequelize.STRING
      },
      owner: {
        allowNull: false,
        type: Sequelize.STRING
      },
      participant: {
        allowNull: false,
        type: Sequelize.STRING
      },
      virtualNumber: {
        unique:true,
        type: Sequelize.STRING
      },
      formedPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      adminFee: {
        type: Sequelize.INTEGER
      },
      tax: {
        type: Sequelize.INTEGER
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      auctionDate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dueDate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      paidDate: {
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
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
    await queryInterface.dropTable('debtors');
  }
};