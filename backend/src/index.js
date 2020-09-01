const express = require('express');
const cors = require('cors');
const http = require('http')
const routes = require('./routes');
const mongoose = require('mongoose');
const { setupWebsocket } = require('./websocket');

mongoose.connect('mongodb://localhost:27017/devradar', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const app = express();

const server = http.Server(app);
setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);