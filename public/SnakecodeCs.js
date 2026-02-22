// --- GAME VARIABLES ---
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

var snakeX, snakeY;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];

// Book Image loading
var bookImg = new Image();
bookImg.src = "../assets/Book.png"; 

var foods = [];
var maxFoods = 1; 

var score = 0;
var gameOver = false;
var isPaused = false; 

// Interval & Timer Management
var gameIntervalId;
var questionTimerId; 
var penaltyTimerId;  

// Game Settings (Loaded from Local Storage)
var baseSpeedMs = 100; 
var timeLimitSeconds = 0; 
var isPenalized = false; 

// --- INITIALIZATION ---
window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    // Load custom settings from memory
    loadGameSettings();

    // Event Listeners
    document.getElementById("restartbutton").addEventListener("click", handleRestartClick);
    document.addEventListener("keyup", changeDirection);

    // Math Answer Buttons
    document.getElementById("button1").addEventListener("click", function() { checkAnswer(this.isCorrect); });
    document.getElementById("button2").addEventListener("click", function() { checkAnswer(this.isCorrect); });
    document.getElementById("button3").addEventListener("click", function() { checkAnswer(this.isCorrect); });
    document.getElementById("button4").addEventListener("click", function() { checkAnswer(this.isCorrect); });

    // Initial Start
    play();
}

function loadGameSettings() {
    // 1. Get Snake Speed (Handles 0 correctly)
    let savedSpeed = parseInt(localStorage.getItem('setting_snakeSpeed'));
    if (isNaN(savedSpeed)) savedSpeed = 50;
    baseSpeedMs = 150 - savedSpeed;

    // 2. Get Time Limit (Handles 0 correctly)
    let savedTime = parseInt(localStorage.getItem('setting_timeLimit'));
    if (isNaN(savedTime)) savedTime = 25;
    
    if (savedTime === 0) timeLimitSeconds = 10;
    else if (savedTime === 25) timeLimitSeconds = 30;
    else if (savedTime === 50) timeLimitSeconds = 60;
    else if (savedTime === 75) timeLimitSeconds = 90;
    else if (savedTime === 100) timeLimitSeconds = 0; // Infinite

    // 3. Get Spawning Rate (Default to 25/Low if empty)
    let savedSpawn = parseInt(localStorage.getItem('setting_spawnRate'));
    if (isNaN(savedSpawn)) savedSpawn = 25;
    maxFoods = savedSpawn / 25; 
}

function setGameSpeed(speedMs) {
    if (gameIntervalId) clearInterval(gameIntervalId);
    if (!isPaused && !gameOver) {
        gameIntervalId = setInterval(update, speedMs);
    }
}

// --- CORE GAME LOOP ---
function play() {
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    snakeX = (blockSize * 5);
    snakeY = (blockSize * 5);
    score = 0;
    gameOver = false;
    isPaused = false;
    isPenalized = false;
    
    document.getElementById("scoreDisplay").innerText = "Score: " + score;
    document.getElementById("question").innerText = "Eat a book to get a question!";
    clearQuestionTimer();
    if (penaltyTimerId) clearInterval(penaltyTimerId);

    foods = [];
    placeFood();
    
    setGameSpeed(baseSpeedMs);
}

function update() {
    if (gameOver || isPaused) return;

    // A. Draw the main board (Background)
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    
    // B. Draw the books with their white background squares
    for (let i = 0; i < foods.length; i++) {
        // Draw the background tile first
        context.fillStyle = "red"; 
        context.fillRect(foods[i].x, foods[i].y, blockSize, blockSize);
        
        // Draw the book image on top
        context.drawImage(bookImg, foods[i].x, foods[i].y, blockSize, blockSize);
    }
    
    // C. Check if snake head hits any book
    let ateFoodIndex = -1;
    for (let i = 0; i < foods.length; i++) {
        if (snakeX == foods[i].x && snakeY == foods[i].y) {
            ateFoodIndex = i;
            break;
        }
    }

    if (ateFoodIndex !== -1) {
        snakeBody.push([foods[ateFoodIndex].x, foods[ateFoodIndex].y]); 
        foods.splice(ateFoodIndex, 1); 
        
        isPaused = true;
        clearInterval(gameIntervalId); 
        generateNewQuestion(); 
        return; 
    }

    // D. Move snake body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // E. Draw snake head and body segments
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // F. Collision Checks
    if (snakeX < 0 || snakeX > (cols-1)*blockSize || snakeY < 0 || snakeY > (rows-1)*blockSize) {
        handleGameOver();
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            handleGameOver();
        }
    }
}

function changeDirection(e) {
    if (isPaused) return; 

    if ((e.code == "ArrowUp" || e.code == "KeyW") && velocityY != 1) {
        velocityX = 0; velocityY = -1; 
    } else if ((e.code == "ArrowDown" || e.code == "KeyS") && velocityY != -1) {
        velocityX = 0; velocityY = 1; 
    } else if ((e.code == "ArrowLeft" || e.code == "KeyA") && velocityX != 1) {
        velocityX = -1; velocityY = 0; 
    } else if ((e.code == "ArrowRight" || e.code == "KeyD") && velocityX != -1) {
        velocityX = 1; velocityY = 0;
    }
}

function placeFood() {
    while (foods.length < maxFoods) {
        let fX = Math.floor(Math.random() * cols) * blockSize;
        let fY = Math.floor(Math.random() * rows) * blockSize;
        foods.push({ x: fX, y: fY });
    }
}

