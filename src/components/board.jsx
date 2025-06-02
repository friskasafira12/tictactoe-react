// src/components/Board.jsx
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

  useEffect(() => {
    if (!xIsNext && !winnerInfo.winner) {
      const bestMove = findBestMove(squares);
      if (bestMove !== -1) {
        const newSquares = [...squares];
        newSquares[bestMove] = "O";
        setTimeout(() => {
          setSquares(newSquares);
          checkWinner(newSquares);
          setXIsNext(true);
        }, 500);
      }
    }
  }, [xIsNext, squares, winnerInfo.winner]);

  const handleClick = (index) => {
    if (squares[index] || winnerInfo.winner || !xIsNext) return;
    const newSquares = [...squares];
    newSquares[index] = "X";
    setSquares(newSquares);
    checkWinner(newSquares);
    setXIsNext(false);
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
    setXIsNext(true);
    setWinnerInfo({ winner: null, line: [] });
  };

  const renderSquare = (i) => {
    const isWinningSquare = winnerInfo.line.includes(i);
    return (
      <button
        key={i}
        className={`square ${isWinningSquare ? "winner-square" : ""}`}
        onClick={() => handleClick(i)}
      >
        {squares[i]}
      </button>
    );
  };

  // === 🧠 MINIMAX AI ===
  const findBestMove = (board) => {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "O";
        let score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const minimax = (board, depth, isMaximizing) => {
    const result = getWinner(board);
    if (result !== null) {
      const scores = {
        X: -1,
        O: 1,
        Draw: 0,
      };
      return scores[result];
    }

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = "O";
          best = Math.max(best, minimax(board, depth + 1, false));
          board[i] = null;
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = "X";
          best = Math.min(best, minimax(board, depth + 1, true));
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
    if (!board.includes(null)) {
      return "Draw";
    }
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
