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
module.exports = {
  con,
}