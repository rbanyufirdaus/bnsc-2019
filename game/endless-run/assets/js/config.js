//Canvas Setting

let canvas = document.getElementById('board'),
    ctx = canvas.getContext('2d');

    canvas.width    = canvas.offsetWidth;
    canvas.height   = canvas.offsetHeight;

let WIDTH = canvas.width,
    HEIGHT = canvas.height;

    //Initialize dom variable
let btnStart     = document.getElementById('btnStart'),
    btnRestart  = document.getElementById('btnRestart'),
    startContainer   = document.getElementsByClassName('start-container')[0],
    pauseContainer   = document.getElementsByClassName('pause-container')[0],
    loseContainer   = document.getElementsByClassName('lose-container')[0],
    gameover   = document.getElementsByClassName('gameover')[0];

//Default game config
let HEALTH        = 3;
let GRAVITY     = 3;
let SPEED       = {
    fly : 6,
    bgBack : 2,
    bgMiddle : 4,
    bgFront : 6
};
