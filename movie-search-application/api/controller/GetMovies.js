const service = require('../services/service');

const loadIndex = (req, res) => {
  res.render('index');
};
const movieData = async (req, res) => {
  const searchQuery = req.params.title;
  const {
    page,
  } = req.params;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=b31738b39a9616ae7b1e0f4528fb1985&query=${searchQuery}&page=${page}`;

  service.getApi(url, (error, data) => {
    if (error) {
      res.status(404).json({
        error: 'An error occurred',
      });
    } else {
      res.json(data);
    }
  });
};

const searchGenre = async (req, res) => {
  const {
    page,
  } = req.params;
  const genre = req.params.id;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=b31738b39a9616ae7b1e0f4528fb1985&with_genres=${genre}&page=${page}`;

  service.getApi(url, (error, data) => {
    if (error) {
      res.status(500).json({
        error: 'An error occurred',
      });
    } else {
      res.json(data);
    }
  });
};

const redirectToDetails = (req, res) => {
  const movieId = req.query.id;
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=b31738b39a9616ae7b1e0f4528fb1985`;
  service.getApi(url, (error, data) => {
    if (error) {
      res.status(500).render('details', {
        error: 'An error occurred',
      });
    } else {
      res.render('details', {
        data,
      });
    }
  });
};

module.exports = {
  loadIndex,
  movieData,
  searchGenre,
  redirectToDetails,
};
