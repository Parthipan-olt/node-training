const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    director: Joi.string().required(),
    releaseDate: Joi.string().required(),
    language: Joi.string().required(),
    genre: Joi.string().required(),
    runtime: Joi.string().required(),
}).options({
    allowUnknown: true,
});

async function validateForm(body) {
    try {
        const response = await schema.validateAsync(body);
        return response;
    } catch (error) {
        return { error: error };
    }
}


module.exports = {
    validateForm
}