import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import Rooms from "./Rooms";
import SocketProvider from "./store/SocketProvider";

function App() {
  return (
    <SocketProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
    </SocketProvider>
  );
}

export default App;
