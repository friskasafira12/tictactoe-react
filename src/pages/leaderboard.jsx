// src/pages/Leaderboard.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "../styles/leaderboard.css";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const q = query(collection(db, "users"), orderBy("wins", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeaders(data);
    };

    fetchLeaders();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard</h2>
      <ul>
        {leaders.map((user, index) => (
          <li key={user.id}>
            #{index + 1} - {user.username} ({user.wins || 0} menang)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
