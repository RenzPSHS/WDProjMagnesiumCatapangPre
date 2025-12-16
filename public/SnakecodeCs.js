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
var highscore1 = 49;
var highscore2 = 47;
var highscore3 = 43;
var highscore4 = 39;
var highscore5 = 34;
var highscore6 = 33;
var highscore7 = 31;
var highscore8 = 25;
var highscore9 = 24;
var highscore10 = 22;
var highscore11 = 20;
var highscore12 = 19;
var highscore13 = 17;
var highscore14 = 16;
var highscore15 = 11;
var highscore16 = 10;
var highscore17 = 8;
var highscore18 = 7;
var highscore19 = 2;
var highscore20 = 1;

var playername;
var username1 = "Renz";
var username2 = "Enzo";
var username3 = "Sam";
var username4 = "Alex";
var username5 = "John";
var username6 = "Doe";
var username7 = "Jane";
var username8 = "Smith";
var username9 = "Emily";
var username10 = "Michael";
var username11 = "Sarah";
var username12 = "David";
var username13 = "Olivia";
var username14 = "Daniel";
var username15 = "Sophia";
var username16 = "James";
var username17 = "Isabella";
var username18 = "Ethan";
var username19 = "Mia";
var username20 = "Liam";



const lboard =[
    {name:username1, score: highscore1},
    {name:username2, score: highscore2},
    {name:username3, score: highscore3},
    {name:username4, score: highscore4},
    {name:username5, score: highscore5}
]


