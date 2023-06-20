"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Posts, {
        foreignKey: 'category',
        sourceKey: 'name', // utiliza la columna name para comparar con posts.category
        as: 'posts',
      });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
