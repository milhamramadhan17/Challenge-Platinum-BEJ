'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Admin', [{
      id: 'b9f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'bambang',
      role: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Admin', null, {});
  }
};
