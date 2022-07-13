'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    static associate(models) {
      Customers.belongsTo(models.Users, {foreignKey: 'user_id'})
      Customers.hasOne(models.Users, {
        foreignKey: 'id',
        as        : 'Users'
      })

      Customers.belongsTo(models.Orders, { foreignKey: 'id'})
      Customers.hasMany(models.Orders, {
        foreignKey: 'customer_id',
        as        : 'Orders'
      })
    }
  }
  Customers.init({
    user_id: DataTypes.INTEGER
    }, {
    sequelize,
    modelName: 'Customers',
  });
  return Customers;
};
