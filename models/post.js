'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
  };
  Post.init({
    tittle: DataTypes.STRING,
    date: DataTypes.DATE,
    image: DataTypes.BLOB,
    text: DataTypes.STRING,
    author: DataTypes.STRING,
    category: DataTypes.STRING,
    numComments: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};