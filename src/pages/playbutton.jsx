// src/components/PlayButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function PlayButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/game")}
      style={{
        padding: "20px 40px",
        backgroundColor: "#f8a8d0",
        border: "none",
        borderRadius: "20px",
        fontSize: "24px",
        fontWeight: "bold",
        cursor: "pointer",
        color: "#1f1f1f",
        marginBottom: "20px",
      }}
    >
      PLAY GAME
    </button>
  );
}

export default PlayButton;
