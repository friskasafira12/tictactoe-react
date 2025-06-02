// src/pages/Game.jsx
import React, { useState } from "react";
import "../styles/game.css";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState("easy");

  const handlePlay = () => {
    navigate("/gameplay", { state: { level: selectedLevel } }); // Kirim level ke gameplay
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="game-screen">
      <button className="back-button" onClick={handleBack}>
        &lt;&lt;
      </button>

      <div className="game-container enhanced">
        <h1 className="game-title neon-text">TIC TAC TOE</h1>

        <div className="level-buttons">
          <button
            className={`level-button ${selectedLevel === "easy" ? "active" : ""}`}
            onClick={() => setSelectedLevel("easy")}
          >
            Easy
          </button>
          <button
            className={`level-button ${selectedLevel === "medium" ? "active" : ""}`}
            onClick={() => setSelectedLevel("medium")}
          >
            Medium
          </button>
          <button
            className={`level-button ${selectedLevel === "hard" ? "active" : ""}`}
            onClick={() => setSelectedLevel("hard")}
          >
            Hard
          </button>
        </div>

        <button className="play-button pulse" onClick={handlePlay}>
          START GAME
        </button>
      </div>
    </div>
  );
};

export default Game;
