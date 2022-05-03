const express = require('express');
const app = express();
const http = require('http'); //Req to build server with socket.io
const cors = require('cors'); //Req for secure cross-origin requests and data transfers between browsers and servers.
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

var port = process.env.PORT || 6001;

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:6000',
        methods: ['GET', 'POST', 'DELETE']
    },
});

// Array of registered users.
let users = [];

// messages object containing all the channels and the messages previously sent
const messages = {
    general: [],
    channel2: [],
    athirdchannel: []
}

io.on('connection', (socket) => {
    console.log(`User Connected with ID: ${socket.id}`);

    socket.on("join server", (username) => {

        //Creates a new user for each socket
        const user = {
            username,
            id: socket.id,
        }

        //Pushes the user to the array
        users.push(user);

        //Sends the array of users to all the sockets
        io.emit("new user", users);
    })

    //"joins" a user to a room with roomId & sends the old messages to the new room for a new user with callback
    socket.on("join room", (roomId, callback) => {
        socket.join(roomId);
        callback(messages[roomId]);
    })

    socket.on("send message", ({content, toString, sender, chatId, isChannel}) => {
        if(isChannel) {
            const payload = {
                content,
                chatId,
                sender
            };
            socket.to(to).emit("new message", payload)
        } else {
            const payload = {
                content,
                chatId: sender,
                sender
            }
            socket.to(to).emit("new message", payload)
        }

        // Checks that the chatId exists to avoid pushing messages to a chat that doesnt exist
        if (messages[chatId]) {
            messages[chatId].push({
                sender,
                content
            })
        }
    })

    // Removes the user that's leaving from the existing users Array and emits that new Array to all existing sockets.
    io.on('disconnect', (socket) => {
        console.log('User disconnected', socket.id);
        users = users.filter(u => u.id !== socket.id);
        io.emit("new user", users);
    })
});

server.listen(port, () => {
    console.log(`Server is working on port https://localhost:${port}`)
});