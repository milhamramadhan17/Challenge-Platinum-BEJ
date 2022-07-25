'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.addColumn('Customers', 'Photo', { type: Sequelize.STRING });

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('Customers', 'image');
     
  }
};
