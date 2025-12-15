
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;


//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;

//snake body
var snakeBody = [];

//food 
var foodX;
var foodY;

var which;

var gameOver = false;

//default math arithmetic
num1 = Math.floor(Math.random() * 10000);
num2 = Math.floor(Math.random() * 10000);
sign = Math.floor(Math.random() * 4) + 1;
    if (sign == 1) {
    correct = num1 + num2;  
    }
    else if (sign == 2) {
    correct = num1 - num2;
    }
    else if (sign == 3) {
    correct = num1 * num2;
    }
    else if (sign == 4) {
    correct = num1 / num2;
    }


window.onload = function() {
play();
restartbutton = document.getElementById("restartbutton");
restartbutton.addEventListener("click", play)
button1 = document.getElementById("button1");
button2 = document.getElementById("button2");
button3 = document.getElementById("button3");
button4 = document.getElementById("button4");
}

function play() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    snakeX = (blockSize * 5);
    snakeY = (blockSize * 5);
    gameOver = false;

    placeFood();
    document.addEventListener("keyup", changeDirection)
    //update();
    this.setInterval(update, 1000/10); //100 ms
    return;
}

function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);
    
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX,foodY])
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert ("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert ("Game Over");
        }
    }
}

function changeDirection(e) {
    if ((e.code == "ArrowUp" && velocityY == 0) || (e.code == "KeyW" && velocityY == 0) ) {
        velocityX = 0;
        velocityY = -1; 
        
    }
    else if ((e.code == "ArrowDown" && velocityY == 0) || (e.code == "KeyS" && velocityY == 0)) {
        velocityX = 0;
        velocityY = 1; 
    }
    else if ((e.code == "ArrowLeft" && velocityX == 0) || (e.code == "KeyA" && velocityX == 0)) {
        velocityX = -1;
        velocityY = 0; 
    }
    else if ((e.code == "ArrowRight" && velocityX == 0) || (e.code == "KeyD" && velocityX == 0)) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

//The Bug could be fixed, but we don't have enough time

function correctanswer() {
    which = Math.floor(Math.random() * 4) + 1;
    if (which == 1) {
        button1.textcontext = correct;
        button2.textcontext = correct + Math.floor(Math.random() * 30);
        button3.textcontext = correct - Math.floor(Math.random() * 30);
        button4.textcontext = correct / Math.floor(Math.random() * 30);

        correct1 = true;
    }
    else if (which == 2) {
        button1.textcontext = correct + Math.floor(Math.random() * 30);
        button2.textcontext = correct;
        button3.textcontext = correct - Math.floor(Math.random() * 30);
        button4.textcontext = correct / Math.floor(Math.random() * 30);
        
        correct2 = true;
    }
    else if (which == 3) {
        button1.textcontext = correct + Math.floor(Math.random() * 30);
        button2.textcontext = correct - Math.floor(Math.random() * 30);
        button3.textcontext = correct;
        button4.textcontext = correct / Math.floor(Math.random() * 30);

        correct3 = true;
    }
    else if (which == 4) {
        button1.textcontext = correct + Math.floor(Math.random() * 30);
        button2.textcontext = correct / Math.floor(Math.random() * 30);
        button3.textcontext = correct - Math.floor(Math.random() * 30);
        button4.textcontext = correct;

        correct4 = true;
    }
}

