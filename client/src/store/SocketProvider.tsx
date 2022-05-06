import React, { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from '../../../server/types';

import SocketContext, {SocketContextType} from "./SocketContext";

const defaultSocketState: SocketContextType = {
    socket: undefined,
    rooms: [],
    username: '',
    roomName: '',
}

interface Props {
    children: React.ReactNode
  };

// Skapar en provider för kontexten
const SocketProvider: React.FC<Props> = ({children}) => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
    const [rooms, setRooms] = useState<String[]>([]);

    //Listar alla rum
    useEffect(() => {
        socket?.on("roomList", (availableRooms) => {
            console.log(rooms);
            setRooms(availableRooms);
        })
    });

    return (
        <SocketContext.Provider value={{
            socket: io("http://localhost:3001",{
                autoConnect: false
            }),
            rooms: [],
            username: '',
            roomName: '',
        }
        }>
        {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;
export const useSocket = () => useContext(SocketContext);