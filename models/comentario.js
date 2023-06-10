'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentario extends Model {
  };
  Comentario.init({
    texto: DataTypes.STRING,
    autor: DataTypes.STRING,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comentario',
  });
  return Comentario;
};