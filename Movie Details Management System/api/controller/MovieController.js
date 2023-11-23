const services = require('../services/services');

const {
  validationResult
} = require('express-validator');

const loadIndexPage = async (req, res) => {
  try {
    validationResult(req).throw();
    const records = await services.retrieveAllRecords();
    if (!records || typeof records === 'undefined') {
      throw new Error('No Records!!!');
    }
    res.render('index', {
      records,
    });
  } catch (error) {
    res.render('error', {
      error: error.message || 'An error occurred',
    });
  }
};


const loadAddMoviePage = async (req, res) => {
  try {
    res.render('add-movie');
  } catch (error) {
    res.render('error', {
      error,
    });
  }
};

const addMovie = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error('Input Undefined!!!')
    }
   const body=req.body;
    services.validateForm(body);
    await services.addMovie(req.body);
    res.redirect('/');
  } catch (error) {
    res.render('error', {
      error,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const {
      movieId,
    } = req.params;
    if (!movieId) {
      throw new Error('Movie Does Not Exist!!');
    }
    await services.deleteMovie(movieId);
    res.redirect(`/?${movieId}`);
  } catch (error) {
    res.render('error', {
      error,
    });
  }
};

const loadDetailsToEdit = async (req, res) => {
  const movieId = req.params.movieid;
  try {
    if (!movieId) {
      throw new Error('Record Not Found');
    } else {
      const record = await services.getDetailsToEdit(movieId);
      if (!record) {
        throw new Error('Record Not Found');
      }
      const data = record.dataValues;
      res.render('edit', {
        record: data,
        movieId,
      });
    }
  } catch (error) {
    res.render('error', {
      error,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const formData = req.body;
    const movieID = req.query.movieId;
    await services.updateMovie(formData, movieID);
    res.redirect('/');
  } catch (error) {
    res.render('error', {
      error,
    });
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const movieId = req.params.movieid;
    if (!movieId || typeof movieId === 'undefined') {
      throw new Error('Invalid movieID!!!');
    }
    const resp = await services.getMovieDetails(movieId);
    if (!resp || !resp.dataValues || !resp.Reviews) {
      throw new Error('Internal Server error');
    }
    res.render('details', {
      movieDetails: resp.dataValues,
      reviews: resp.Reviews,
    });
  } catch (error) {
    error = {
      message: 'Movie Not Found!'
    }
    res.render('error', error);
  }
};

module.exports = {
  loadIndexPage,
  addMovie,
  deleteMovie,
  loadDetailsToEdit,
  updateMovie,
  getMovieDetails,
  loadAddMoviePage,
};