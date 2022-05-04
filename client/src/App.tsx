import React, { useState } from "react";

import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../server/types";

import classes from "./App.module.css";
import background from "./assets/images/background.png";
import logo from "./assets/images/chathouse.png";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001", {"autoConnect": false});

let username: string;
let room: string;

const initalMessagesState = {
  general: [],
  channel2: [],
  athirdchannel: [],
};

function App() {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [currentChat, setCurrentChat] = useState({
    isChannel: true,
    chatId: "general",
    recieverId: "",
  });
  const [connectedRooms, setConnectedRooms] = useState(["general"]);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState(initalMessagesState);
  const [message, setMessage] = useState("");

  function onHandleClick(e: any) {
    socket.auth = {
      username: username,
    }
    socket.connect();
  }

  socket.on("connect_error", (err) => {
    if(err.message = "Invalid username") {
      console.log("Du angav ett ogilgitgt användarnamn, försök igen");
    }
  });

  socket.on("connected", (username) => {
    console.log(username);
    username = username;
  })

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
              placeholder='Enter your username'
              onChange={(event) => {
                setUsername(event.target.value)
              }}
            />
          </div>
          <div className={classes['room-container']}>
            <label htmlFor="room">Room Name</label>
            <input
              type="text"
              name="room"
              id="room"
              placeholder='Chatroom'
              onChange={(event) => {
                setUsername(event.target.value)
              }}
            />
          </div>
          <button onClick={onHandleClick}>CONTINUE</button>
        </div>
      </div>
      <div className={classes['right-container']}>
        <h3>Free Online Chat Application</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem molestias nulla doloremque, quo rerum assumenda veritatis quam quasi. Vel maiores ex dolorum dolor unde corporis quos temporibus aspernatur.</p>
      </div>
    </div>
  );
}

export default App;
