'use strict';
const uuid = require('uuid');
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class connectors extends Model {
    static associate(models) {
      connectors.belongsTo(models.Items, {foreignKey: 'item_id',});
      connectors.hasMany(models.Orders, {
        foreignKey: 'item_id',
        as        : 'Orders'
      })


    }
  }
  connectors.init({
    item_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'connectors',
  });
  connectors.addHook('beforeCreate', (connector, options) => {
    try {
      connector.id = uuid.v4();
    } catch (err) {
      throw err;
    }
  });
  return connectors;
};