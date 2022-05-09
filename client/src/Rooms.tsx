import classes from "./Rooms.module.css";
import logoMini from './assets/images/logoMini.png'
import { useSocket } from "./store/SocketProvider";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";

function Rooms() {
    const { rooms, socket, roomName, username } = useSocket();
    const [room, setRoomName] = useState("");
    // let availableRooms = rooms.filter((room) => {
    //     return room !== roomName;
    // })

    const joinRoomHandler = () => {
        if (!room.length) {
            console.log("Username & roomname required...");
            return;
        }
        socket.emit('join', room);

    }

    const switchRoomHandler = (room: string) => {
        socket.emit('leave', roomName);
        socket.emit('join', room);
    }

    return (
        <div className={classes['main-container']}>
            <div className={classes['left-container']}>
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
                            // todo: check room with roomName and add CSS active class
                            <button onClick={() => switchRoomHandler(room)} className={classes['room-btn']} key={index}>
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
                                    setRoomName(event.target.value);
                                }}
                            />
                            <button onClick={() => joinRoomHandler()} className={classes['create-room-btn']}>CREATE</button>
                            </div>
                        </div>
                    </div>
            </div>
            <div className={classes['right-container']}>
                {roomName ? (
                    <div>
                        Cha cha bloggen
                    </div>
                ): (
                    <div>
                        <h3>Create A Chatroom</h3>
                        <p>Start a chat! Stay connected with your friends and family! Let's chat and have fun together!</p>
                    </div>
                )}
            </div>
    </div>
    );
}

export default Rooms;