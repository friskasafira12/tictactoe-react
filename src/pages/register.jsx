import React from 'react';
import './Register.css';

function Register() {
  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        <input type="text" placeholder="Username" className="register-input" />
        <input type="email" placeholder="Email" className="register-input" />
        <input type="password" placeholder="Password" className="register-input" />
        <button className="register-button">Register</button>
      </div>
    </div>
  );
}

export default Register;
