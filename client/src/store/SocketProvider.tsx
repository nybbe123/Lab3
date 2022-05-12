import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, Message, ServerToClientEvents } from '../../../server/types';
import SocketContext from "./SocketContext";

interface Props {
    children: React.ReactNode
};

// Skapar en provider för kontexten
const SocketProvider: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const [socket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>(io("http://localhost:3001", {
        autoConnect: false
    }));
    const [rooms, setRooms] = useState<string[]>([]);
    const [name, setUser] = useState<string>('');
    const [room, setRoom] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState<string>("");

    useEffect(() => {
        const listener = (name: string) => {
            console.log(`Connected User: ${name}`);
            setUser(name);
            navigate('/rooms');
        };

        socket.on("connected", listener);
        return () => { socket.off('connected', listener); };
    }, [navigate, socket]);


    useEffect(() => {
        const listener = (availableRooms: string[]) => {
            console.log(availableRooms);
            setRooms(availableRooms);
        };

        socket.on("roomList", listener);
        return () => { socket.off('roomList', listener); };
    }, [socket]);

    useEffect(() => {
        const listener = (room: string) => {
            console.log(`Users RoomName: ${room}`);
            setRoom(room);
        };

        socket.on("joined", listener);
        return () => { socket.off('joined', listener) }
    }, [socket]);

    useEffect(() => {
        const listener = (name: string) => {
            if (name) {
                setIsTyping(`${name} is typing...`);
                setTimeout(() => setIsTyping(""), 2000);
            }
        }

        socket.on('isTyping', listener);
        return () => { socket.off('isTyping', listener) };
    }, [socket]);

    useEffect(() => {
        const listener = (room: string) => {
            console.log(`left room: ${room}`);
        };

        socket.on("left", listener);
        return () => { socket.off('left', listener) }
    }, [socket]);

    // Handle messages
    useEffect(() => {
        const listener = (message: Message) => {
            setMessages((prev) => [...prev, message])
        };
        socket.on("message", listener);
        return () => { socket.off('message', listener) }
    }, [socket]);


    const sendMessage = (message: string) => {
        socket.emit("message", message, room);
    };

    const joinRoom = (roomName: string) => {
        socket.emit('join', roomName)
        setMessages([]);
    };

    const connect = (username: string, room: string) => {
        socket.auth = { username };
        socket.connect();
        // socket.emit("join", room);
    };

    // Invalid username error case
    useEffect(() => {
        socket.on("connect_error", (err) => {
            if (err.message === "Invalid username") {
                console.log("Invalid username, please try again.");
            }
        });
    });

    return (
        <SocketContext.Provider value={{
            socket,
            rooms,
            username: name,
            roomName: room,
            messages,
            isTyping: isTyping,
            sendMessage,
            joinRoom,
            connect
          }
        }>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;
export const useSocket = () => useContext(SocketContext);