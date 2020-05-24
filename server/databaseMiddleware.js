const express = require('express');
const app = express();

app.use(function (req, res, next) {
    req.db = {
        listTasks: () => {},
        getTask: id => {},
        createTask: task => {},
        updateTask: (id, task) => {},
        deleteTask: id => {}
    };
    next();
});
module.exports = app;
