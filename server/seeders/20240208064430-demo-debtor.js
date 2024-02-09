'use strict';

const debtor = require ('../database/debtor.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = debtor.map((el) => {
      el.createdAt = el.updatedAt = new Date ()
      return el
    })
    await queryInterface.bulkInsert('Debtors', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Debtors', null)
  }
};
