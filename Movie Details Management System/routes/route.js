const express = require('express');
const router = express.Router();
const MovieController = require('../api/controller/MovieController');

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
router.post('/:movieID/add-review', MovieController.addReview);

// // view details
router.get('/:movieID/details', MovieController.viewDetails);

// // delete review
router.get('/:movieID/:reviewId/delete-review', MovieController.deleteReview);


module.exports = router;