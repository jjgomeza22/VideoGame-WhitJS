const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

const lives = document.querySelector('#lives');
const time = document.querySelector('#time');
const recordH = document.querySelector('#record');

let timeStart;
let timeLayer;
let timeInterval;
let currentTime;

let canvasSize;
let elementSize;

let x;
let y;

const playerPosition = {
    x: undefined,
    y: undefined
};

const giftPosition = {
    x: undefined,
    y: undefined
};

let bombsPosition = [
    {
        x: undefined,
        y: undefined
    },
];

const levelUp = () => {
    const xEquals = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
    const yEquals = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
    if (xEquals && yEquals) {
        constants.mapNumber += 1;
        startGame();
    }
};

const levelDown = () => {
    const bombColision = bombsPosition.find(bomb => {
        const xbombColision = bomb.x.toFixed(2) == playerPosition.x.toFixed(2);
        const ybombColision = bomb.y.toFixed(2) == playerPosition.y.toFixed(2);
        return xbombColision && ybombColision;
    });
    if (!!bombColision) {
        constants.lives--;

        if (constants.lives <= 0){
            constants.mapNumber = 0;
            constants.lives = 3;
            timeStart = undefined;
        }

        playerPosition.x = undefined;
        playerPosition.y = undefined;
        startGame();
    }
};

const printPlayer = () => {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
    levelUp();
    levelDown();
};

const setIconPositions = (col, posX, posY) => {
    if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
            playerPosition.x = posX;
            playerPosition.y = posY;
        }
    } else if (col == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
    } else if (col == 'X') {
        bombsPosition.push({
            x: posX,
            y: posY,
        });
    }
};

const setRecord = () => {
    let record = localStorage.getItem('record');
    record = !! record? Number(record) * 0.001  : '';
    recordH.innerText = record + ' Seg';
};

const saveRecordInStorage = () => {
    const record = localStorage.getItem('record');
    const newRecord = (Date.now() - timeStart).toFixed(2);
    if (!record) {
        localStorage.setItem('record', newRecord);
    } else {
        if (Number(record) >= newRecord)
            localStorage.setItem('record', newRecord);
    }

};

const winGame = () => {
    saveRecordInStorage();
    clearInterval(timeInterval);
};

const showLives = () => {
    lives.innerText = emojis['HEART'].repeat(constants.lives);
};

const showTime = () => {
    const timeInSeg = (Date.now() - timeStart) * 0.001;
    time.innerText = timeInSeg.toFixed(2) + ' Seg';
};

const startGame = () => {
    game.font = (elementSize - constants.iconSize) + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[constants.mapNumber];
    if(!map) {
        winGame();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
            setRecord();
    }

    showLives();
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    game.clearRect(0,0 , canvasSize, canvasSize);
    bombsPosition = [];
    mapRowCols.forEach((row, indexRow) => {
        row.forEach((col, indexCol) => {
            const posX = x*(indexCol + 1);
            const posY = y*(indexRow + 1);
            game.fillText(emojis[col], posX, posY);
            setIconPositions(col, posX, posY);
        });
    });
    printPlayer();
};

const setCanvasSize = () => {
    canvasSize = window.innerHeight * constants.vh;
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * constants.vh;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize / constants.iconNumber;
    x = elementSize + 0.5;
    y = elementSize - 1.5;

    playerPosition.x = undefined;
    playerPosition.y = undefined;

    startGame();
};

const moveUp = () => {
    const pos = playerPosition.y - y;
    if (!(pos < y)){
        playerPosition.y -= y;
        startGame();
    }
};
const moveLeft = () => {
    const pos = playerPosition.x - x;
    if (!(pos < x)){
        playerPosition.x -= x;
        startGame();
    }
};
const moveRight = () => {
    const pos = playerPosition.x + x;
    if (!(pos > canvasSize + x)){
        playerPosition.x += x;
        startGame();
    }
};
const moveDown = () => {
    const pos = playerPosition.y + y;
    if (!(pos > canvasSize)){
        playerPosition.y += y;
        startGame();
    }
};

const movePlayer = (evt) => {
    key = evt.key;

    if (key == 'ArrowUp') moveUp();

    else if (key == 'ArrowLeft') moveLeft();

    else if (key == 'ArrowRight') moveRight();

    else if (key == 'ArrowDown') moveDown();

};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
window.addEventListener('keydown', movePlayer);

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);