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
};

// Skapar själva kontexten av interfacet SocketContextType
const SocketContext = React.createContext<SocketContextType>(null as any);

export default SocketContext;
