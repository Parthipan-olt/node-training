

const renderIndexPage = async (req, res) => {
  console.log('ss');
  res.render('index');
};

const postFormData = async (req, res) => {
  const formData = req.body;
  console.log(formData)
  res.render('list')

};

const renderList = async (req, res) => {
  console.log('loaded');
  res.render('list')
}

module.exports = {
  renderIndexPage,
  postFormData,
  renderList,
};