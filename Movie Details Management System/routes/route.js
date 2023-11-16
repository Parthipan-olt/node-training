const express = require('express');

const router = express.Router();
const MovieController = require('../api/controller/MovieController');
const ReviewController = require('../api/controller/ReviewController');


// '/' Route
router.get('/', MovieController.loadIndexPage);

// // Add movie view
router.get('/add-movie', MovieController.loadAddMoviePage);

router.post('/add-movie', MovieController.addMovie);

// // delete record
router.get('/delete-row', MovieController.deleteMovie);

// // populate form
router.get('/:movieid/edit', MovieController.loadDetailsToEdit);

// // submit edited details
 router.post('/edit-movie-details', MovieController.updateMovie);

// // view details
router.get('/:movieid/details', MovieController.getMovieDetails);

// // add review
 router.post('/add-review', ReviewController.addReview);

// // delete review
 router.get('/delete-review', ReviewController.deleteReview);

module.exports = router;