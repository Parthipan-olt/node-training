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

async function retrieveAllRecords() {
    return new Promise((resolve, reject) => {
        Movie.findAll({
                attributes: [
                    'movie_id', 'title', 'release_date', 'director', 'language', 'description', 'genre', 'runtime',
                    [sequelize.literal('(SELECT COUNT(movie_id) FROM movie_reviews WHERE movie_reviews.movie_id = Movie.movie_id)'), 'review_count'],
                ],
                include: [{
                    model: Review,
                    where: Movie.movie_id = Review.movie_id,
                    group: ['movie_details.movie_id'],
                }],
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function addMovie(input) {
    return new Promise((resolve, reject) => {
        Movie.create({
                title: input.title,
                description: input.description,
                director: input.director,
                release_date: input.releaseDate,
                language: input.language,
                genre: input.genre,
                runtime: input.runtime,
            })

            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function deleteMovie(movieId) {
    return new Promise((resolve, reject) => {
        Movie.destroy({
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

async function getDetailsToEdit(movieId) {
    return new Promise((resolve, reject) => {
        Movie.findByPk(movieId)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function updateMovie(movieId, input) {
    return new Promise(async (resolve, reject) => {
        Movie.update({
                title: input.title,
                description: input.description,
                director: input.director,
                release_date: input.releaseDate,
                language: input.language,
                genre: input.genre,
                runtime: input.runtime,
            }, {
                where: {
                    movie_id: movieId,
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

async function getMovieDetails(movieId) {
    return new Promise((resolve, reject) => {
        Movie.findOne({
                attributes: [
                    'movie_id', 'title', 'release_date', 'director', 'language', 'description', 'genre', 'runtime',
                    [sequelize.literal('(SELECT COUNT(movie_id) FROM movie_reviews WHERE movie_reviews.movie_id = Movie.movie_id)'), 'review_count'],
                ],
                where: {
                    movie_id: movieId,
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

module.exports = {
    retrieveAllRecords,
    addMovie,
    deleteMovie,
    getDetailsToEdit,
    updateMovie,
    getMovieDetails,
}