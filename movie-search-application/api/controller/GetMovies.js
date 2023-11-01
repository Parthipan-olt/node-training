const service = require('../services/service');

//render the index page
const renderIndexPage = (req, res) => {
  res.render('index');
};

const fetchMovieData = async (req, res) => {
  const searchQuery = req.params.title;
  const { page } = req.params;

  // Check if searchQuery is empty or undefined
  if (!searchQuery) {
    return res.status(400).json({
      error: 'No search query provided',
    });
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=b31738b39a9616ae7b1e0f4528fb1985&query=${searchQuery}&page=${page}`;

  service.fetchDataFromApi(url)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(404).json({
        error: 'An error occurred',
      });
    });
};

// Search movies by genre ID
const searchMoviesByGenre = async (req, res) => {
  const {
    page,
  } = req.params;

  const genreId = req.params.id;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=b31738b39a9616ae7b1e0f4528fb1985&with_genres=${genreId}&page=${page}`;

  service.fetchDataFromApi(url)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        error: 'An error occurred',
      });
    });
};


// get the details of the selected movie
const getMovieDetails = (req, res) => {
  const movieId = req.query.id;

  // Check if movieId is missing or not a number
  if (!movieId || !Number.isInteger(Number(movieId)) || Number(movieId) <= 0) {
    res.status(400).render('details', {
      error: !movieId ?
        'Movie ID is missing' : 'Invalid Movie ID',
    });
    return;
  }

  // check if the url contains more than one query
  if (Object.keys(req.query).length > 1) {
    res.status(404).render('error', {
      error: `Page Not Found`,
    });
    return;
  }

  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=b31738b39a9616ae7b1e0f4528fb1985`;

  // Handle api request
  service.fetchDataFromApi(url)
    .then((data) => {
      res.render('details', {
        data,
      });
    })
    .catch((error) => {
      // Handle the API request error
      if (error.response && error.response.status === 404) {
        // The movie was not found (HTTP 404)
        res.status(404).render('details', {
          error: 'Movie Not Found',
        });
      } else {
        // Other API request error
        res.status(500).render('details', {
          error: 'Could not fetch movie details',
        });
      }
    });
};

module.exports = {
  renderIndexPage,
  fetchMovieData,
  searchMoviesByGenre,
  getMovieDetails,
};