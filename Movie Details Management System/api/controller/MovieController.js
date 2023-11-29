const movieService = require('../services/movieService')
const Joi = require('../services/FormValidation');
const reviewService = require('../services/ReviewService')

// Load Index Page (listing)
const loadIndexPage = async (req, res) => {
    try {
        const records = await movieService.retrieveAllRecords();
        if (records === null || typeof records === 'undefined') {
            res.render('error',{error:{message:'Invalid MovieID'}})
        }

        // Render index page if returned obj is not null or undefined
        res.render('index', {
            records
        });
    } catch (error) {
        throw new Error;
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


const addNewMovie = async (req, res) => {
    try {
        // Form Data
        const movieData = req.body;

        // throw an error if the URL parameter movieID is undefined or null
        if (movieData === null || typeof movieData === 'undefined') {
            res.render('error',{error:{message:'Invalid Data'}})
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
            await movieService.addMovie(movieData);

            // If success, redirect to home page
          return res.json({
                redirectTo: '/'
            });
        }
    } catch (error) {
        throw new Error;
    }
};



const loadEditMoviePage = async (req, res) => {
    try {
        const movieID = req.params.movieid;

        // throw an error if the URL parameter movieID is undefined or null
        if (movieID === null || movieID === 'undefined') {
            res.render('error',{error:{message:'Invalid MovieID'}})
        }
        // fetch details to populate the form
        const movieDetails = await movieService.getDetailsToEdit(movieID);

        // throw an error if movieDetails is undefined of null
        if (movieDetails === null || typeof movieDetails === 'undefined') {
           throw new Error;
        }

        // render edit page with the movieDetails
        res.render('edit', {
            record: movieDetails,
            movieId: movieID
        })
    } catch (error) {
        res.render('error', {
            error: {
                message: 'Movie Not Found!'
            }
        })
    }
}

const submitEditedData = async (req, res) => {
    try {
        const movieID = req.params.movieid;

        const movieInput = req.body;
        // throw an error if the URL parameter movieID is undefined or null
        if (movieID === null || movieID === 'undefined') {
            throw new Error;
        }
        const validation = await Joi.validateForm(movieInput);

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

            await movieService.updateMovie(movieID, movieInput);
           return res.json({
                redirectTo: '/'
            })
        }
    } catch (error) {
        res.render('error', {
            error: {
                message:error
            }
        })
    }
}


const deleteMovie = async (req, res) => {
    try {
        // URL parameter - ID of the movie to Delete
        const movieID = req.params.movieid;

        if (movieID === null || typeof movieID === 'undefined') {
            throw new Error;
        }

        await movieService.deleteMovie(movieID);

        //if success redirect to home page
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
        const movieID = req.params.movieid;

        // throw and error if the Movie ID is undefined or null
        if (movieID === null || typeof movieID === 'undefined') {
            throw new Error;
        }

        // Details of the movie & reviews
        const movieDetails = await movieService.getMovieDetails(movieID);
        const reviews = await reviewService.getReviews(movieID)

        // throw an error if the MovieDetails obj is null or undefined
        if (movieDetails === null || typeof movieDetails === 'undefined') {
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

module.exports = {
    loadIndexPage,
    loadAddMoviePage,
    addNewMovie,
    loadEditMoviePage,
    deleteMovie,
    viewDetails,
    submitEditedData
}