'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Posts, {
        foreignKey: 'postId',
        onDelete: 'CASCADE'
      });
    }
  }
  Comment.init({
    text: DataTypes.STRING,
    author: DataTypes.STRING,
    date: DataTypes.DATE,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};