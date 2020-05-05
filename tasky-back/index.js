
const express = require('express');
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose');

const port = process.env.PORT || 4000;

const cors = require('cors');
app.use(cors("Access-Control-Allow-Origin", "*"));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo-node:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'));

app.get('/', (req, res) => res.status(200).send(`Welcome to Tasky!`));

app.listen(port, () => console.log(`Server listening to port ${port}!`));