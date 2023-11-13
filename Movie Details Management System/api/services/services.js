const db = require('../../models/model');

function postForm(form) {
  const formData = {
    title: form.title,
    description: form.description,
    director: form.director,
    releaseDate: form.releaseDate,
    language: form.language,
    genre: form.genre,
    runtime: form.runtime,
  };
  return new Promise((resolve, reject) => {
    db.addRecord(formData)
      .then((response) => {
        if (response) {
          resolve(response);
        } else {
          reject(new Error('Cannot Add record'));
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getAllRecords() {
  return new Promise((resolve, reject) => {
    db.fetchRecord()
      .then((response) => {
        if (response) {
          resolve(response);
        } else {
          reject(new Error('Cannot Add record'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function deleteRecord(movieId) {
  return new Promise((resolve, reject) => {
    db.deleteRecord(movieId)
      .then((response) => {
        if (response) {
          resolve(response);
        } else {
          reject(new Error('Cannot Add record'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function loadSelectedRecord(movieId) {
  return new Promise((resolve, reject) => {
    db.selectedMovieDetails(movieId)
      .then((response) => {
        if (response) {
          resolve(response);
        } else {
          reject(new Error('Cannot Add record'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function updateRecord(form, movieId) {
  const formData = {
    title: form.title,
    description: form.description,
    director: form.director,
    releaseDate: form.releaseDate,
    language: form.language,
    genre: form.genre,
    runtime: form.runtime,
  };
  return new Promise((resolve, reject) => {
    db.updateRecord(formData, movieId)
      .then((response) => {
        if (response) {
          resolve(response);
        } else {
          reject(new Error('Cannot Add record'));
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getMovieDetails(movieId) {
  console.log(movieId,':movie')
  return new Promise((resolve, reject) => {
    db.fetchSelectedMovie(movieId)
      .then((response) => {
        if (response) {
          resolve(response);
        } else {
          reject(new Error('Cannot Add record'));
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function addReview(movieId, review) {
  return new Promise((resolve, reject) => {
    db.addReview(movieId, review)
      .then((response) => {
        if (response) {
          resolve(response);
        } else {
          reject(new Error('Cannot Add record'));
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function deleteReview(reviewId) {
  return new Promise((resolve, reject) => {
    db.deleteReview(reviewId)
      .then((response) => {
        if (response) {
          resolve(response);
        } else {
          reject(new Error('Cannot Add record'));
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
module.exports = {
  postForm,
  getAllRecords,
  deleteRecord,
  loadSelectedRecord,
  updateRecord,
  getMovieDetails,
  addReview,
  deleteReview,
};