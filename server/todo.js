const express = require('express');
const app = express.Router();
const uuid = require('uuid/v4');

app.get(`/`, async (req, res) => {
    const { listTasks } = req.db;
    const tasks = listTasks();
    if (!tasks) {
        return res.status(404).send();
    }
    return res.send(tasks);
});
app.get(`/:id`, async (req, res) => {
    const { id } = req.params;
    const { getTask } = req.db;
    const task = getTask(id);
    if (!task) {
        return res.status(404).send();
    }
    return res.send(task);
});

app.post(`/create`, async (req, res) => {
    const { text } = req.body;
    const { createTask, getTask } = req.db;
    const id = uuid();
    createTask({ text, id });
    const task = getTask(id);
    return res.status(201).send(task);
});

app.put(`/:id`, async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const { updateTask, getTask } = req.db;

    const task = getTask(id);
    if (!task) {
        return res.status(404).send();
    }
    updateTask(id, { text });
    const updatedTask = getTask(id);
    return res.status(202).send(updatedTask);
});

app.delete(`/:id`, async (req, res) => {
    const { id } = req.params;
    const { deleteTask, getTask } = req.db;

    const task = getTask(id);
    if (!task) {
        return res.status(404).send();
    }
    deleteTask(id);
    res.status(202).send();
});

module.exports = app;
