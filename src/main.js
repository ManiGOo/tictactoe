import "./style.css"
import { renderBoard } from './board.js';
import { checkWinner, isDraw } from './game.js';
import { getCurrentPlayer, switchPlayer, resetPlayer } from './playerTurn.js';

let board = Array(9).fill("");
let gameActive = false;

document.getElementById('app').innerHTML = `
  <h1>Tic Tac Toe</h1>
  <div class="board" id="board"></div>
  <div id="status"></div>
  <button id="start">Start Game</button>
  <button id="reset">Reset Game</button>
`;

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");

// Start Game
startBtn.addEventListener("click", () => {
  board = Array(9).fill("");
  resetPlayer();
  gameActive = true;
  statusEl.textContent = `${getCurrentPlayer()}'s turn`;
  renderBoard(board, boardEl, handleClick);
});

// Reset Game
resetBtn.addEventListener("click", () => {
  board = Array(9).fill("");
  resetPlayer();
  gameActive = false;
  boardEl.innerHTML = "";
  statusEl.textContent = "Click 'Start Game' to begin.";
});

// Handle Moves
function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index] !== "") return;

  const currentPlayer = getCurrentPlayer();
  board[index] = currentPlayer;
  renderBoard(board, boardEl, handleClick); // re-render to show move

  if (checkWinner(board)) {
    statusEl.textContent = `${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (isDraw(board)) {
    statusEl.textContent = "It's a draw! 😐";
    gameActive = false;
  } else {
    switchPlayer();
    statusEl.textContent = `${getCurrentPlayer()}'s turn`;
  }
}

// Initial Status
statusEl.textContent = "Click 'Start Game' to begin.";
