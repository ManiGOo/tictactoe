// board.js
export function renderBoard(board, boardEl, handleClick) {
    boardEl.innerHTML = "";

    board.forEach((cell, index) => {
        const cellEl = document.createElement("div");
        cellEl.classList.add("cell");
        cellEl.textContent = cell;
        cellEl.dataset.index = index;

        cellEl.addEventListener("click", handleClick);
        boardEl.appendChild(cellEl);
    });
}
