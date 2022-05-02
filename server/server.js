const express = require('express');
const app = express();
const http = require('http'); //Req to build server with socket.io
const cors = require('cors'); //Req for secure cross-origin requests and data transfers between browsers and servers.
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

var port = process.env.PORT || 3001;

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'DELETE']
    },
});

io.on('connection', (socket) => {
    console.log(`User Connected with ID: ${socket.id}`);

    io.on('disconnect', (socket) => {
        console.log('User disconnected', socket.id);
    })
});

server.listen(port, () => {
    console.log(`Server is working on port ${port}`)
});