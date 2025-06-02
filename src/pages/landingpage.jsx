import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landingpage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Cek apakah ada username di localStorage saat komponen mount
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
    // Hapus username dari localStorage dan update state
    localStorage.removeItem("username");
    setUsername(null);
  };

  return (
    <div className="game-landing">
      <div className="button-container">
        <button className="start-button" onClick={handleStartGame}>
          Mulai Game
        </button>

        {/* Jika username ada, tampilkan tombol username dan tombol logout */}
        {username ? (
          <>
            <button className="username-button">{username}</button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
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
