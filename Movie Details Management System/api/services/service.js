const {
  sequelize,
} = require('../../config/db');
const {
  Movie,
} = require('../../models/movie_details');
const {
  Review,
} = require('../../models/review_details');

Review.belongsTo(Movie, {
  foreignKey: 'movie_id',
});
Movie.hasMany(Review, {
  foreignKey: 'movie_id',
});

// Get all Records
async function retrieveAllRecords() {
  return new Promise((resolve, reject) => {
    Movie.findAll({
      attributes: [
        'movie_id', 'title', 'release_date', 'director', 'language', 'description', 'genre', 'runtime',
        [sequelize.literal('(SELECT COUNT(movie_id) FROM movie_reviews WHERE movie_reviews.movie_id = Movie.movie_id)'), 'review_count'],
      ],
      include: [{
        model: Review,
        where: Movie.movie_id = Review.movie_id,
        group: ['movie_details.movie_id'],
      }],
      order: [
        ['release_date', 'DESC'],
      ],
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Add Movie
async function addMovie(input) {
  return new Promise((resolve, reject) => {
    Movie.create({
      title: input.title,
      description: input.description,
      director: input.director,
      release_date: input.releaseDate,
      language: input.language,
      genre: input.genre,
      runtime: input.runtime,
    })

      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Delete Movie
async function deleteMovie(movieID) {
  return new Promise((resolve, reject) => {
    Movie.destroy({
      where: {
        movie_id: movieID,
      },
    }).then((response) => {
      resolve(response);
    })
      .catch((error) => {
        reject(error);
      });
  });
}

// Get movie details by movie Id - primary key
async function getDetailsToEdit(movieID) {
  return new Promise((resolve, reject) => {
    Movie.findByPk(movieID)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Update movie
async function updateMovie(movieID, input) {
  return new Promise((resolve, reject) => {
    Movie.update({
      title: input.title,
      description: input.description,
      director: input.director,
      release_date: input.releaseDate,
      language: input.language,
      genre: input.genre,
      runtime: input.runtime,
    }, {
      where: {
        movie_id: movieID,
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Get movie Details - review count included
async function getMovieDetails(movieID) {
  return new Promise((resolve, reject) => {
    Movie.findOne({
      attributes: [
        'movie_id', 'title', 'release_date', 'director', 'language', 'description', 'genre', 'runtime',
        [sequelize.literal('(SELECT COUNT(movie_id) FROM movie_reviews WHERE movie_reviews.movie_id = Movie.movie_id)'), 'review_count'],
      ],
      where: {
        movie_id: movieID,
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function addReviewToMovie(movieID, reviews) {
  return new Promise((resolve, reject) => {
    Review.create({
      review: reviews,
      movie_id: movieID,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
async function deleteReview(reviewId) {
  return new Promise((resolve, reject) => {
    Review.destroy({
      where: {
        review_id: reviewId,
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
async function getReviews(movieID) {
  return new Promise((resolve, reject) => {
    Review.findAll({
      where: {
        movie_id: movieID,
      },
    }).then((response) => {
      resolve(response);
    })
      .catch((error) => {
        reject(error);
      });
  });
}
module.exports = {
  retrieveAllRecords,
  addMovie,
  deleteMovie,
  getDetailsToEdit,
  updateMovie,
  getMovieDetails,
  addReviewToMovie,
  deleteReview,
  getReviews,
};
