const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let cells = Array(9).fill("");
let gameActive = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function drawBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.textContent = cell;
    board.appendChild(div);
  });
}

drawBoard();

board.addEventListener("click", (e) => {
  if (!gameActive) return;

  const index = e.target.dataset.index;
  if (index === undefined || cells[index] !== "") return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    highlightWinCells();
    gameActive = false;
  } else if (!cells.includes("")) {
    statusText.textContent = "🤝 It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
});

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      winCombo = pattern;
      return true;
    }
    return false;
  });
}

function highlightWinCells() {
  winPatterns.forEach(pattern => {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      document.querySelector(`[data-index="${a}"]`).classList.add("win");
      document.querySelector(`[data-index="${b}"]`).classList.add("win");
      document.querySelector(`[data-index="${c}"]`).classList.add("win");
    }
  });
}

resetBtn.addEventListener("click", () => {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  drawBoard();
});
