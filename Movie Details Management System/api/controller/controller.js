const services = require('../services/services');

const renderIndexPage = async (req, res) => {
  try {
    res.render('index');
  } catch (error) {
    res.render('error', {
      error,
    });
  }
};


const getFormData = async (req, res) => {
  services.postForm(req.body)
    .then(() => {
      res.redirect('list');
    })
    .catch((error) => {
      res.render('error', {
        error,
      });
    });
};

const renderListingPage = async (req, res) => {
  services.getAllRecords()
    .then((response) => {
      res.render('list', {
        records: response,
      });
    })
    .catch((error) => {
      res.render('error', {
        error,
      });
    });
};

const movieRecordToDelete = (req, res) => {
  const {
    movieId,
  } = req.query;
  services.deleteRecord(movieId)
    .then(() => {
      res.redirect('list');
    })
    .catch((error) => {
      res.render('error', {
        error,
      });
    });
};

const renderEditingPage = async (req, res) => {
  const {
    movieId,
  } = req.query;
  services.loadSelectedRecord(movieId)
    .then((response) => {
      res.render('edit', {
        record: response[0],
        movieId,
      });
    })
    .catch((error) => {
      res.render('error', {
        error,
      });
    });
};

const movieRecordUpdate = async (req, res) => {
  const formData = req.body;
  const movieID = req.query.movieId;
  services.updateRecord(formData, movieID)
    .then(() => {
      res.redirect('list');
    })
    .catch((error) => {
      res.render('error', {
        error,
      });
    });
};

const viewDetails = async (req, res) => {
  const {
    movieId,
  } = req.query;
  services.getMovieDetails(movieId)
    .then((response) => {
      console.log(response);
      res.render('details', {
        movieDetails: response.movieDetails ? response.movieDetails : response,
        reviews: response.reviews ? response.reviews : null,
      });
    }).catch((error) => {
      res.render('error', {
        error,
      });
    });
};

const addReview = async (req, res) => {
  const {
    movieId,
  } = req.query;
  const {
    review,
  } = req.body;

  services.addReview(movieId, review)
    .then(() => {
      res.redirect(`/view?movieId=${movieId}`);
    })
    .catch((error) => {
      res.render('error', {
        error,
      });
    });
};

const deleteReview = async (req, res) => {
  const {
    movieId,
  } = req.query;
  const {
    reviewId,
  } = req.query;
  services.deleteReview(reviewId)
    .then(() => {
      res.redirect(`/view?movieId=${movieId}`);
    })
    .catch((error) => {
      res.render('error', {
        error,
      });
    });
};

module.exports = {
  renderIndexPage,
  postFormData,
  deleteRecord,
  renderEditPage,
  updateRecord,
  renderListPage,
  viewDetails,
  addReview,
  deleteReview,
};