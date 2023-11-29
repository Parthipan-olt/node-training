const express = require('express');
const router = express.Router();
const MovieController = require('../api/controller/MovieController');
const ReviewController = require('../api/controller/ReviewController')

// '/' Route
router.get('/', MovieController.loadIndexPage);

// // Add movie view
router.get('/add-movie', MovieController.loadAddMoviePage);

router.post('/add-movie', MovieController.addNewMovie);

// // delete record
router.get('/:movieid/delete-movie', MovieController.deleteMovie);

// // populate form
router.get('/:movieid/edit', MovieController.loadEditMoviePage);

// // submit edited details
router.post('/:movieid/update', MovieController.submitEditedData);

// // add review
router.post('/:movieid/add-review', ReviewController.addNewReview);

// // view details
router.get('/:movieid/details', MovieController.viewDetails);

// // delete review
router.get('/:reviewId/:movieId/delete-review', ReviewController.deleteReview);


module.exports = router;