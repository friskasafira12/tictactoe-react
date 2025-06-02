import React from "react";
import Board from "../components/Board";
import { useNavigate } from "react-router-dom";
import "../styles/gameplay.css";

function Gameplay() {
  const navigate = useNavigate();

  return (
    <div className="gameplay-container">
      <button className="back-button" onClick={() => navigate("/")}>
        <strong>≪</strong>
      </button>
      <div className="board-wrapper">
      <button className="game-button-title">TIC TAC TOE</button>
    <Board />
  </div>

    </div>
  );
}

export default Gameplay;
