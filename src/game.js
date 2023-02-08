const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const startGame = () => {
    game.fillRect(0,0, 100,100);
    game.clearRect(50,50, 100,100);
};

window.addEventListener('load', startGame);