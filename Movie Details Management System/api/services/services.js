const {
  sequelize,
} = require('../../config/db');
const {
  Movie,
} = require('../../models/movie-model');
const {
  Review,
} = require('../../models/review-model');

// Your application logic using Movie, Review, and sequelize

Review.belongsTo(Movie, {
  foreignKey: 'movie_id',
});
Movie.hasMany(Review, {
  foreignKey: 'movie_id',
});

// Add new movie record - input:user input
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
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

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

// Delete a record by movie ID
async function deleteMovie(movieId) {
  return new Promise((resolve, reject) => {
    Movie.destroy({
      where: {
        movie_id: movieId,
      },
    }).then((response) => {
      resolve(response);
    })
      .catch((error) => {
        reject(error);
      });
  });
}

// Retrieve the details of the selected movie for the form
async function getDetailsToEdit(movieId) {
  return new Promise((resolve, reject) => {
    Movie.findByPk(movieId)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// update movie details with user input and movie ID
async function updateMovie(input, movieId) {
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
        movie_id: movieId,
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

// Get all details of the movie - user input and reviews
async function getMovieDetails(movieId) {
  return new Promise((resolve, reject) => {
    Movie.findOne({
      attributes: [
        'movie_id', 'title', 'release_date', 'director', 'language', 'description', 'genre', 'runtime',
        [sequelize.literal('(SELECT COUNT(movie_id) FROM movie_reviews WHERE movie_reviews.movie_id = Movie.movie_id)'), 'review_count'],
      ],
      where: {
        movie_id: movieId,
      },
      include: [{
        model: Review,
        where: Movie.movie_id = Review.movie_id,

      }],
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Add a review
async function addReviewToMovie(movieId, reviews) {
  return new Promise((resolve, reject) => {
    Review.create({
      review: reviews,
      movie_id: movieId,
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

// export modules
module.exports = {
  addMovie,
  retrieveAllRecords,
  deleteMovie,
  getDetailsToEdit,
  updateMovie,
  getMovieDetails,
  addReviewToMovie,
  deleteReview,
  sequelize,

};
