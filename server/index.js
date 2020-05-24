const express = require('express');
const logger = require('morgan');
const databaseMiddleware = require('./databaseMiddleware');
const bodyParser = require('body-parser');
const api = require('./todo');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(databaseMiddleware);
app.use('/api', api);

module.exports = app;
