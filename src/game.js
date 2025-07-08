import { printBoard } from "./board";
import { makeMove, switchPlayer, checkWinner, currentPlayer } from "./playerTurn";

function startGame() {
    let turns = 0;
    while (turns < 9) {
        printBoard();
        let move = prompt(`${currentPlayer}'s turn (0-8):`);
        move = parseInt(move);

        if (move >= 0 && move <= 8 && makeMove(move)) {
            let winner = checkWinner();
            if (winner) {
                printBoard();
                console.log(`${winner} wins! 🎉`);
                return;
            }
            switchPlayer();
            turns++;
        } else {
            console.log("Invalid move. Try again.");
        }
    }
    printBoard();
    console.log("It's a draw! 🫱🫲");
}

export { startGame }