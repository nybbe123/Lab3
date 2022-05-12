import { Server } from "socket.io";

// Här kan ni spara chat- & rumhistorik  

export function getRooms(io: Server) {
    const rooms = [];
    for(let [id, socket] of io.sockets.adapter.rooms) {
        if(!socket.has(id)) {
            rooms.push(id)
        }
    }
    return rooms;
}

// export function getUsers(io: Server) {
//     const users = [];
//     for(let [id, socket] of io.sockets.sockets) {
//         users.push({
//             id: id,
//             name: socket.data.nickname,
//         });
//     }
//     return users;
// }