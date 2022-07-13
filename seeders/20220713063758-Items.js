'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Items', [{
      name: 'Demo Item',
      price: 12345,
      store_name: 'Demo Store',
      category: 'Demo Category',
      brand: 'Demo Brand',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
