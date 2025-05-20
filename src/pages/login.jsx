import React, { useState } from "react";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <input
          type="text"
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button">Login</button>
        <div className="register-text">
          Belum mempunyai akun? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
