var canvas;
var canvasContext;

var canvasWidth = 800;
var canvasHeight = 600;

var ballXpos = canvasWidth / 2;
var ballYpos = (Math.random() * (canvasHeight / 2)) + (canvasHeight / 4);
var ballXvel = 5;
var ballYvel = 5;

var playerYpos = 200;

var botYpos = 400;
var botYvel = 4;

var gameEnded = false;
var winnerName;

window.onload = function() {
    canvas = this.document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    var fps = 30;
    this.setInterval(game, 1000 / fps);
    canvas.addEventListener("mousemove", function(evt) {
        var mousePos = calculateMousePos(evt);
        playerYpos = mousePos.y - 50;
    });
}

function game() {
    botMovement();
    engine();
    drawEverything();
}

function engine() {
    ballXpos += ballXvel;
    ballYpos += ballYvel;

    botYpos += botYvel;
    if (ballXpos >= canvas.width - 25 && ballYpos >= botYpos && ballYpos <= botYpos + 100) {
        ballXvel *= -1;
        ballYvel += -(((botYpos + 50) - ballYpos) / 30);
    }
    if (ballYpos >= canvas.height - 5) {
        ballYvel *= -1;
    }
    if (ballXpos <= 25 && ballYpos >= playerYpos && ballYpos <= playerYpos + 100) {
        ballXvel *= -1;
        ballYvel += -(((playerYpos + 50) - ballYpos) / 30);
    }
    if (ballYpos <= 5) {
        ballYvel *= -1;
    }

    if (playerWin()) {
        stopBall();
        gameEnded = true;
        winnerName = "Player";
    }
    if (botWin()) {
        stopBall();
        ballXpos = canvasWidth / 2;
        ballYpos = canvasHeight / 2;
        gameEnded = true;
        winnerName = "Bot";
    }
}

function stopBall() {
    ballXvel = 0;
    ballYvel = 0;
}

function botWin() {
    if (ballXpos < 0) return true;
    else return false;
}

function playerWin() {
    if (ballXpos > canvasWidth) return true;
    else return false;
}

function botMovement() {
    if ((ballYpos - 50) <= (botYpos + 20) && (ballYpos - 50) >= (botYpos - 20)) botYvel = 0;
    else if ((ballYpos - 50) < botYpos) botYvel = -5;
    else if ((ballYpos - 50) > botYpos) botYvel = 5;
}

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}

function drawEverything() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawNet();
    drawCircle(ballXpos, ballYpos, 10, "red");
    drawRect(10, playerYpos, 10, 100, "White");
    drawRect(canvas.width - 20, botYpos, 10, 100, "White");

    //printStat();

    if (gameEnded)
        drawText(canvasWidth / 2 - 200, canvasHeight / 2 - 30, winnerName + " Won!", "60", "Arial", true, "white");
}

function drawNet() {
    for (let i = 0; i < 19; i++) {
        drawRect(canvasWidth / 2 - 5, 20 + (i * 30), 10, 10, "grey");
        console.log("net");
    }
}

function printStat() {
    drawText(10, 10, "BallXVel = " + ballXvel, 8, "Arial", true, "red");
    drawText(10, 20, "BallYVel = " + ballYvel, 8, "Arial", true, "red");
    drawText(10, 30, "playerYpos = " + playerYpos, 8, "Arial", true, "red");
    drawText(10, 40, "botYpos = " + botYpos, 8, "Arial", true, "red");
}

// Draw functions
function drawRect(X, Y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(X, Y, width, height);
}

function drawCircle(X, Y, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(X, Y, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function drawLine(X1, Y1, X2, Y2) {
    canvasContext.moveTo(X1, Y1);
    canvasContext.lineTo(X2, Y2);
    canvasContext.stroke();
}

function drawText(X, Y, text, size, font, fill, color) {
    canvasContext.font = size + "px " + font;
    if (fill) canvasContext.fillText(text, X, Y);
    else canvasContext.strokeText(text, X, Y);
}

function drawGradientRectangle(X1, Y1, X2, Y2, color1, color2) {
    var grd = canvasContext.createLinearGradient(0, 0, 200, 0);
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);

    canvasContext.fillStyle = grd;
    canvasContext.fillRect(X1, Y1, X2, Y2);
}