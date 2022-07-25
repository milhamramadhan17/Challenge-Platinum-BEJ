'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.removeColumn('Customers', 'image', { type: Sequelize.STRING });
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
