// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLjKuZPFIWHS4Bf_St7tB7mqVt1wiiFr4",
  authDomain: "tictactoe-7c1e7.firebaseapp.com",
  projectId: "tictactoe-7c1e7",
  storageBucket: "tictactoe-7c1e7.firebasestorage.app",
  messagingSenderId: "519640247768",
  appId: "1:519640247768:web:482fe119ddc386a62c56ad",
  measurementId: "G-L28ZH16J68"
};

// ✅ Inisialisasi Firebase dulu
const app = initializeApp(firebaseConfig);

// ✅ Setelah app ada, baru pakai untuk fitur lainnya
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
