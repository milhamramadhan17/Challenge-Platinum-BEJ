'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsTo(models.Items, {foreignKey: 'item_id'})
      Orders.hasOne(models.Items, {
        foreignKey: 'id',
        as        : 'Items'
        });
      
      Orders.belongsTo(models.Customers, {foreignKey: 'customer_id'})
      Orders.hasOne(models.Customers, {
        foreignKey: 'id',
        as        : 'Customers'
        });
    }
  }
  Orders.init({
    customer_id   : DataTypes.INTEGER,
    item_id       : DataTypes.INTEGER,
    qty           : DataTypes.INTEGER,
    amount        : DataTypes.INTEGER,
    status        : DataTypes.STRING,
    payment_method: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};