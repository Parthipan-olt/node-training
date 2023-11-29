const {
  DataTypes,
} = require('sequelize');

const {
  sequelize,
} = require('../config/db');

// review-model.js
const {
  Movie,
} = require('./movie_details');

const Review = sequelize.define('Review', {
  review_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Movie,
      key: 'movie_id',
    },
    index: true,
  },
  review: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
}, {
  tableName: 'movie_reviews',
  timestamps: false,
});



module.exports = {
  Review,
};
