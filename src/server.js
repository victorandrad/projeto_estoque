const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const server = express();
const cors = require('cors');

mongoose.connect('mongodb+srv://dev:dev01@cluster0-edysn.mongodb.net/dev?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);