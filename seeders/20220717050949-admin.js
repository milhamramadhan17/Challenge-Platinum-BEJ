'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Sellers', [{
      id: 'b9f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
      name: 'John Doe',
      email: 'doe@gmail.com',
      password: 'doe12',
      role: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Sellers', null, {});
  }
};
