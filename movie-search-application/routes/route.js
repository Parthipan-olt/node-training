const express = require('express');

const router = express.Router();
const movieResults = require('../api/controller/GetMovies');

router.get('/', movieResults.loadIndex);
router.post('/get-movie-results/:title/:page', movieResults.movieData);

router.use('/genre/:id/:page', movieResults.searchGenre);
router.get('/details', movieResults.redirectToDetails);

module.exports = router;
