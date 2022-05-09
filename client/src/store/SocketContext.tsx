import React from "react";
import { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../../../server/types";

// Skapar ett interface för kontxten
export interface SocketContextType {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    rooms : string [];
    username:  string;
    roomName: string;
};

// Skapar själva kontexten av interfacet SocketContextType
const SocketContext = React.createContext<SocketContextType>(null as any);

export default SocketContext;
