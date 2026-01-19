//NOTE FOR RENZ THE LAST THING FOR THIS FILE IS TO DISPLAY THE QUESTIONS, and DISPLAY THE OPTIONS ON THE QUESTIONS and DISPLAY SCORE.


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
var correctans;

var gameOver = false;

var score = 0;
var highscore1 = 0;
var highscore2 = 0;
var highscore3 = 0;
var highscore4 = 0;
var highscore5 = 0;

var username1;
var username2;
var username3;
var username4;
var username5;

const lboard =[
    {name:username1, score: highscore1},
    {name:username2, score: highscore2},
    {name:username3, score: highscore3},
    {name:username4, score: highscore4},
    {name:username5, score: highscore5}
]

var correct;

window.onload = function() {
play();
ArithmeticQuestions();
correctanswer();
var restartbutton = document.getElementById("restartbutton");
restartbutton.addEventListener("click", play)

var button1 = document.getElementById("button1");
button1.addEventListener("click", picker1)

var button2 = document.getElementById("button2");
button2.addEventListener("click", picker2)

var button3 = document.getElementById("button3");
button3.addEventListener("click", picker3)

var button4 = document.getElementById("button4");
button4.addEventListener("click", picker4)
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
    setInterval(update, 1000/10); //100 ms
    setInterval(ArithmeticQuestions, 1000*30); //30 s
    setInterval(correctanswer, 1000*30); //30s
    setInterval(resetconditions, 1000*5); //5s
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
        if (correctans == true) {
        if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX,foodY])
        snakeBody.push([foodX + 1,foodY + 1])
        placeFood();
        score = score + 2;
        }
    }
        else {
        snakeBody.push([foodX,foodY])
        placeFood();
        score++;
        }
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
    if (gameOver == true) {
        if (score > highscore1) {
            highscore2 = highscore1;
            highscore3 = highscore2;
            highscore4 = highscore3;
            highscore5 = highscore4;
            highscore1 = score;

            username2 = username1;
            username3 = username2;
            username4 = username3;
            username5 = username4;
             username1 = prompt("Please enter your username");
        }
         if (score > highscore2) {
            highscore3 = highscore2;
            highscore4 = highscore3;
            highscore5 = highscore4;
            highscore2 = score;

            username3 = username2;
            username4 = username3;
            username5 = username4;
             username2 = prompt("Please enter your username");
        }
         if (score > highscore3) {
            highscore4 = highscore3;
            highscore5 = highscore4;
            highscore3 = score;

            username4 = username3;
            username5 = username4;
             username3 = prompt("Please enter your username");
        }
         if (score > highscore4) {
            highscore5 = highscore4;
            highscore4 = score;

            username5 = username4;
             username4 = prompt("Please enter your username");
        }
         if (score > highscore5) {
            highscore5 = score;

             username5 = prompt("Please enter your username");
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

function ArithmeticQuestions() {
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
}

function correctanswer() {
    which = Math.floor(Math.random() * 4) + 1;
    if (which == 1) {
        button1.textContent = correct;
        button2.textContent = correct + Math.floor(Math.random() * 30);
        button3.textContent = correct - Math.floor(Math.random() * 30);
        button4.textContent = correct / Math.floor(Math.random() * 30);

        correct1 = true;
        correct2 = false;
        correct3 = false;
        correct4 = false;
    }
    else if (which == 2) {
        button1.textContent = correct + Math.floor(Math.random() * 30);
        button2.textContent = correct;
        button3.textContent = correct - Math.floor(Math.random() * 30);
        button4.textContent = correct / Math.floor(Math.random() * 30);
        
        correct2 = true;
        correct1 = true;
        correct3 = false;
        correct4 = false;
    }
    else if (which == 3) {
        button1.textContent = correct + Math.floor(Math.random() * 30);
        button2.textContent = correct - Math.floor(Math.random() * 30);
        button3.textContent = correct;
        button4.textContent = correct / Math.floor(Math.random() * 30);

        correct3 = true;
        correct1 = false;
        correct2 = false;
        correct4 = false;
    }
    else if (which == 4) {
        button1.textContent = correct + Math.floor(Math.random() * 30);
        button2.textContent = correct / Math.floor(Math.random() * 30);
        button3.textContent = correct - Math.floor(Math.random() * 30);
        button4.textContent = correct;

        correct4 = true;
        correct1 = false;
        correct2 = false;
        correct3 = false;
    }

}

    function picker1() {
    if (correct1 == true) {
        correctans = true;
    }
    if (correct1 == false) {
        //double speed
         setInterval(update, 1000/20); //50 ms
    }
    }

    function picker2() {
    if (correct2 == true) {
        correctans = true;
    }
    if (correct2 == false) {
        //double speed
         setInterval(update, 1000/20); //50 ms
    }
    }

    function picker3() {
    if (correct3 == true) {
        correctans = true;
    }
    if (correct3 == false) {
        //double speed
         setInterval(update, 1000/20); //50 ms
    }
    }

    function picker4() {
    if (correct4 == true) {
        correctans = true;
    }
    if (correct4 == false) {
        //double speed
         setInterval(update, 1000/20); //50 ms
    }
    }

    function resetconditions() {
        setInterval(update, 1000/10); //100 ms
        correctans = false;
    }
