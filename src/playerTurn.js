// playerTurn.js

let currentPlayer = "X";

export function getCurrentPlayer() {
  return currentPlayer;
}

export function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

export function resetPlayer() {
  currentPlayer = "X";
}
