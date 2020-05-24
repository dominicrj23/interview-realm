const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

const emptyRoute = express();
emptyRoute.get('/', function (req, res, next) {
    res.json({});
});

app.use('/api', emptyRoute);
module.exports = app;
