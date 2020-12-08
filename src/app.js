const express = require('express');
const { errors } = require('celebrate');
const routes = require('./routes');
const cors = require('cors');

const app = express();

// accept POST request as JSON
app.use(express.json());

// CORS
app.use(cors());

// use the routes
app.use(routes);

app.use(errors());

app.use(express.static('public'))

//app.listen(3333); // to run tests export the app instead
module.exports = app;