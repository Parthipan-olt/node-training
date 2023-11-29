// Add a review
const {
    sequelize,
} = require('../../config/db');
const {
    Movie,
} = require('../../models/movie-model');
const {
    Review,
} = require('../../models/review-model');

Review.belongsTo(Movie, {
    foreignKey: 'movie_id',
});
Movie.hasMany(Review, {
    foreignKey: 'movie_id',
});

async function addReviewToMovie(movieId, reviews) {
    console.log(reviews)
    return new Promise((resolve, reject) => {
        Review.create({
                review: reviews,
                movie_id: movieId,
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
async function deleteReview(reviewId) {
    return new Promise((resolve, reject) => {
        Review.destroy({
                where: {
                    review_id: reviewId,
                },
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
async function getReviews(movieId) {
    return new Promise((resolve, reject) => {

        Review.findAll({
                where: {
                    movie_id: movieId,
                },
            }).then((response) => {

                resolve(response);
            })
            .catch((error) => {

                reject(error);
            });
    });
}

module.exports = {
    addReviewToMovie,
    deleteReview,
    getReviews
}