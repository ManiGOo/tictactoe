// gameController.js
import { Player } from "./Player.js";
import { Gameboard } from "./gameboard.js";

const GameController = (() => {
  let player1;
  let player2;
  let currentPlayer;
  let gameOver = false;
  let scores = { player1: 0, player2: 0, draws: 0 };

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

  const startGame = (name1 = "Player 1", name2 = "Player 2") => {
    player1 = Player(name1, "X");
    player2 = Player(name2, "0");
    currentPlayer = player1;
    gameOver = false;
    Gameboard.reset();
  };

  const getCurrentPlayer = () => currentPlayer;
  const getScores = () => scores;
  const getPlayers = () => ({ player1, player2 });

  const checkWinner = () => {
    const board = Gameboard.getBoard();
    for (const combo of winningCombos) {
      if (combo.every(index => board[index] === currentPlayer.getMark())) {
        return combo;
      }
    }
    return null;
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const playTurn = (index) => {
    if (gameOver || !Gameboard.placeMark(index, currentPlayer.getMark())) return;

    const winnerCombo = checkWinner();
    if (winnerCombo) {
      gameOver = true;
      if (currentPlayer === player1) {
        scores.player1 += 1;
      } else {
        scores.player2 += 1;
      }
      return { message: `${currentPlayer.getName()} wins!`, combo: winnerCombo };
    }

    if (Gameboard.isFull()) {
      gameOver = true;
      scores.draws += 1;
      return { message: "It's a draw!" };
    }

    switchPlayer();
    return null;
  };

  const isGameOver = () => gameOver;

  const restart = () => {
    Gameboard.reset();
    currentPlayer = player1;
    gameOver = false;
  };

  return {
    startGame,
    playTurn,
    getCurrentPlayer,
    isGameOver,
    restart,
    getScores,
    getPlayers,
  };
})();

export { GameController };
