const services = require('../services/services');





const addReview = async (req, res) => {
  try {
    const {
      movieId,
    } = req.params;

    const schema = Joi.object({
      review: Joi.string().required(),
    }).options({
      allowUnknown: true
    });
    const {
      error
    } = schema.validate(req.body);
    if (error) {
      throw new Error('kjn')
    }
    const {
      review,
    } = req.body;

    await services.addReviewToMovie(movieId, review);
    res.redirect(`/${movieId}/details`);
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
    } = req.params;

    console.log(movieId, reviewId)
    await services.deleteReview(reviewId);
    res.redirect(`/${movieId}/details`);
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