import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');

  const joinRoom = () => {

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
