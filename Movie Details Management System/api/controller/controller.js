const renderIndexPage = async (req, res) => {
  res.render('index');
};

const renderEditPage = async (req, res) => {
  res.render('edit');
};

const renderListPage = async (req, res) => {
  res.render('list');
};

const renderDetailsPage = async (req, res) => {
  res.render('details');
};

module.exports = {
  renderIndexPage,
  renderListPage,
  renderEditPage,
  renderDetailsPage,
};