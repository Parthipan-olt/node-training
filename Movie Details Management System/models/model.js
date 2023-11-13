const db = require('../config/db');

const addRecord = (formData) => new Promise((resolve, reject) => {
  db.con.query(
    'INSERT INTO movie_details(title,description,director,release_date,language,genre,runtime) VALUES (?,?,?,?,?,?,?)',
    [formData.title, formData.description, formData.director,
      formData.releaseDate, formData.language, formData.genre, formData.runtime,
    ],

    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    },
  );
});

const fetchRecord = () => new Promise((resolve, reject) => {
  db.con.query(
    'SELECT movie_details.*, COUNT(movie_reviews.movie_id) AS review_count FROM movie_details '
    + 'LEFT JOIN movie_reviews ON movie_details.movie_id = movie_reviews.movie_id GROUP BY movie_details.movie_id',
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    },
  );
});

const deleteRecord = (movieId) => new Promise((resolve, reject) => {
  db.con.query('DELETE FROM movie_details WHERE movie_id = ?', [movieId], (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});

const selectedMovieDetails = (movieId) => new Promise((resolve, reject) => {
  db.con.query('SELECT *, DATE_FORMAT(release_date, "%Y-%m-%d") AS new_date FROM movie_details WHERE movie_id = ?', [movieId], (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});

const updateRecord = (formData, movieId) => new Promise((resolve, reject) => {
  console.log(formData);
  db.con.query(
    'UPDATE movie_details SET title=?, description=?, director=?, release_date=?, language=?, genre=?, runtime=? WHERE movie_id=?',
    [formData.title, formData.description, formData.director, formData.releaseDate,
      formData.language, formData.genre, formData.runtime, movieId,
    ],

    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    },
  );
});

const fetchSelectedMovie = (movieId) => new Promise((resolve, reject) => {
  db.con.query(
    'SELECT movie_details.*, COUNT(movie_reviews.review_id) AS review_count ' +
    'FROM movie_details ' +
    'LEFT JOIN movie_reviews ON movie_details.movie_id = movie_reviews.movie_id ' +
    'WHERE movie_details.movie_id = ? ' +
    'GROUP BY movie_details.movie_id;',
    [movieId],
    (error, result) => {
      if (error) {
        reject(error);
        console.log(error);
      } else {
        const response = {
          movieDetails: result[0], // Assuming movie details are the same for all rows
          reviews: result.map((row) => ({
            review_id: row.review_id,
            review: row.review,
          })),
        };
        resolve(response);
      }
    }
  );
});


const addReview = (movieId, review) => new Promise((resolve, reject) => {
  db.con.query(
    'INSERT INTO movie_reviews (movie_id,review) VALUES (?,?);',
    [movieId, review],

    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    },
  );
});

const deleteReview = (reviewId) => new Promise((resolve, reject) => {
  db.con.query(
    'DELETE FROM movie_reviews WHERE review_id=?',
    [reviewId],

    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    },
  );
});

module.exports = {
  addRecord,
  fetchRecord,
  deleteRecord,
  selectedMovieDetails,
  updateRecord,
  fetchSelectedMovie,
  addReview,
  deleteReview,
};
