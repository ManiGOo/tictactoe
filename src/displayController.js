// displayController.js
import { GameController } from './gameController.js';
import { Gameboard } from './gameboard.js';

const DisplayController = (() => {
  const app = document.getElementById('app');

  // 💡 Inject full UI
  const buildUI = () => {
    app.innerHTML = `
      <h1>Tic Tac Toe</h1>
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

  // ...existing code...

  const handleClick = (e) => {
    const index = parseInt(e.target.dataset.index);
    const result = GameController.playTurn(index);
    renderBoard();

    const status = document.getElementById("status");
    if (result) {
      status.textContent = result.message;
      if (result.combo) {
        result.combo.forEach(i => {
          document.querySelector(`[data-index='${i}']`).classList.add("winner");
        });
      }
    } else {
      const current = GameController.getCurrentPlayer();
      status.textContent = `${current.getName()}'s turn (${current.getMark()})`;
    }
  };

  // ...existing code...
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

  // 🧠 Initialize everything
  buildUI();
  GameController.startGame("Player 1", "Player 2");
  renderBoard();
  document.getElementById("status").textContent = "Player 1's turn (X)";

  // 🧠 Add Event Listeners
  document.getElementById("start").addEventListener("click", startGame);
  document.getElementById("reset").addEventListener("click", resetGame);
})();

export { DisplayController }