//gameboard.js
const Gameboard = (() => {
    const board = Array(9).fill("");

    const getBoard = () => [...board];


    const placeMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };

    const isFull = () => board.every(cell => cell !== "");

    const reset = () => board.fill("");

    const print = () => console.log(board);

    return {
        getBoard,
        placeMark,
        isFull,
        reset,
        print
    };
})();

export { Gameboard };