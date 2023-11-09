const service = require('../services/services');
const DB = require('../../models/connection');

const renderIndexPage = async (req, res) => {
  res.render('index');
};

const renderListPage = async (req, res) => {
  res.render('list')
};

const sendAllRecords = async (req, res) => {
  DB.fetchRecord()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: 'An error occurred',
        details: error.message,
      });
    });
};

const renderEditPage = async (req, res) => {
  res.render('edit');
};

const addNewMovie = async (req, res) => {
  const formData = req.body;

  // Call a function that returns a Promise for the database operation
  DB.addRecord(formData)
    .then((response) => {
      // Send a success response if the database operation is successful
      res.status(200).json({
        success: true,
        message: 'Data retrieved successfully',
        response,
      });
    })

    .catch((error) => {
      console.log(error);
      // Send an error response if there is an issue with the database operation
      res.status(500).json({
        success: false,
        error: 'An error occurred',
        details: error.message,
      });
    });
};

const renderDetailsPage = async (req, res) => {
  res.render('details');
};

module.exports = {
  renderIndexPage,
  addNewMovie,
  renderEditPage,
  renderDetailsPage,
  renderListPage,
  sendAllRecords,
};