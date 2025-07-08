import { board } from "./board";

let currentPlayer = "X";

function makeMove(position) {
    if (board[position] === " ") {
        board[position] = currentPlayer;
        return true;
    } else {
        console.log("That spot is already taken!");
        return false;
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    const winCombos = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // columns
        [0,4,8],[2,4,6]          // diagonals
    ];

    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (board[a] !== " " && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Return "X" or "O"
        }
    }
    return null;
}
export { makeMove, switchPlayer, checkWinner, currentPlayer };
