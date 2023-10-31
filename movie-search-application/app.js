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

app.listen(3000);

module.exports = app;
