import React, { useState } from "react";
import io from "socket.io-client";
import immer from "immer";
import classes from "./App.module.css";
import background from "./assets/images/background.png";
import logo from "./assets/images/chathouse.png";

const socket = io("http://localhost:6001");

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

  let body;
  // if(connected) {
  //   body = {
  //     <Chat
  //     message={message}
  //     handleMe
  //   }
  // }

  return (
<<<<<<< HEAD
    <div className={classes['main-container']}>
      <div className={classes['left-container']}>
        <img src={logo} alt="logotype" className={classes.logotype} />
        <div className={classes['login-container']}>
          <h3>Create New Chat</h3>
          <div className={classes['username-container']}>
=======
    <div className={classes["main-container"]}>
      <div className={classes["left-container"]}>
        <img src={logo} alt="logotype" className={classes.logotype} />
        <div className={classes["login-container"]}>
          <h3>Create New Chat</h3>
          <div className={classes["username-container"]}>
>>>>>>> 78bb925da507fc20385e4af4ef5b69b133878e54
            <label htmlFor="nickname">Nickname</label>
            <input
              type="text"
              name="nickname"
              id="nickname"
<<<<<<< HEAD
              placeholder='Enter your nickname'
              // label="Nickname"
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
              // label="Enter chatroom"
              onChange={(event) => {
                setUsername(event.target.value)
              }}
            />
          </div>
          <button> <a href="./chatRoom"> CONTINUE </a>  </button>
          <button>Existed rooms</button>
        </div>
      </div>
      <div className={classes['right-container']}>
        <h3>Free Online Chat Application</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem molestias nulla doloremque, quo rerum assumenda veritatis quam quasi. Vel maiores ex dolorum dolor unde corporis quos temporibus aspernatur.</p>
=======
              placeholder="Enter your nickname"
              // label="Nickname"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div className={classes["room-container"]}>
            <label htmlFor="room">Room Name</label>
            <input
              type="text"
              name="room"
              id="room"
              placeholder="Enter chatroom"
              // label="Enter chatroom"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <button className="continue-btn" type="submit">
            CONTINUE
          </button>
        </div>
      </div>
      <div className={classes["right-container"]}>
        <h3>Free Online Chat Application</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
          molestias nulla doloremque, quo rerum assumenda veritatis quam quasi.
          Vel maiores ex dolorum dolor unde corporis quos temporibus aspernatur.
        </p>
>>>>>>> 78bb925da507fc20385e4af4ef5b69b133878e54
      </div>
    </div>
  );
}

export default App;
