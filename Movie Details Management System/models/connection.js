const mysql = require('mysql');
// establish database connection
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'movie_management',
});

con.connect((err) => {
  if (err) {
    console.error(`Error connecting to the database: ${err.message}`);
    return;
  }
  console.log('Connected to the database!');
});

// -----------------------------------------------------------------
function addRecord(formData) {
  return new Promise((resolve, reject) => {
    const {
      title,
      description,
      director,
      releaseDate,
      language,
      genre,
      runtime,
    } = formData;

    con.query(
      'INSERT INTO movie_details (title,description,director,release_date,language,genre,runtime) VALUES (?,?,?,?,?,?,?)',
      [title, description, director, releaseDate, language, genre, runtime],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
}

function fetchRecord() {
  return new Promise((resolve, reject) => {
    con.query(
      'SELECT * FROM movie_details;',
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
}

module.exports = {
  addRecord,
  fetchRecord,
};