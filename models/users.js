'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Posts, {
        foreignKey: 'author',
        sourceKey: 'username',// utiliza la columna name para comparar con posts.author
        as: 'posts',
      });
    }
  }
  Users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    surnames: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};