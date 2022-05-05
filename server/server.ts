import express from "express";
import http from "http"; //Req to build server with socket.io
import cors from "cors"; //Req for secure cross-origin requests and data transfers between browsers and servers.
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, ServerSocketData } from "./types";
import { getRooms } from "./roomStore";

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

// När en användare kopplar upp sig kör detta först som kontrollerar användarnamn & rumsnamn
io.use((socket: Socket, next) => {
    const username: string = socket.handshake.auth.username;
    if(!username || username.length < 2) {
        return next(new Error("Invalid username"));
    }
    socket.data.username = username;
    next();
})

// Om allt är ok så körs denna
io.on("connection", (socket) => {
    console.log("a user connected");
    if(socket.data.username) {
        socket.emit("connected", socket.data.username);
        socket.emit("roomList", getRooms(io));
    }

    socket.on("join", (room) => {
        const shouldBroadcastRooms: boolean = !getRooms(io).includes(room);
        socket.join(room);

        if(shouldBroadcastRooms) {
            socket.broadcast.emit("roomList", getRooms(io));
        }

        socket.emit("joined", room);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});

// Serverlyssnare
server.listen(port, () => {
    console.log(`Server is working on port https://localhost:${port}`)
});