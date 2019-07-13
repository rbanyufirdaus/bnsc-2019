// Game control
let game = new Game();

window.addEventListener('keydown', (e) =>{
    switch(e.keyCode){
        case 80 : // key P
            game.pause();
            break;
    }
});

//Handle mouse click on canvas
canvas.addEventListener('mousedown', ()=>{
    game.handleDown();
});

canvas.addEventListener('mouseup', ()=>{
    game.handleUp();
});

btnStart.addEventListener('click', () => {
    startContainer.setAttribute('class', 'start-container hidden');
    game.init();
});

btnRestart.addEventListener('click', () => {
    game = new Game();
    game.init();

    canvas.setAttribute('class', '');
    loseContainer.setAttribute('class', 'lose-container hidden');
    gameover.setAttribute('class', 'gameover hidden');
});
