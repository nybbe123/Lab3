import express from "express";
import http from "http"; //Req to build server with socket.io
import cors from "cors"; //Req for secure cross-origin requests and data transfers between browsers and servers.
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, ServerSocketData } from "./types";

const app = express();
app.use(cors());
const server = http.createServer(app);
var port = process.env.PORT || 3001;

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, ServerSocketData>(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'DELETE']
    },
});

io.use((socket: Socket, next) => {
    const username: string = socket.handshake.auth.username;
    if(!username || username.length < 2) {
        return next(new Error("Invalid username"));
    }
    socket.data.username = username;
    next();
})

// När en användare kopplar upp sig kör detta
io.on("connection", (socket) => {
    console.log("a user connected");
    if(socket.data.username) {
        socket.emit("connected", socket.data.username)
    }
});

server.listen(port, () => {
    console.log(`Server is working on port https://localhost:${port}`)
});







// socket.emit("connected", "welcome to out chat app!"); //Skickar ut meddelande till specifik socket. Parameter 1. är nyckeln från interface och parameter två är meddelande

// socket.on("message", (message) => { //Lyssnar på meddelanden med nyckeln "chat message".
//     io.emit("message", message); //Då körs nästa funktion som i sin tur emittar ut chat message. IO kör emitt til alla sockets och inte bara en specifik
// });

// socket.on("disconnect", () => { //Lyssnar efter nyckeln disconnect som anropas när någon loggar ut
//     console.log("user disconnected");
// });