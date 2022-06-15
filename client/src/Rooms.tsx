import classes from "./Rooms.module.css";
import logoMini from './assets/images/logoMini.png'
import { useSocket } from "./store/SocketProvider";
import ChatRoom from "./ChatRoom";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";
import { Socket } from "socket.io-client";

function Rooms() {
    const { rooms, joinRoom, roomName, username, socket } = useSocket();
    const [room, setRoom] = useState("");
     const [showLeftContainer, setShowLeftContainer] = useState(false);

    const joinRoomHandler = (newRoom: string) => {
        if(roomName) {
            console.log('leaving...', roomName)
            socket.emit('leave', roomName)
        }
        joinRoom(newRoom); 
    }

    const createRoomHandler = (room: string) => {
        if (!room.length) {
            return;
        }
        socket.emit('leave', roomName)
        joinRoom(room);
    }

    return (
        <div className={classes['main-container']}>
            <div className={classes['left-container'] + " " + (showLeftContainer ? classes['show-as-overlay'] : "")}>
                <div className={classes['logo-container']}>
                    <img src={logoMini} alt="logotype" className={classes.logotype} />
                    <div className={classes['logo-text-container']}>
                        <h3>{username}</h3>
                        <p>is in da ChatHouse...</p>
                    </div>
                </div>
                <div className={classes['room-container']}>
                    <div className={classes['other-rooms']}>
                        <h4>Available rooms:</h4>
                        {rooms.map((room, index) => (
                            <button onClick={() => joinRoomHandler(room)} className={classes[room === roomName ? 'room-btn-active' : 'room-btn']} key={index}>
                                {room}
                                <ArrowForwardIosIcon />
                            </button>
                        ))}
                    </div>
                    <div>
                    </div>
                    <div className={classes['create-room-main']}>
                        <h2>Create Room</h2>

                        <div className={classes['create-rooms']}>
                            <input
                                type="text"
                                name="roomname"
                                id="roomname"
                                autoComplete="off"
                                placeholder="Enter Chatroom Name"
                                onChange={(event) => {
                                    setRoom(event.target.value);
                                }}
                            />
                            <button onClick={() => createRoomHandler(room)} className={classes['create-room-btn']}>CREATE</button>
                        </div>
                    </div>
                </div>
            </div>
            {roomName ? (
                <ChatRoom onToggleLeftContainer={(() => setShowLeftContainer(prev => !prev))} />
            ) : (
                <div className={classes['right-container']}>
                    <div>
                        <h3>Create A Chatroom</h3>
                        <p>Start a chat! Stay connected with your friends and family! Let's chat and have fun together!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Rooms;