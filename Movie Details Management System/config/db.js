const mysql = require('mysql');

const {
  Sequelize,
  Model,
  DataTypes
} = require('sequelize');

const sequelize = new Sequelize('movie_management', 'root', 'oltdev123#', {
  host: 'localhost',
  dialect: 'mysql',
});
sequelize.sync();
module.exports = {
  sequelize,
  Model,
};