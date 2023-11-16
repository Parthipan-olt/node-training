const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Route = require('./routes/route');
const con = require('./config/db');
// port
const port = process.env.PORT || 3000;

// body parser
const app = express();
app.use(bodyParser.urlencoded({
  extended: true,
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

// page not found error
app.use((req, res, next) => {
  res.status(404).render('error', {
    error: 'Page Not Found',
  });
  next();
});

// Custom error handling for other errors
app.use((error, req, res) => {
  res.status(500).render('error', {
    error,
  });
});

// listen to port
const server = app.listen(port, (error) => {
  if (error) {
    console.error('Error starting the server:', error);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});

// export modules
module.exports = {
  app,
  server,
};