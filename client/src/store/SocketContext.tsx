import React from "react";
import { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../../../types";

// Skapar en context typ
export interface SocketContextType {
    socket: Socket<ClientToServerEvents, ServerToClientEvents> | undefined;
    rooms : string [];
    username:  string;
    roomName: string;
};

// Skapar själva kontexten
const SocketContext = React.createContext<SocketContextType | null>(null);

export default SocketContext;
