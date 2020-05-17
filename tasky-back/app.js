const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors("Access-Control-Allow-Origin", "*"));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const authenticationRouter = require("./authentication/router.js");
const groupsRouter = require("./groups/router.js");
const usersRouter = require("./users/router.js");
const tasksRouter = require("./tasks/router.js");
const tagsRouter = require("./tags/router.js");

app.get('/', (req, res) => res.status(200).send(`Welcome to Tasky!`));
app.use('/auth', authenticationRouter);
app.use('/groups', groupsRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/tags', tagsRouter);

module.exports = app;