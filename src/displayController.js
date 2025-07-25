// displayController.js
import { GameController } from './gameController.js';
import { Gameboard } from './gameboard.js';

const DisplayController = (() => {
  const app = document.getElementById('app');

  let p1Score = 0;
  let p2Score = 0;

  const buildUI = () => {
    app.innerHTML = `
      <h1>Tic Tac Toe</h1>
      
      <div class="scoreboard">
        <p><span id="score-p1-name">Player 1</span>: <span id="score-p1">0</span></p>
        <p><span id="score-p2-name">Player 2</span>: <span id="score-p2">0</span></p>
      </div>
      
      <div class="board" id="board"></div>
      <div id="status" class="status"></div>
      
      <div class="inputs">
        <input type="text" id="player1" placeholder="Player 1 name" />
        <input type="text" id="player2" placeholder="Player 2 name" />
      </div>
      
      <div class="buttons">
        <button id="start">Start Game</button>
        <button id="reset">Reset</button>
      </div>
    `;
  };

  const handleClick = (e) => {
    const index = parseInt(e.target.dataset.index);
    const result = GameController.playTurn(index);
    renderBoard();

    const status = document.getElementById("status");

    if (result) {
      status.textContent = result.message;

      // Highlight winning combo
      if (result.combo) {
        result.combo.forEach(i => {
          document.querySelector(`[data-index='${i}']`).classList.add("winner");
        });
      }

      // Score update
      const winner = GameController.getCurrentPlayer();
      if (winner.getMark() === "X") p1Score++;
      else if (winner.getMark() === "O") p2Score++;
      updateScoreboard();
    } else {
      const current = GameController.getCurrentPlayer();
      status.textContent = `${current.getName()}'s turn (${current.getMark()})`;
    }
  };

  const renderBoard = () => {
    const board = Gameboard.getBoard();
    const boardEl = document.getElementById("board");
    boardEl.innerHTML = "";

    board.forEach((cell, i) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = cell;
      cellDiv.dataset.index = i;

      if (cell === "X") cellDiv.classList.add("x-cell");
      if (cell === "O") cellDiv.classList.add("o-cell");

      cellDiv.addEventListener("click", handleClick);
      boardEl.appendChild(cellDiv);
    });
  };

  const startGame = () => {
    const p1 = document.getElementById("player1").value || "Player 1";
    const p2 = document.getElementById("player2").value || "Player 2";

    // Save names to scoreboard
    document.getElementById("score-p1-name").textContent = p1;
    document.getElementById("score-p2-name").textContent = p2;

    GameController.startGame(p1, p2);
    renderBoard();
    document.getElementById("status").textContent = `${p1}'s turn (X)`;
  };

  const resetGame = () => {
    GameController.restart();
    renderBoard();
    const current = GameController.getCurrentPlayer();
    document.getElementById("status").textContent = `${current.getName()}'s turn (${current.getMark()})`;
  };

  const updateScoreboard = () => {
    document.getElementById("score-p1").textContent = p1Score;
    document.getElementById("score-p2").textContent = p2Score;
  };

  // Initialize everything
  buildUI();
  GameController.startGame("Player 1", "Player 2");
  renderBoard();
  document.getElementById("status").textContent = "Player 1's turn (X)";

  document.getElementById("start").addEventListener("click", startGame);
  document.getElementById("reset").addEventListener("click", resetGame);
})();

export { DisplayController };
