import React, { useState, useEffect } from "react";
import "../styles/board.css";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState({ winner: null, line: [] });
  const [playerSymbol, setPlayerSymbol] = useState("X");
  const [difficulty, setDifficulty] = useState("easy");

  useEffect(() => {
    const selectedLevel = localStorage.getItem("level") || "easy";
    setDifficulty(selectedLevel);
    setPlayerSymbol(Math.random() < 0.5 ? "X" : "O");
  }, []);

  useEffect(() => {
    if (!winnerInfo.winner && (xIsNext !== (playerSymbol === "X"))) {
      const aiSymbol = playerSymbol === "X" ? "O" : "X";
      const move = getAIMove(squares, aiSymbol, difficulty);
      if (move !== -1) {
        const newSquares = [...squares];
        newSquares[move] = aiSymbol;
        setTimeout(() => {
          setSquares(newSquares);
          checkWinner(newSquares);
          setXIsNext(!xIsNext);
        }, 400);
      }
    }
  }, [xIsNext, playerSymbol, difficulty, squares, winnerInfo.winner]);

  const handleClick = (i) => {
    if (squares[i] || winnerInfo.winner || xIsNext !== (playerSymbol === "X")) return;
    const newSquares = [...squares];
    newSquares[i] = playerSymbol;
    setSquares(newSquares);
    checkWinner(newSquares);
    setXIsNext(!xIsNext);
  };

  const checkWinner = (board) => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinnerInfo({ winner: board[a], line: combo });
        return;
      }
    }
    if (!board.includes(null)) {
      setWinnerInfo({ winner: "Draw", line: [] });
    }
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setWinnerInfo({ winner: null, line: [] });
    setPlayerSymbol(Math.random() < 0.5 ? "X" : "O");
    setXIsNext(true);
  };

  const renderSquare = (i) => {
    const isWinning = winnerInfo.line.includes(i);
    return (
      <button
        key={i}
        className={`square ${isWinning ? "winner-square" : ""}`}
        onClick={() => handleClick(i)}
      >
        {squares[i]}
      </button>
    );
  };

  const getAIMove = (board, aiSymbol, level) => {
    const availableMoves = board.map((val, idx) => (val === null ? idx : null)).filter(i => i !== null);

    if (level === "easy") {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    if (level === "medium") {
      const chance = Math.random();
      if (chance < 0.3) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
      } else {
        return findBestMove(board, aiSymbol);
      }
    }

    // Hard: selalu cari skor terbaik + paling cepat menang
    return findBestMove(board, aiSymbol, true);
  };

  const findBestMove = (board, aiSymbol, isHard = false) => {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = aiSymbol;
        const score = minimax(board, 0, false, aiSymbol, isHard);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const minimax = (board, depth, isMaximizing, aiSymbol, isHard = false) => {
    const playerSymbol = aiSymbol === "X" ? "O" : "X";
    const winner = getWinner(board);

    if (winner !== null) {
      const scores = {
        [aiSymbol]: 10 - depth,
        [playerSymbol]: depth - 10,
        Draw: 0,
      };
      return isHard ? scores[winner] : (winner === aiSymbol ? 1 : winner === playerSymbol ? -1 : 0);
    }

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = aiSymbol;
          best = Math.max(best, minimax(board, depth + 1, false, aiSymbol, isHard));
          board[i] = null;
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = playerSymbol;
          best = Math.min(best, minimax(board, depth + 1, true, aiSymbol, isHard));
          board[i] = null;
        }
      }
      return best;
    }
  };

  const getWinner = (board) => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (!board.includes(null)) return "Draw";
    return null;
  };

  return (
    <div className="board-container">
      <div className="turn-info">
        {winnerInfo.winner
          ? winnerInfo.winner === "Draw"
            ? "Hasil: Seri!"
            : `Pemenang: ${winnerInfo.winner}`
          : `Giliran: ${xIsNext ? "X" : "O"}`}
      </div>
      <div className="board-grid">
        {squares.map((_, i) => renderSquare(i))}
      </div>
      {winnerInfo.winner && (
        <button className="restart-button" onClick={restartGame}>
          Ulangi Game
        </button>
      )}
    </div>
  );
}

export default Board;