// --- MATH SYSTEM ---
function generateNewQuestion() {
    clearQuestionTimer();

    let num1 = Math.floor(Math.random() * 20) + 1; 
    let num2 = Math.floor(Math.random() * 20) + 1;
    let sign = Math.floor(Math.random() * 4) + 1;
    
    let correctValue;
    let symbol = "+";

    if (sign == 1) { correctValue = num1 + num2; symbol = "+"; }
    else if (sign == 2) { correctValue = num1 - num2; symbol = "-"; }
    else if (sign == 3) { correctValue = num1 * num2; symbol = "x"; }
    else if (sign == 4) {
        correctValue = num1;
        num1 = correctValue * num2; 
        symbol = "÷";
    }
    
    let baseQuestionText = `PAUSED! ${num1} ${symbol} ${num2} = ?`;
    document.getElementById("question").textContent = baseQuestionText;

    let options = [
        correctValue,
        correctValue + 5,
        correctValue - 2,
        correctValue + 10
    ].sort(() => Math.random() - 0.5);

    for (let i = 1; i <= 4; i++) {
        let btn = document.getElementById("button" + i);
        btn.textContent = options[i-1];
        btn.isCorrect = (options[i-1] === correctValue); 
        btn.disabled = false; 
    }

    if (timeLimitSeconds > 0) {
        let timeLeft = timeLimitSeconds;
        document.getElementById("question").textContent = `${baseQuestionText} (${timeLeft}s remaining)`;

        questionTimerId = setInterval(function() {
            timeLeft--;
            if (timeLeft > 0) {
                document.getElementById("question").textContent = `${baseQuestionText} (${timeLeft}s remaining)`;
            } else {
                checkAnswer(false, true); 
            }
        }, 1000);
    }
}

function checkAnswer(isCorrect, isTimeout = false) {
    clearQuestionTimer();
    for (let i = 1; i <= 4; i++) document.getElementById("button" + i).disabled = true;

    if (isCorrect) {
        score += 2;
        document.getElementById("question").textContent = "Correct! +2 Points!";
    } else {
        score += 1; 
        applyPenalty(); 
    }

    document.getElementById("scoreDisplay").innerText = "Score: " + score;
    placeFood();
    isPaused = false;
    setGameSpeed(isPenalized ? baseSpeedMs / 2 : baseSpeedMs); 
}

function applyPenalty() {
    isPenalized = true;
    if (penaltyTimerId) clearInterval(penaltyTimerId);
    let penaltyTimeLeft = 10;
    
    penaltyTimerId = setInterval(() => {
        penaltyTimeLeft--;
        if (penaltyTimeLeft > 0) {
            if (!isPaused && !gameOver) {
                document.getElementById("question").textContent = `Speed Penalty Active! (${penaltyTimeLeft}s remaining)`;
            }
        } else {
            clearInterval(penaltyTimerId);
            isPenalized = false;
            if (!isPaused && !gameOver) {
                setGameSpeed(baseSpeedMs); 
                document.getElementById("question").textContent = "Speed returned to normal.";
            }
        }
    }, 1000); 
}

function clearQuestionTimer() {
    if (questionTimerId) { clearInterval(questionTimerId); questionTimerId = null; }
}

// --- SAVE & RESTART ---
function handleRestartClick() {
    if (gameOver) { play(); return; }
    if (confirm("Restart and save your score of " + score + "?")) {
        if (score > 0) saveScore(true);
        play();
    }
}

function saveScore(isManualRestart) {
    let currentUser = localStorage.getItem("currentUser");

    if (currentUser && currentUser !== "Guest") {
        let savedScores = JSON.parse(localStorage.getItem("snakademicScores")) || [];
        
        let activeSpawn = parseInt(localStorage.getItem('setting_spawnRate'));
        if (isNaN(activeSpawn)) activeSpawn = 25;
        let activeSpeed = parseInt(localStorage.getItem('setting_snakeSpeed'));
        if (isNaN(activeSpeed)) activeSpeed = 50;
        let activeTime = parseInt(localStorage.getItem('setting_timeLimit'));
        if (isNaN(activeTime)) activeTime = 25;

        // Check if a score already exists for THIS specific mode
        let existingIndex = savedScores.findIndex(s => 
            s.username === currentUser &&
            s.spawnRate === activeSpawn &&
            s.snakeSpeed === activeSpeed &&
            s.timeLimit === activeTime
        );

        if (existingIndex !== -1) {
            // Update only if new score is higher
            if (score > savedScores[existingIndex].score) {
                savedScores[existingIndex].score = score;
            }
        } else {
            // Save new entry
            savedScores.push({ 
                username: currentUser, score: score,
                spawnRate: activeSpawn, snakeSpeed: activeSpeed, timeLimit: activeTime
            });
        }
        
        localStorage.setItem("snakademicScores", JSON.stringify(savedScores));
        
        // Update Personal Best
        let hps = parseInt(localStorage.getItem("highestScore")) || 0;
        if (score > hps) localStorage.setItem("highestScore", score);

        alert(isManualRestart ? "Score saved. Restarting!" : "Game Over! Score saved.");
    } else {
        alert("Playing as Guest. Score not saved.");
    }
}

function handleGameOver() {
    gameOver = true;
    if (gameIntervalId) clearInterval(gameIntervalId);
    clearQuestionTimer();
    if (penaltyTimerId) clearInterval(penaltyTimerId);
    saveScore(false); 
}