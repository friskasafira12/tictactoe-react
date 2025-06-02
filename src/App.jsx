import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Login from "./pages/login";
import Register from "./pages/register";
import Game from "./pages/game";         // Halaman dengan tombol PLAY GAME
import Gameplay from "./pages/gameplay"; // Halaman yang menampilkan papan permainan

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<Game />} />
        <Route path="/gameplay" element={<Gameplay />} />
        
      </Routes>
    </Router>
  );
}

export default App;
