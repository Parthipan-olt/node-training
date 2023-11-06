const express = require('express');
const path = require('path');
const Route = require('./routes/route.js');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
// route setup
app.use(Route);
app.use(express.urlencoded({
  extended: true,
}));
// setup public folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);
module.exports = app;