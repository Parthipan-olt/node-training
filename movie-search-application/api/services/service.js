const axios = require('axios');

// fetch movies from the API
function fetchDataFromApi(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        if (response.data) {
          //success
          resolve(response.data);
        } else {
          // if no data found
          reject(new Error('No data found in the response.'));
        }
      })
      .catch((error) => {
        //error
        reject(error);
      });
  });
}

module.exports = {
  fetchDataFromApi,
};