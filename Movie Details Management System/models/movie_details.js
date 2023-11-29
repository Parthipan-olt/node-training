const {
  DataTypes,
} = require('sequelize');

const {
  sequelize,
} = require('../config/db');

const {
  Review,
} = require('./review-model');

const Movie = sequelize.define('Movie', {
  movie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  release_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  runtime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'movie_details',
  timestamps: false,
});

Movie.sync();



module.exports = {
  Movie,
  sequelize,
};