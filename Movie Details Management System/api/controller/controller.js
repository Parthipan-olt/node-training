const renderIndexPage = async (req, res) => {
  res.render('index');
};

const renderEditPage = async (req, res) => {
  res.render('edit');
};
const addNewMovie = async (req, res) => {
  res.render('list');

};

const renderList = async (req, res) => {

};

const renderDetailsPage = async (req, res) => {
  res.render('details');
};

module.exports = {
  renderIndexPage,
  addNewMovie,
  renderEditPage,
  renderDetailsPage,
  renderList,
};