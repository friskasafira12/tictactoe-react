import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landingpage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleStartGame = () => {
    navigate("/game");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
  };

  const handleUsernameClick = () => {
    setNewUsername(username);
    setEditing(true);
  };

  const handleSaveUsername = () => {
    if (newUsername.trim() !== "") {
      localStorage.setItem("username", newUsername);
      setUsername(newUsername);
    }
    setEditing(false);
  };

  return (
    <div className="game-landing">
      {username && (
        <div className="username-display" onClick={handleUsernameClick}>
          {username}
        </div>
      )}

      {editing && (
        <>
          <input
            type="text"
            className="username-edit-input"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            autoFocus
          />
          <button className="save-username-button" onClick={handleSaveUsername}>
            SIMPAN
          </button>
        </>
      )}

      <div className="button-container">
        <button className="start-button" onClick={handleStartGame}>
          Mulai Game
        </button>

        {username ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
