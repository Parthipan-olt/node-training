const db = require('../config/db');

const addRecord = (formData) => new Promise((resolve, reject) => {
  console.log(formData)
  db.con.query(
    'INSERT INTO movie_details(title,description,director,release_date,language,genre,runtime) VALUES (?,?,?,?,?,?,?)',
    [formData.title, formData.description, formData.director,
      formData.releaseDate, formData.language, formData.genre, formData.runtime,
    ],

    (error, result) => {
      if (error) {
        reject(error);
      } else {
        console.log(result);
        resolve(result);
      }
    },
  );
});

const fetchRecord = () => new Promise((resolve, reject) => {
  db.con.query(
    'SELECT * FROM movie_details;',

    (error, result) => {
      if (error) {
        reject(error);
      } else {
        console.log(result);
        resolve(result);
      }
    },
  );
});

module.exports = {
  addRecord,
  fetchRecord,
};