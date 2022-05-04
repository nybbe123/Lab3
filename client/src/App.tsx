import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import ChatRoom from "./ChatRoom";
import Rooms from "./Rooms";

import classes from "./App.module.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/chatRoom" element={<Rooms />} />
      <Route path="/rooms" element={<ChatRoom />} />
    </Routes>
  );
}

export default App;
