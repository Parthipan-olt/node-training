const express = require('express');
const path = require('path');
const mysql = require('mysql');
const Route = require('./routes/route.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
// route setup
app.use(Route);
// body parser
app.use(express.urlencoded({
  extended: true,
}));
// setup public folder
app.use(express.static(path.join(__dirname, 'public')));

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

// listen to port 3000
app.listen(3000);

module.exports = {
  app,
  con,
};