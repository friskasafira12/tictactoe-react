import React from "react";
import "./landingpage.css";

const LandingPage = () => {
  const handleStartGame = () => {
    // Ganti ke rute game kamu, misalnya /game
    window.location.href = "/game";
  };

  const handleTentang = () => {
    window.location.href = "/tentang";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="game-landing">
      <div className="overlay">
        <button className="start-button" onClick={handleStartGame}>
          Mulai Game
        </button>
      </div>
      <div className="tentang">
        <button className="tentang-button" onClick={handleStartGame}>
          Tentang
        </button>
      </div>
      <div className="login">
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
    
  );
};

export default LandingPage;
