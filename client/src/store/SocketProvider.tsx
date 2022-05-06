import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>();
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState<String[]>([]);

    // Listar alla rum
    useEffect(() => {
        socket?.on("roomList", (availableRooms: React.SetStateAction<String[]>) => {
            console.log(rooms);
            setRooms(availableRooms);
        })
    });

    return (
        <SocketContext.Provider value={{
            socket: io({
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