const Joi = require('../services/formValidation');
const service = require('../services/service')


// Load Index Page (listing)
const loadIndexPage = async (req, res) => {
    try {
        const records = await service.retrieveAllRecords();

        if (typeof records === 'undefined') {
            throw new Error;
        }

        // Render index page if returned obj is not undefined
        res.render('index', {
            records
        });
    } catch (error) {
        return res.render('error', {
            error: {
                message: error
            }
        })
    }
}


// Load Add New Movie Page (Form)
const loadAddMoviePage = async (req, res) => {
    try {
        // Render the ejs template
        await res.render('add-movie');
    } catch (error) {
        throw new Error;
    }
}

// Add new movie
const addMovie = async (req, res) => {
    try {
        // Form Data
        const movieData = req.body ? req.body : '';


        // throw an error if the URL parameter movieID is undefined or null
        if (typeof movieData === 'undefined') {
            throw new Error(error)
        }

        // Validate form data
        const validation = await Joi.validateForm(movieData);

        if (validation.error) {
            // If validation fails, return an error response to the client
            const errorMessages = validation.error.details.map(detail => detail.message);

            return res.status(400).json({
                error: 'Validation Error',
                details: errorMessages,
            });
        }

        // If validation is successful, add the movie
        else {
            await service.addMovie(movieData);

            // If success, redirect to home page
            return res.json({
                redirectTo: '/'
            });
        }
    } catch (error) {
        throw new Error;
    }
};


// Load edit page 
const loadEditMoviePage = async (req, res) => {
    try {
        const movieID = req.params.movieID ? req.params.movieID : null;

        const movieDetails = await service.getDetailsToEdit(movieID);

        // validate Response
        if (movieDetails.length < 0) {

            throw new Error;
        }

        // render edit page with the movieDetails
        res.render('edit', {
            record: movieDetails,
            movieID: movieID,
        })
    } catch (error) {
        return res.render('error', {
            error: {
                message: 'An Error Occured!'
            }
        })
    }
}

//
const update = async (req, res) => {
    try {
        const movieID = req.params.movieID ? req.params.movieID : '';

        const movieInput = req.body ? req.body : '';
        const validation = await Joi.validateForm(movieInput);

        if (validation.error) {
            // If validation fails, return an error response to the client
            const errorMessages = validation.error.details.map(detail => detail.message);

            return res.status(400).json({
                error: 'Validation Error',
                details: errorMessages,
            });
        } else {

            await service.updateMovie(movieID, movieInput);
            return res.json({
                redirectTo: '/'
            })
        }
    } catch (error) {
        res.render('error', {
            error: {
                message: 'An Error Occured'
            }
        })
    }
}


const deleteMovie = async (req, res) => {
    try {
        // URL parameter - ID of the movie to Delete
        const movieID = req.params.movieID ? req.params.movieID : '';

        await service.deleteMovie(movieID);

        res.redirect('/');
    } catch (error) {
        res.render('error', {
            error: {
                message: 'An Error Occured!'
            }
        })
    }
}


const viewDetails = async (req, res) => {
    try {
        const movieID = req.params.movieID ? req.params.movieID : '';

        // Details of the movie & reviews
        const movieDetails = await service.getMovieDetails(movieID);
        const reviews = await service.getReviews(movieID)

        // throw an error if the MovieDetails obj is null or undefined
        if (typeof movieDetails === 'undefined' || typeof reviews === 'undefined') {
            throw new Error
        }

        res.render('details', {
            movieDetails,
            reviews: reviews
        })
    } catch (error) {
        res.render('error', {
            error: {
                message: 'Movie Not Found!'
            }
        })
    }
}

const addNewReview = async (req, res) => {
    try {
        const movieID = req.params.movieID ? req.params.movieID : '';
        const reviewInput = req.body ? req.body : '';
        const validation = await Joi.validateReview(reviewInput);

        if (validation.error) {
            // If validation fails, return an error response to the client
            const errorMessages = validation.error.details.map(detail => detail.message);

            return res.status(400).json({
                error: 'Validation Error',
                details: errorMessages,
            });
        }

        // If validation is successful, add the movie
        else {
            await service.addReviewToMovie(movieID, reviewInput.review);
            res.json({
                redirectTo: `/${movieID}/details`
            });
        }
    } catch (error) {
        res.render('error', {
            error: {
                message: 'Internal Server Error!'
            }
        })
    }
}

const deleteReview = async (req, res) => {
    try {
        // get Movie ID and Review ID from URL parameters
        const movieID = req.params.movieID ? req.params.movieID : '';
        const reviewID = req.params.reviewId ? req.params.reviewId : ''

        await service.deleteReview(reviewID);
        res.redirect(`/${movieID}/details`);
    } catch (error) {
        res.render('error', {
            error: {
                message: 'Internal Server Error!'
            }
        })
    }
}

module.exports = {
    addNewReview,
    deleteReview,
    loadIndexPage,
    loadAddMoviePage,
    addMovie,
    loadEditMoviePage,
    deleteMovie,
    viewDetails,
    update
}