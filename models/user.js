'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  };
  User.init({
    username: DataTypes.STRING,
    namr: DataTypes.STRING,
    surnames: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};