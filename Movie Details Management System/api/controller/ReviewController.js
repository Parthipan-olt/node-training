const service = require('../services/ReviewService')

const addNewReview = async (req, res) => {
    try {
        // get Movie ID and Review ID from URL parameters
        const movieID = req.params.movieid;

        // review input 
        const reviewInput = req.body;

        // throw and error if movie ID or review ID is null or undefined
        if ((movieID) === null || typeof (movieID) === 'undefined') {
            throw new Error('Bad Request!');
        } else {
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
        const movieID = req.params.movieId;
        const reviewID = req.params.reviewId;

        // throw and error if movie ID or review ID is null or undefined
        if ((movieID || reviewID) === null || typeof (movieID || reviewID) === 'undefined') {
            throw new Error('Bad Request!');
        }

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
}