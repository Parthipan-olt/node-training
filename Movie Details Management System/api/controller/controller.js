const service = require('../services/services');

const renderIndexPage = async (req, res) => {
  res.render('index');
};

const renderEditPage = async (req, res) => {
  res.render('edit');
};

const addNewMovie = (req, res, next) => {
  res.render('list');
};

const renderDetailsPage = async (req, res) => {
  res.render('details');
};

module.exports = {
  renderIndexPage,
  addNewMovie,
  renderEditPage,
  renderDetailsPage,
};