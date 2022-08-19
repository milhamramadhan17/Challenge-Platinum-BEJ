'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('connectors', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      item_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Items',
          key: 'id'
        }
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
    await queryInterface.dropTable('connectors');
  }
};