window.onload = function() {
play();
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
    this.setInterval(update, 1000/10); //100 ms
    this.setInterval(ArithmeticQuestions, 1000*30); //30 s
    this.setInterval(correctanswer, 1000*30); //30s
    this.setInterval(resetconditions, 1000*45); //45s
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
        ArithmeticQuestions();   // this runs the function
        if (sign == 1) {
        correct = num1 + num2;
        document.getElementById("questionbox").style.display = "flex";
        document.getElementById("question").textContent = "What is " + num1 + " + " + num2 + "?";  
        }
        else if (sign == 2) {
        correct = num1 - num2;
        document.getElementById("questionbox").style.display = "flex";
        document.getElementById("question").textContent = "What is " + num1 + " - " + num2 + "?";
        }
        else if (sign == 3) {
        correct = num1 * num2;
        document.getElementById("questionbox").style.display = "flex";
        document.getElementById("question").textContent = "What is " + num1 + " * " + num2 + "?";
        }
        else if (sign == 4) {
        correct = num1 / num2;
        document.getElementById("questionbox").style.display = "flex";
        document.getElementById("question").textContent = "What is " + num1 + " / " + num2 + "?";
        }
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
             playername = prompt("Please enter your username");
                if (score > highscore1 || score == highscore1) {
                    highscore20 = highscore19;
                    username20 = username19;

                    highscore19 = highscore18;
                    username19 = username18;

                    highscore18 = highscore17;
                    username18 = username17;

                    highscore17 = highscore16;
                    username17 = username16;

                    highscore16 = highscore15;
                    username16 = username15;

                    highscore15 = highscore14;
                    username15 = username14;

                    highscore14 = highscore13;
                    username14 = username13;

                    highscore13 = highscore12;
                    username13 = username12;

                    highscore12 = highscore11;
                    username12 = username11;

                    highscore11 = highscore10;
                    username11 = username10;

                    highscore10 = highscore9;
                    username10 = username9;

                    highscore9 = highscore8;
                    username9 = username8;

                    highscore8 = highscore7;
                    username8 = username7;

                    highscore7 = highscore6;
                    username7 = username6;

                    highscore6 = highscore5;
                    username6 = username5;

                    highscore5 = highscore4;
                    username5 = username4;

                    highscore4 = highscore3;
                    username4 = username3;

                    highscore3 = highscore2;
                    username3 = username2;

                    highscore2 = highscore1;
                    username2 = username1;

                    highscore1 = score;
                    username1 = playername;
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
    return num1, num2, sign, correct;
}

function correctanswer() {
    which = Math.floor(Math.random() * 4) + 1;
    if (which == 1) {
        button1.textContext = correct;
        button2.textcontext = correct + Math.floor(Math.random() * 30);
        button3.textcontext = correct - Math.floor(Math.random() * 30);
        button4.textcontext = correct / Math.floor(Math.random() * 30);

        correct1 = true;
        correct2 = false;
        correct3 = false;
        correct4 = false;
    }
    else if (which == 2) {
        button1.textContext = correct + Math.floor(Math.random() * 30);
        button2.textcontext = correct;
        button3.textcontext = correct - Math.floor(Math.random() * 30);
        button4.textcontext = correct / Math.floor(Math.random() * 30);
        
        correct2 = true;
        correct1 = true;
        correct3 = false;
        correct4 = false;
    }
    else if (which == 3) {
        button1.textcontext = correct + Math.floor(Math.random() * 30);
        button2.textcontext = correct - Math.floor(Math.random() * 30);
        button3.textcontext = correct;
        button4.textcontext = correct / Math.floor(Math.random() * 30);

        correct3 = true;
        correct1 = false;
        correct2 = false;
        correct4 = false;
    }
    else if (which == 4) {
        button1.textcontext = correct + Math.floor(Math.random() * 30);
        button2.textcontext = correct / Math.floor(Math.random() * 30);
        button3.textcontext = correct - Math.floor(Math.random() * 30);
        button4.textcontext = correct;

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
         this.setInterval(update, 1000/20); //50 ms
    }
    }

    function picker2() {
    if (correct2 == true) {
        correctans = true;
    }
    if (correct2 == false) {
        //double speed
         this.setInterval(update, 1000/20); //50 ms
    }
    }

    function picker3() {
    if (correct3 == true) {
        correctans = true;
    }
    if (correct3 == false) {
        //double speed
         this.setInterval(update, 1000/20); //50 ms
    }
    }

    function picker4() {
    if (correct4 == true) {
        correctans = true;
    }
    if (correct4 == false) {
        //double speed
         this.setInterval(update, 1000/20); //50 ms
    }
    }

    function resetconditions() {
        this.setInterval(update, 1000/10); //100 ms
        correctans = false;
    }

                    if (score > highscore1 || score == highscore1) {
                    highscore20 = highscore19;
                    username20 = username19;

                    highscore19 = highscore18;
                    username19 = username18;

                    highscore18 = highscore17;
                    username18 = username17;

                    highscore17 = highscore16;
                    username17 = username16;

                    highscore16 = highscore15;
                    username16 = username15;

                    highscore15 = highscore14;
                    username15 = username14;

                    highscore14 = highscore13;
                    username14 = username13;

                    highscore13 = highscore12;
                    username13 = username12;

                    highscore12 = highscore11;
                    username12 = username11;

                    highscore11 = highscore10;
                    username11 = username10;

                    highscore10 = highscore9;
                    username10 = username9;

                    highscore9 = highscore8;
                    username9 = username8;

                    highscore8 = highscore7;
                    username8 = username7;

                    highscore7 = highscore6;
                    username7 = username6;

                    highscore6 = highscore5;
                    username6 = username5;

                    highscore5 = highscore4;
                    username5 = username4;

                    highscore4 = highscore3;
                    username4 = username3;

                    highscore3 = highscore2;
                    username3 = username2;

                    highscore2 = highscore1;
                    username2 = username1;

                    highscore1 = score;
                    username1 = playername;
    }

    document.getElementById("scoreboard").textContent =
    "1 " + username1 + " " +  highscore1 + "\n" +
    "2 " + username2 + " " +  highscore2 + "\n" +
    "3 " + username3 + " " +  highscore3 + "\n" +
    "4 " + username4 + " " +  highscore4 + "\n" +
    "5 " + username5 + " " +  highscore5 + "\n" +
    "6 " + username6 + " " +  highscore6 + "\n" +
    "7 " + username7 + " " +  highscore7 + "\n" +
    "8 " + username8 + " " +  highscore8 + "\n" +
    "9 " + username9 + " " +  highscore9 + "\n" +
    "10 " + username10 + " " +  highscore10 + "\n" +
    "11 " + username11 + " " +  highscore11 + "\n" +
    "12 " + username12 + " " +  highscore12 + "\n" +
    "13 " + username13 + " " +  highscore13 + "\n" +
    "14 " + username14 + " " +  highscore14 + "\n" +
    "15 " + username15 + " " +  highscore15 + "\n" +
    "16 " + username16 + " " +  highscore16 + "\n" +
    "17 " + username17 + " " +  highscore17 + "\n" +
    "18 " + username18 + " " +  highscore18 + "\n" +
    "19 " + username19 + " " +  highscore19 + "\n" +
    "20 " + username20 + " " +  highscore20 + "\n";