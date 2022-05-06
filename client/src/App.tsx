import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import ChatRoom from "./ChatRoom";
import Rooms from "./Rooms";
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
