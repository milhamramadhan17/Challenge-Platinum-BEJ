'use strict';
const uuid = require('uuid');
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Sellers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sellers.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sellers',
  });

  Sellers.addHook('beforeCreate', (seller, options) => {
    try {
      seller.id = uuid.v4();
      seller.password = hash(seller.password);
    } 
    catch (err) {
      throw err;
    }
  }
  );
  
  return Sellers;
};