// Main application file for Node JS

const express = require('express');
const app = express();

console.log('Initializing the server...');

app.get('/', (req, res) => {
    res.send('Welcome to the Task Management API!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const tasks = [];
let taskId = 1;

app.use(express.json());

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const task = { id: taskId++, ...req.body };
    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { id, ...req.body };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});