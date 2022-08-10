'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    static associate(models) {
      Items.belongsTo(models.Orders, {foreignKey: 'id'})
      Items.hasOne(models.Orders, {
        foreignKey: 'item_id',
        as        : 'Orders'
      });
      Items.hasMany(models.Image, {
        foreignKey: 'item_id',
        as        : 'Image'
      })
    }
  }
  Items.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    store_name: DataTypes.STRING,
    category: DataTypes.STRING,
    brand: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Items',
  });


  return Items;
};