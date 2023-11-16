const services = require('../services/services');

const addReview = async (req, res) => {
  try {
    const {
      movieId,
    } = req.query;
    const {
      review,
    } = req.body;
    await services.addReviewToMovie(movieId, review);
    res.redirect(`/details?movieId=${movieId}`);
  } catch (error) {
    res.render('error', {
      error,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const {
      movieId,
      reviewId,
    } = req.query;
    await services.deleteReview(reviewId);
    res.redirect(`/details?movieId=${movieId}`);
  } catch (error) {
    res.render('error', {
      error,
    });
  }
};

module.exports = {
  addReview,
  deleteReview,
};
