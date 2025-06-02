import React from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // Fungsi untuk handle klik login
  const handleLogin = () => {
    // Ambil nilai username dari input
    const usernameInput = document.querySelector('.login-input[type="text"]');
    const username = usernameInput ? usernameInput.value.trim() : '';

    if (username === '') {
      alert('Masukkan username terlebih dahulu!');
      return;
    }

    // Simpan username ke localStorage
    localStorage.setItem('username', username);

    // Setelah login berhasil, pindah ke halaman landing page
    navigate('/');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-box">
          {/* Tombol back hanya untuk halaman login */}
          <button className="login-back-button" onClick={() => navigate('/')}>
            ←
          </button>

          <h2 className="login-title">Login</h2>

          <input type="text" className="login-input" placeholder="Username" />
          <input type="password" className="login-input" placeholder="Password" />

          {/* Tambahkan onClick handler di sini */}
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>

          <p className="register-text">
            Belum punya akun? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
