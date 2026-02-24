import React, { useState } from "react";

const ROWS = 6;
const COLS = 7;

const createBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(null));

const checkWinner = (board, row, col, player) => {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (let [dx, dy] of directions) {
    let count = 1;

    for (let dir of [-1, 1]) {
      let r = row + dx * dir;
      let c = col + dy * dir;

      while (
        r >= 0 &&
        r < ROWS &&
        c >= 0 &&
        c < COLS &&
        board[r][c] === player
      ) {
        count++;
        r += dx * dir;
        c += dy * dir;
      }
    }

    if (count >= 4) return true;
  }

  return false;
};

export default function ConnectFour() {
  const [board, setBoard] = useState(createBoard());
  const [currentPlayer, setCurrentPlayer] = useState("R");
  const [winner, setWinner] = useState(null);

  const handleColumnClick = (col) => {
    if (winner) return;

    const newBoard = board.map((row) => [...row]);

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);

        if (checkWinner(newBoard, row, col, currentPlayer)) {
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer(currentPlayer === "R" ? "Y" : "R");
        }
        return;
      }
    }
  };

  const resetGame = () => {
    setBoard(createBoard());
    setCurrentPlayer("R");
    setWinner(null);
  };

  return (
    <div style={styles.container}>
      <h1>Connect Four</h1>
      <p>
        {winner
          ? `Winner: ${winner === "R" ? "Red" : "Yellow"}`
          : `Current Player: ${currentPlayer === "R" ? "Red" : "Yellow"}`}
      </p>
      <button onClick={resetGame} style={styles.resetButton}>
        Reset Game
      </button>
      <div style={styles.board}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={styles.cell}
              onClick={() => handleColumnClick(colIndex)}
            >
              {cell && (
                <div
                  style={{
                    ...styles.piece,
                    backgroundColor: cell === "R" ? "red" : "gold",
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  board: {
    display: "grid",
    gridTemplateColumns: `repeat(${COLS}, 60px)`,
    gap: "5px",
    backgroundColor: "blue",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  cell: {
    width: "60px",
    height: "60px",
    backgroundColor: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  piece: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  resetButton: {
    marginTop: "10px",
    padding: "8px 16px",
    cursor: "pointer",
  },
};


