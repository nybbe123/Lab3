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


    // useEffect(() => {
    //     const listener = (users: string[]) => {
    //         console.log(users);
    //         setUsers(users);
    //     }

    //     socket.on("userList", listener);
    //     return () => { socket.off("userList", listener); };
    // }, [socket]);


    useEffect(() => {
        const listener = (room: string) => {
            console.log(`Users RoomName: ${room}`);
            setRoom(room);
        };

        socket.on("joined", listener);
        return () => { socket.off('joined', listener) }
    }, [socket]);



    useEffect(() => {
        const listener = (room: string) => {
            console.log(`left room: ${room}`);
        };

        socket.on("left", listener);
        return () => { socket.off('left', listener) }
    }, [socket]);

    // Invalid username error case
    useEffect(() => {
        socket.on("connect_error", (err) => {
            if (err.message === "Invalid username") {
                console.log("Invalid username, please try again.");
            }
        });
    });

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
        socket.emit("join", room);
        console.log(username, room)
    };

    return (
        <SocketContext.Provider value={{
            // socket,
            rooms,
            username: name,
            roomName: room,
            messages,
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