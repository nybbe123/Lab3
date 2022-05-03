import express from "express";

import http from "http"; //Req to build server with socket.io
import cors from "cors"; //Req for secure cross-origin requests and data transfers between browsers and servers.
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, ServerSocketData } from "./types";
import registerChatHandler from './chatHandler'
import { getRooms } from "./roomStore";

const { Server } = require('socket.io');

const app = express();

app.use(cors());

const server = http.createServer(app);

var port = process.env.PORT || 6001;

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:6000',
        methods: ['GET', 'POST', 'DELETE']
    },
});

io.use((socket, next) => {
    const nickname: string = socket.handshake.auth.nickname
    if(!nickname || nickname.length < 3) {
      return next(new Error("Invalid nickname"))
    }
    socket.data.nickname = nickname
    next()
  })

io.on("connection", (socket) => {
    console.log("a user connected");
  
    if(socket.data.nickname) {
      socket.emit("connected", socket.data.nickname)
  
      // TODO: Kolla om ett nytt rum skapats, om så sker redan en io.emit till alla sockets med alla rum.
      socket.emit("roomList", getRooms(io))
    }
  
    registerChatHandler(io, socket)
    
  });

/*  */

server.listen(port, () => {
    console.log(`Server is working on port https://localhost:${port}`)
});

/* // Array of registered users.
let users = [];

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
    }) */

/*     //"joins" a user to a room with roomId & sends the old messages to the new room for a new user with callback
    socket.on("join room", (roomId, callback) => {
        socket.join(roomId);
        callback(messages[roomId]);
    }) */

/*     io.on("connection", (socket) => {

        console.log("a user connected");
      
        if(socket.data.nickname) {
          socket.emit("connected", socket.data.nickname)
      
          // TODO: Kolla om ett nytt rum skapats, om så sker redan en io.emit till alla sockets med alla rum.
          socket.emit("roomList", getRooms(io))
        }
      
        registerChatHandler(io, socket)
    
        // Removes the user that's leaving from the existing users Array and emits that new Array to all existing sockets.
        io.on('disconnect', (socket) => {
            console.log('User disconnected', socket.id);
            users = users.filter(u => u.id !== socket.id);
            io.emit("new user", users);
        })
    }); */
