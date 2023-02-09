const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

const startGame = () => {
    game.font = (elementSize - constants.iconSize) + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[constants.mapNumber];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    const x = elementSize + 0.5;
    const y = elementSize - 1.5;
    mapRowCols.forEach((row, indexRow) => {
        row.forEach((col, indexCol) => {
            game.fillText(emojis[col], x*(indexCol + 1), y*(indexRow + 1));
        });
    });
};

const setCanvasSize = () => {
    canvasSize = window.innerHeight * 0.8;
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize / constants.iconNumber;
    startGame();
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);