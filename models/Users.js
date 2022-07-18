'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasOne(models.Customers, {
        foreignKey: 'user_id',
        as        : 'Customers'
      });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telepon: DataTypes.INTEGER,
    Address: DataTypes.STRING
    }, {
    sequelize,
    modelName: 'Users',
  });

  Users.addHook('beforeCreate', (user, options) => {
    try {
      user.id = uuid.v4();
      user.password = hash(user.password);
    } catch (err) {
      throw err;
    }
  });

  return Users;
};
