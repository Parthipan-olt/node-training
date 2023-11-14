const services = require('../services/services');

// Load root
const handleRootPage = async (req, res) => {
  try {
    const records = await services.retrieveAllRecords();
    res.render('index', {
      records,
    });
  } catch (error) { // error
    res.render('error', { error });
  }
};

const handleAddMoviePage = async (req, res) => {
  try {
    res.render('add-movie');
  } catch (error) { // error
    res.render('error', { error });
  }
};

// Add new movie
const handleAddMovie = async (req, res) => {
  try {
    await services.addMovie(req.body);
    res.redirect('/');
  } catch (error) { // error
    res.render('error', { error });
  }
};

// Delete a Movie
const handleMovieDelete = async (req, res) => {
  try {
    const {
      movieId,
    } = req.query;
    await services.deleteMovie(movieId);
    res.redirect(`/?${movieId}`);
  } catch (error) { // error
    res.render('error', { error });
  }
};

// Retrieve details to populate form
const loadDetailsToEdit = async (req, res) => {
  try {
    const {
      movieId,
    } = req.query;
    const record = (await services.getDetailsToEdit(movieId))[0];
    res.render('edit', {
      record,
      movieId,
    });
  } catch (error) { // error
    res.render('error', { error });
  }
};

// Update the movie details
const handleMovieUpdate = async (req, res) => {
  try {
    const formData = req.body;
    const movieID = req.query.movieId;
    await services.updateMovie(formData, movieID);
    res.redirect('/');
  } catch (error) { // error
    res.render('error', { error });
  }
};

// Retrieve movie details and reviews for details page
const handleRetrieveMovieDetails = async (req, res) => {
  try {
    const {
      movieId,
    } = req.query;
    const {
      movieDetails,
      reviews,
    } = await services.getMovieDetails(movieId);
    res.render('details', {
      movieDetails,
      reviews,
    });
  } catch (error) { // error
    res.render('error', { error });
  }
};

// Add review
const handleAddReview = async (req, res) => {
  try {
    const {
      movieId,
    } = req.query;
    const {
      review,
    } = req.body;
    await services.addReviewToMovie(movieId, review);
    res.redirect(`/details?movieId=${movieId}`);
  } catch (error) { // error
    res.render('error', { error });
  }
};

// Delete Review
const handleDeleteReview = async (req, res) => {
  try {
    const {
      movieId,
      reviewId,
    } = req.query;
    await services.deleteReview(reviewId);
    res.redirect(`/details?movieId=${movieId}`);
  } catch (error) { // error
    res.render('error', { error });
  }
};

module.exports = {
  handleRootPage,
  handleAddMovie,
  handleMovieDelete,
  loadDetailsToEdit,
  handleMovieUpdate,
  handleRetrieveMovieDetails,
  handleAddReview,
  handleDeleteReview,
  handleAddMoviePage,
};
