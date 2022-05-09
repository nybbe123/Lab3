import React, { useState } from "react";
import classes from "./LoginPage.module.css";
import logo from "./assets/images/chathouse.png";
import { useSocket } from "./store/SocketProvider";

function LoginPage() {
  const socketCtx = useSocket();
  const [name, setUsername] = useState("");
  const [room, setRoomName] = useState("");

  function onHandleClick() {
    if (!name.length && !room.length) {
      console.log("Username & roomname required...");
      return;
    }
    socketCtx.socket!.auth = {
      username: name,
    };
    socketCtx.socket!.emit("join", room);
    socketCtx.socket!.connect();
  }

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
              autoComplete="off"
              placeholder="Enter Chatroom Name"
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
