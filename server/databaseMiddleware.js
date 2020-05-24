const express = require('express');
const app = express();

let tasks = {};
app.use(function (req, res, next) {
    req.db = {
        listTasks: () => {
            return Object.keys(tasks);
        },
        getTask: id => {
            return tasks[id];
        },
        createTask: task => {
            tasks = {
                ...tasks,
                [task.id]: task
            };
        },
        updateTask: (id, task) => {
            tasks = {
                ...tasks,
                [id]: {
                    ...tasks[id],
                    ...task
                }
            };
        },
        deleteTask: id => {
            const { [id]: task, ...rest } = tasks; //eslint-disable-line no-unused-vars
            tasks = rest;
        }
    };
    next();
});
module.exports = app;
