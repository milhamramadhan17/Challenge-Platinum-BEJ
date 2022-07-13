'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.customer, {
        foreignKey: 'user_id',
        as: 'user'
      });
    };
  }
  user.init({
    name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    Telepon: DataTypes.INTEGER,
    Address: DataTypes.STRING,
    Updated_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
