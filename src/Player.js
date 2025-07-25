//player.js
const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {
        getMark,
        getName,
    };
};

export { Player };