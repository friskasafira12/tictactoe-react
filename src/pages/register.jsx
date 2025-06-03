import React, { useState } from 'react';
import "../styles/register.css";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError(""); // Reset pesan error

    // Validasi: semua field harus diisi
    if (!username || !email || !password) {
      setError("Semua field harus diisi.");
      return;
    }

    // Validasi: username hanya huruf/angka (tanpa simbol)
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      setError("Username hanya boleh huruf, angka, dan underscore (_).");
      return;
    }

    try {
      // Cek apakah username sudah digunakan
      const usernameSnapshot = await getDoc(doc(db, "usernames", username));
      if (usernameSnapshot.exists()) {
        setError("Username sudah digunakan.");
        return;
      }

      // Daftarkan user di Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Simpan user ke koleksi "users"
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        wins: 0,
      });

      // Simpan username untuk pengecekan unik
      await setDoc(doc(db, "usernames", username), {
        uid: user.uid,
      });

      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      console.error("Kode error:", err, err.code);
      let errorMessage = "Terjadi kesalahan saat registrasi.";

      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email sudah terdaftar.";
          break;
        case "auth/invalid-email":
          errorMessage = "Format email tidak valid.";
          break;
        case "auth/weak-password":
          errorMessage = "Password harus minimal 6 karakter.";
          break;
        default:
          errorMessage = err.message;
          break;
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-box">
          <div className="button-X">
            <button className="back-button" onClick={() => navigate('/login')}>←</button>
          </div>
          <h2 className="register-title">Register</h2>

          <input
            type="text"
            placeholder="Username"
            className="register-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="register-button" onClick={handleRegister}>REGISTER</button>

          <p className="login-link">
            Sudah punya akun? <a href="/login">Login</a>
          </p>

          {error && <p className="error-text">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Register;
