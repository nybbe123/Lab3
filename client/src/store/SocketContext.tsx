import React from "react";
import { Socket } from "socket.io-client";
import { ClientToServerEvents, Message, ServerToClientEvents } from "../../../server/types";

// Skapar ett interface för kontxten
export interface SocketContextType {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    rooms: string[];
    username: string;
    roomName: string;
    messages: Message[];
    isTyping: string;
    sendMessage: (message: string) => void;
    joinRoom: (roomName: string) => void;
    connect: (username: string, room: string) => void;
};

// Skapar själva kontexten av interfacet SocketContextType
const SocketContext = React.createContext<SocketContextType>(null as any);

export default SocketContext;
