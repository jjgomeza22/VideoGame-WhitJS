const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const startGame = () => {
    let canvasSize;

    canvasSize = window.innerHeight * 0.8;
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    const elementSize = canvasSize / 10;
    console.log(elementSize);
    game.font = elementSize.toString() + 'px Verdana';
    game.textAlign = 'end';

    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementSize* i, elementSize);
    }
};

window.addEventListener('load', startGame);