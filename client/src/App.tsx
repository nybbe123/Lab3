import React, { useState } from "react";
import io from "socket.io-client";
import immer from "immer";

const socket = io('http://localhost:6001');

const initalMessagesState = {
  general: [],
  channel2: [],
  athirdchannel: []
}

function App() {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [currentChat, setCurrentChat] = useState({ isChannel: true, chatId: "general", recieverId: "" });
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
    <div>
      <h1>Chathouse</h1>
      <h4>Enter Name:</h4>
      <input
        type="text"
        placeholder='Enter your nickname'
        // label="Nickname"
        onChange={(event) => {
          setUsername(event.target.value)
        }}
      />
      <h4>Enter chatroom</h4>
      <input
        type="text"
        placeholder='Chatroom'
        // label="Enter chatroom"
        onChange={(event) => {
          setUsername(event.target.value)
        }}
      />
      <button>JOIN</button>
    </div>
  );
}

export default App;
