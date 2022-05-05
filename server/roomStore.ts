import { Server, Socket } from "socket.io";

// Här kan ni spara chat- & rumhistorik  

const history = [];

export function getRooms(io: Server) {
    const rooms = []
    for(let [id, socket] of io.sockets.adapter.rooms) {
        if(!socket.has(id)) {
            rooms.push(id)
        }
    }
    return rooms;
}

export function getHistory(io: Server, socket: Socket, rooms: [], users: [user]){
    socket.on("join", (room) => {

        const newconnectionId = users.user.socket.id;

        if(//Currently connected users == newconnectionId){
            // Send history
        }else{
            // dont send history lol
        }
    })
}