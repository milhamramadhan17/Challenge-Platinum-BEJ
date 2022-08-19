'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    static associate(models) {
      Items.belongsTo(models.connectors, {foreignKey: 'id'})
      Items.hasOne(models.connector, {
        foreignKey: 'item_id',
        as        : 'connectors'
      });
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