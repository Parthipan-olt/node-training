const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().trim().max(100).required(),
  description: Joi.string().trim().max(100).required(),
  director: Joi.string().trim().max(100).required(),
  releaseDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required(),
  language: Joi.string().trim().max(20).required(),
  genre: Joi.string().valid('Action', 'Drama', 'Romance', 'Horror', 'Crime').required(),
  runtime: Joi.number().integer().min(0).max(99999)
    .required(),
}).options({
  allowUnknown: true,
});

const reviewSchema = Joi.object({
  review: Joi.string().trim().max(200).required(),
}).options({
  allowUnknown: true,
});


async function validateForm(body) {
  try {
    const response = await schema.validateAsync(body);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
}


async function validateReview(body) {
  try {
    const response = await reviewSchema.validateAsync(body);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
}

module.exports = {
  validateForm,
  validateReview 
};