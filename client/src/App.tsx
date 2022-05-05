import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import ChatRoom from "./chatRoom";
import Rooms from "./Rooms";
import SocketContext from "./store/SocketContext"

import classes from "./App.module.css";
import SocketProvider from "./store/SocketProvider";

function App() {
  return (
    <SocketProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/chatRoom" element={<ChatRoom />} />
      </Routes>
    </SocketProvider>
  );
}

export default App;
