//imports
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const http = require('http')
const socket = require("socket.io")
require('./database')

//declaration
var app = express()
const server = http.Server(app);
const io = socket(server);

//config server
app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(cors())
app.use(express.json())
app.use(routes)

//start
server.listen('3001',()=>console.log('started'))