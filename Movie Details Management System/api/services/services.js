const db = require('../../models/model');

function postForm(formData) {
  return new Promise((resolve, reject) => {
    db.addRecord(formData)
      .then((response) => {
        if (response) {
          console.log(response);
          resolve(response);
        } else {
          reject(new Error('Cannot Add record'));
        }
      })
      .catch((error) => {
        console.log(error)
        reject(error);
      });
  });
}

module.exports = {
  postForm,
};