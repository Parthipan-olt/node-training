const express = require('express');
const router = express.Router();
const MovieController = require('../api/controller/MovieController');
const ReviewController = require('../api/controller/ReviewController')

// '/' Route
router.get('/', MovieController.loadIndexPage);

// // Add movie view
router.get('/add-movie', MovieController.loadAddMoviePage);

router.post('/add-movie', MovieController.addMovie);

// // delete record
router.get('/:movieID/delete-movie', MovieController.deleteMovie);

// // populate form
router.get('/:movieID/edit', MovieController.loadEditMoviePage);

// // submit edited details
router.post('/:movieID/update', MovieController.update);

// // add review
router.post('/:movieID/add-review', ReviewController.addNewReview);

// // view details
router.get('/:movieID/details', MovieController.viewDetails);

// // delete review
router.get('/:movieID/:reviewId/delete-review', ReviewController.deleteReview);


module.exports = router;