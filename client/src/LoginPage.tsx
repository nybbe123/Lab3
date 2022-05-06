import React, { useState, useEffect, useContext } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../server/types";

import classes from "./LoginPage.module.css";
import background from "./assets/images/background.png";
import logo from "./assets/images/chathouse.png";
import SocketContext from "./store/SocketContext";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3001",
  { autoConnect: false }
);

function LoginPage() {
  const SocketCtx = useContext(SocketContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");

  function onHandleClick() {
    socket.auth = {
      username: username,
    };
    if (!roomName.length) {
      console.log("Ogiltigt namn på rummet...");
      return;
    }
    socket.emit("join", roomName);
    socket.connect();
  }

  useEffect(() => {
    socket.on("connect_error", (err) => {
      if (err.message === "Invalid username") {
        console.log("Invalid username, please try again.");
      }
    });

    socket.on("connected", (username) => {
      console.log(`Connected User: ${username}`);
      SocketCtx!.username = username;
    });

    socket.on("joined", (roomName) => {
      console.log(`Users RoomName: ${roomName}`);
      SocketCtx!.roomName = roomName;
      navigate("/rooms");
    });
  }, []);

  return (
    <div className={classes["main-container"]}>
      <div className={classes["left-container"]}>
        <img src={logo} alt="logotype" className={classes.logotype} />
        <div className={classes["login-container"]}>
          <h3>Create New Chat</h3>
          <div className={classes["username-container"]}>
            <label htmlFor="username">Nickname</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              autoComplete="off"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div className={classes["room-container"]}>
            <label htmlFor="roomname">Room Name</label>
            <input
              type="text"
              name="roomname"
              id="roomname"
              placeholder="Enter Chatroom Name"
              autoComplete="off"
              onChange={(event) => {
                setRoomName(event.target.value);
              }}
            />
          </div>
          <button onClick={onHandleClick}>CONTINUE</button>
        </div>
      </div>
      <div className={classes["right-container"]}>
        <h3>Free Online Chat Application</h3>
        <p>
          Welcome to chatroom, your new favorite chat app, it is completly free
          and showcases multiple different features such as, direct messaging,
          creating your own rooms setting a username and much more!
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
