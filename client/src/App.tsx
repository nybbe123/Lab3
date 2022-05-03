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
  if (connected) {
    body = {
      < Chat
    message = { message }
    handleMe
  }
}

return (
  <div>
    <h1>Hello world</h1>
    <h4>Enter Name:</h4>
    <input
      type="text"
      placeholder='John Wick...'
      onChange={(event) => {
        setUsername(event.target.value)
      }}
    />
    <input
      type="text"
      placeholder='Mancave 2.0...'
      onChange={(event) => {
        setUsername(event.target.value)
      }}
    />
    <button>JOIN</button>
  </div>
);
}

export default App;
