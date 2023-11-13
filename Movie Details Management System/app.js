const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Route = require('./routes/route');
const con = require('./config/db');


const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
// connect to db
app.set(con);
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

app.use((req, res, next) => {
  res.status(404).render('error', {
    error: 'Page Not Found',
  });
  next();
});

// Custom error handling for other errors
app.use((err, req, res) => {
  res.status(500).render('error', {
    error: 'An error occurred',
  });
});
// listen to port 3000
app.listen(3000);
module.exports = {
  app,
};