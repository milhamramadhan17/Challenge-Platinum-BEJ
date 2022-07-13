'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Customer.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'user'
      });
    };
  }
  customer.init({
    user_id: DataTypes.INTEGER,
    updated_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customer',
  });
  return customer;
};
