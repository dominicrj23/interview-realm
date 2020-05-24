const express = require('express');
const logger = require('morgan');
const databaseMiddleware = require('./databaseMiddleware');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(databaseMiddleware);

const emptyRoute = express();
emptyRoute.get('/', function (req, res, next) {
    res.json({});
});

app.use('/api', emptyRoute);
module.exports = app;
