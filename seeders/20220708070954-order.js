'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Orders', [{
      customer_id: 1,
      item_id: 1,
      qty: 1,
      amount: 100000,
      status: 'pending',
      payment_method: 'cash',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('Orders', null, {});
  }
};
