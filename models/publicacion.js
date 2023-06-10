'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publicacion extends Model {
  };
  Publicacion.init({
    titutlo: DataTypes.STRING,
    fecha: DataTypes.DATE,
    imagen: DataTypes.BLOB,
    texto: DataTypes.STRING,
    autor: DataTypes.STRING,
    categoria: DataTypes.STRING,
    numComentarios: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Publicacion',
  });
  return Publicacion;
};