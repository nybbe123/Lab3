import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./LoginPage.module.css";
import logo from "./assets/images/chathouse.png";
import { SocketContextType } from "./store/SocketContext";
import { useSocket } from "./store/SocketProvider";

function LoginPage() {
  const socketCtx = useSocket() as SocketContextType;
  const navigate = useNavigate(); 
  
  const [name, setUsername] = useState("");
  const [room, setRoomName] = useState("");

  function onHandleClick() {
    if(!name.length) {
        console.log('Username & roomname required...')
        return;
    }
    socketCtx.socket!.auth = {
      username: name,
    }
    socketCtx.socket!.emit("join", room);
    socketCtx.socket!.connect(); 
  }
    
  useEffect(() => {
    socketCtx.socket?.on("connected", (name) => {
      console.log(`Connected User: ${name}`)
      socketCtx.username = name;
    })
  }, [socketCtx]);
    
  useEffect(() => {
    socketCtx.socket?.on('joined', (room) => {
      console.log(`Users RoomName: ${room}`)
      socketCtx.roomName = room;
      navigate('/rooms');
    })
  }, [navigate, socketCtx.socket]);

  useEffect(() => {
    socketCtx.socket?.on("connect_error", (err) => {
      if(err.message === "Invalid username") {
        console.log("Invalid username, please try again.");
      }
    })
  }, [socketCtx.socket]);


  return (
    <div className={classes['main-container']}>
        <div className={classes['left-container']}>
        <img src={logo} alt="logotype" className={classes.logotype} />
        <div className={classes['login-container']}>
            <h3>Create New Chat</h3>
            <div className={classes['username-container']}>
            <label htmlFor="username">Nickname</label>
            <input
                type="text"
                name="username"
                id="username"
                placeholder='Enter Username'
                autoComplete="off"
                onChange={(event) => {
                setUsername(event.target.value)
                }}
            />
            </div>
            <div className={classes['room-container']}>
            <label htmlFor="roomname">Room Name</label>
            <input
                type="text"
                name="roomname"
                id="roomname"
                placeholder='Enter Chatroom Name'
                onChange={(event) => {
                setRoomName(event.target.value)
                }}
            />
            </div>
              <button onClick={onHandleClick}>CONTINUE</button>
        </div>
        </div>
        <div className={classes['right-container']}>
        <h3>Free Online Chat Application</h3>
        <p>Welcome to chatroom, your new favorite chat app, it is completly free and showcases multiple different features such as, direct messaging, creating your own rooms setting a username and much more!</p>
        </div>
    </div>
  );
}

export default LoginPage;