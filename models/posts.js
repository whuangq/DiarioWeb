'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.hasMany(models.Comment, {
        foreignKey: 'postId',
      });
      Posts.belongsTo(models.Users, {
        foreignKey: 'author',
      });
    }
  }
  Posts.init({
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    image: DataTypes.BLOB,
    text: DataTypes.STRING (8192),
    author: DataTypes.STRING,
    category: DataTypes.STRING,
    numComments: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};