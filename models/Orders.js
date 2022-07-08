'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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