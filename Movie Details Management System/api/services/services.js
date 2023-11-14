const db = require('../../models/model');

// Add new movie record - input:user input
async function addMovie(input) {
  return db.addRecord(input);
}

// Retrieve all movies
async function retrieveAllRecords() {
  return db.fetchAllRecords();
}

// Delete a record by movie ID
async function deleteMovie(movieId) {
  return db.deleteRecord(movieId);
}

// Retrieve the details of the selected movie for the form
async function getDetailsToEdit(movieId) {
  return db.retrieveDetailsToEdit(movieId);
}

// update movie details with user input and movie ID
async function updateMovie(input, movieId) {
  return db.updateRecord(input, movieId);
}

// Get all details of the movie - user input and reviews
async function getMovieDetails(movieId) {
  return db.fetchSelectedMovie(movieId);
}

// Add a review
async function addReviewToMovie(movieId, review) {
  return db.addReview(movieId, review);
}
// delete a review
async function deleteReview(reviewId) {
  return db.deleteReview(reviewId);
}

module.exports = {
  addMovie,
  retrieveAllRecords,
  deleteMovie,
  getDetailsToEdit,
  updateMovie,
  getMovieDetails,
  addReviewToMovie,
  deleteReview,
};
