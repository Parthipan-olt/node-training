const express = require('express');

const router = express.Router();
const controller = require('../api/controller/controller');

// '/' Route
router.get('/', controller.handleRootPage);

// Add movie Route
router.get('/add-movie',controller.handleAddMoviePage)
router.post('/add-movie', controller.handleAddMovie);

// delete record
router.get('/delete-row', controller.handleMovieDelete);

// populate form
router.get('/edit', controller.loadDetailsToEdit);
// submit edited details
router.post('/edit-movie-details', controller.handleMovieUpdate);

// view details
router.get('/details', controller.handleRetrieveMovieDetails);

// add review
router.post('/add-review', controller.handleAddReview);

// delete review
router.get('/delete-review', controller.handleDeleteReview);

module.exports = router;
