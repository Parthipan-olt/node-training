const {
  Sequelize
} = require('sequelize');

// Replace the connection details with your actual database configuration
const sequelize = new Sequelize('movie_management', 'root', 'oltdev123#', {
  host: 'localhost',
  dialect: 'mysql',
});

exports.sequelize = sequelize;
module.exports = Sequelize;