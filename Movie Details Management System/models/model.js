const db = require('../config/db');

// Function to wrap MySQL query in a Promise
const queryPromise = (sql, values) => new Promise((resolve, reject) => {
  db.con.query(sql, values, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});

// Add a movie(user input) to the table - movie details
const addRecord = (input) => {
  const sql = 'INSERT INTO movie_details(title, description, director, release_date, language, genre, runtime) VALUES (?,?,?,?,?,?,?)';
  const values = [input.title, input.description, input.director, input.releaseDate,
    input.language, input.genre, input.runtime,
  ];
  return queryPromise(sql, values);
};

// Fetch all records from table movie_details and calculate the review count for a movie
const fetchAllRecords = () => {
  const sql = 'SELECT *, movie_details.movie_id, DATE_FORMAT(movie_details.release_date, "%Y-%m-%d") AS new_date,'
    + 'COUNT(movie_reviews.movie_id) AS review_count FROM movie_details LEFT JOIN movie_reviews ON movie_details.movie_id = movie_reviews.movie_id GROUP BY movie_details.movie_id;';
  return queryPromise(sql);
};

//  delete a record + reviews by movie ID
const deleteRecord = (movieId) => {
  const sql = 'DELETE movie_details, movie_reviews FROM movie_details LEFT JOIN movie_reviews ON movie_details.movie_id = movie_reviews.movie_id WHERE movie_details.movie_id = ?';
  const values = [movieId];
  return queryPromise(sql, values);
};

// Retrieve data and the date in specified format from table movie_details by movieID
const retrieveDetailsToEdit = (movieId) => {
  const sql = 'SELECT *, DATE_FORMAT(release_date, "%Y-%m-%d") AS new_date FROM movie_details WHERE movie_id = ?';
  const values = [movieId];
  return queryPromise(sql, values);
};

// update the record by movie id with user input
const updateRecord = (input, movieId) => {
  const sql = 'UPDATE movie_details SET title=?, description=?, director=?, release_date=?, language=?, genre=?, runtime=? WHERE movie_id=?';
  const values = [input.title, input.description, input.director, input.releaseDate,
    input.language, input.genre, input.runtime, movieId,
  ];
  return queryPromise(sql, values);
};

// Retrieve all records with a specified movieID and their reviews from the movie_review table
const fetchSelectedMovie = (movieId) => {
  const sql = 'SELECT movie_details.*, DATE_FORMAT(movie_details.release_date, "%Y-%m-%d") AS new_date, '
    + 'movie_reviews.review_id, movie_reviews.review, COUNT(movie_reviews.review_id) OVER () AS review_count '
    + 'FROM movie_details '
    + 'LEFT JOIN movie_reviews ON movie_details.movie_id = movie_reviews.movie_id '
    + 'WHERE movie_details.movie_id = ?;';
  const values = [movieId];

  return queryPromise(sql, values).then((result) => {
    const response = {
      movieDetails: result[0],
      reviews: result.map((row) => ({
        review_id: row.review_id,
        review: row.review,
      })),
    };
    return response;
  });
};

// add review for the movie with specified movie ID
const addReview = (movieId, review) => {
  const sql = 'INSERT INTO movie_reviews (movie_id,review) VALUES (?,?)';
  const values = [movieId, review];
  return queryPromise(sql, values);
};

// delete review with the specified review ID
const deleteReview = (reviewId) => {
  const sql = 'DELETE FROM movie_reviews WHERE review_id=?';
  const values = [reviewId];
  return queryPromise(sql, values);
};

module.exports = {
  addRecord,
  fetchAllRecords,
  deleteRecord,
  retrieveDetailsToEdit,
  updateRecord,
  fetchSelectedMovie,
  addReview,
  deleteReview,
};
