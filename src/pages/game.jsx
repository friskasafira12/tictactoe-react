import React from "react";
import "../styles/game.css";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate("/gameplay"); 
  };

  const handleBack = () => {
    navigate("/"); // Ganti "/" sesuai rute halaman sebelumnya jika perlu
  };

  return (
    <div className="game-screen">
      {/* Tombol back, disamakan persis dengan gameplay */}
      <button className="back-button" onClick={handleBack}>
        &lt;&lt;
      </button>

      <div className="game-container enhanced">
        <h1 className="game-title neon-text">TIC TAC TOE</h1>
        <button className="play-button pulse" onClick={handlePlay}>
          START GAME
        </button>
      </div>
    </div>
  );
};

export default Game;
