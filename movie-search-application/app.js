const express = require('express');
const path = require('path');

const app = express();
const route = require('./routes/route.js');

app.use(express.urlencoded({
  extended: true,
}));

app.use(route);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Page Not Found
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

//listen to port 3000
app.listen(3000);

module.exports = app;