const express = require('express');

const router = express.Router();
const MovieController = require('../api/controller/GetMovies'); // Import the MovieController

// Render the index page
router.get('/', MovieController.renderIndexPage);

// Handle the post request to fetch movie data
router.post('/get-movie-results/:title/:page', MovieController.fetchMovieData);

// Get results by Genre
router.use('/genre/:id/:page', MovieController.searchMoviesByGenre);

// Details page for a selected movie
router.get('/details', MovieController.getMovieDetails);

module.exports = router;