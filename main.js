var leftPlayer;
var rightPlayer;
var ball;
var singleplayer = false;

window.onload = function() {
    numberOfPlayers();
    gameArea.start();
    leftPlayer = new component(20, 150, "white", 30, gameArea.canvas.height / 2 - 75);
    rightPlayer = new component(20, 150, "white", gameArea.canvas.width - 50, gameArea.canvas.height / 2 - 75);
    ball = new component(25, 25, "white", gameArea.canvas.width / 2, gameArea.canvas.height / 2);
    leftScore = new component("70px", "Verdana", "white", gameArea.canvas.width/4 - 35, 130, "text");
    rightScore = new component("70px", "Verdana", "white", (gameArea.canvas.width/4) * 3, 130, "text");
    ball.speedY = 0;        //Adjust starting angle
    ball.speedX = 15;       //Adjust horizontal speed
    leftScore.text = leftPlayer.points;
    rightScore.text = rightPlayer.points;

}


var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        //resize canvas
        this.canvas.width = (window.innerWidth - 16);
        this.canvas.height = (window.innerHeight - 20);
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        numberOfPlayers();
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.keyCode] = false; 
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.speedX = 0;
    this.speedY = 0;
    this.points = 0;
    this.update = function() {
        ctx = gameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function placeOutline() {
    var canvas = gameArea.canvas;
    var ctx = gameArea.context;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(20, 20, (canvas.width - 40), 30);
    ctx.fillRect(20, (canvas.height - 50), (canvas.width - 40), 30);
    ctx.beginPath();
    ctx.setLineDash([12,20]);
    ctx.moveTo((canvas.width / 2), 60);
    ctx.lineTo((canvas.width / 2), (canvas.height - 60));
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 12;
    ctx.stroke();
}


function updateGameArea() {
    gameArea.clear();
    placeOutline();
    if (singleplayer) {
        singlePlayerMovement();
    } else {
        multiplayerMovement();
    }
    leftPlayer.newPos();
    rightPlayer.newPos();
    ball.newPos();
    onCollision();
    leftPlayer.update();
    rightPlayer.update();
    ball.update();
    leftScore.update();
    rightScore.update();
}

function onCollision() {
    if (leftPlayer.y > (gameArea.canvas.height - 50 - 150 - 15)) {      //collide on bottom
        leftPlayer.y = (gameArea.canvas.height - 50 - 150 - 15);
    } else if (leftPlayer.y < (50 + 15)) {      //colide on top
        leftPlayer.y = (50 + 15);
    } 
    
    if (rightPlayer.y > (gameArea.canvas.height - 50 - 150 - 15)) { //collide on bottom
        rightPlayer.y = (gameArea.canvas.height - 50 - 150 - 15);
    } else if (rightPlayer.y < (50 + 15)) {     //collide on top
        rightPlayer.y = (50 + 15);
    } 
    
    if (ball.y > (gameArea.canvas.height - 50 - 25)) {      //bounce ball on bottom
        bounceY();
    } else if (ball.y < (50)) {     //bounce ball on top
        bounceY();
    } 
    
    //ball bounce on player
    if (ball.x + ball.width >= rightPlayer.x && ball.y + ball.height > rightPlayer.y && ball.y < rightPlayer.y + rightPlayer.height) {
        bounceX();
        bounceAngle(rightPlayer);
    } else if (ball.x <= leftPlayer.x + leftPlayer.width && ball.y + ball.height > leftPlayer.y && ball.y < leftPlayer.y + leftPlayer.height) {
        bounceX();
        bounceAngle(leftPlayer);
    } else {
        if (ball.x + ball.width < leftPlayer.x) {     //Ball past left player
            //ScorePoint to right player
            goal(rightPlayer);
        } else if (ball.x > rightPlayer.x + rightPlayer.width) {   //Ball past right player
            //ScorePoint to left player
            goal(leftPlayer);
        } 
    }
}

function bounceAngle(player) {
    ball.speedY = -(((player.y + 75) - (ball.y + ball.height/2)) / 10);         //Adjust divider for higher/lower angle
    
}

function goal(player) {
    player.points += 1;
    leftScore.text = leftPlayer.points;
    rightScore.text = rightPlayer.points;
    resetPositions();
}

function resetPositions() {
    ball.x = gameArea.canvas.width / 2;
    ball.y = gameArea.canvas.height / 2;
    leftPlayer.y = gameArea.canvas.height / 2 - 75;
    rightPlayer.y = gameArea.canvas.height / 2 - 75;
    bounceX();
    if (ball.speedY < 0) {
        ball.speedY = 1;
    } else {
        ball.speedY = -1;
    }
}

function bounceX() {
    ball.speedX += -(2 * ball.speedX);
}

function bounceY() {
    ball.speedY += -(2 * ball.speedY);
}

function multiplayerMovement() {
    rightPlayer.speedY = 0; 
    if (gameArea.keys && gameArea.keys[38]) {rightPlayer.speedY = -5; }
    if (gameArea.keys && gameArea.keys[40]) {rightPlayer.speedY = 5; }

    leftPlayer.speedY = 0; 
    if (gameArea.keys && gameArea.keys[87]) {leftPlayer.speedY = -5; }
    if (gameArea.keys && gameArea.keys[83]) {leftPlayer.speedY = 5; }
}

function singlePlayerMovement() {
    rightPlayer.speedY = 0; 
    if (gameArea.keys && gameArea.keys[38]) {rightPlayer.speedY = -5; }
    if (gameArea.keys && gameArea.keys[40]) {rightPlayer.speedY = 5; }

    leftPlayer.speedY = 0;
    if (ball.speedX < 0) {
        if ((ball.y + ball.height/2) < leftPlayer.y + leftPlayer.height/2) {
            if (Math.abs((ball.y + ball.height/2) - (leftPlayer.y + leftPlayer.height/2)) < 5) {
                leftPlayer.speedY = -1;
            } else {
                leftPlayer.speedY = -5;
            }
        }
        if ((ball.y + ball.height/2) > leftPlayer.y + leftPlayer.height/2) {
            if (Math.abs((ball.y + ball.height/2) - (leftPlayer.y + leftPlayer.height/2)) < 5) {
                leftPlayer.speedY = 1;
            } else {
                leftPlayer.speedY = 5;
            }
        }
    } else {
        if (leftPlayer.y < (gameArea.canvas.height / 2 - 75)) {
            if (Math.abs(leftPlayer.y - (gameArea.canvas.height / 2 - 75)) < 5) {
                leftPlayer.speedY = 1;
            } else {
                leftPlayer.speedY = 5;
            }
        }
        if (leftPlayer.y > (gameArea.canvas.height / 2 - 75)) {
            if (Math.abs(leftPlayer.y - (gameArea.canvas.height / 2 - 75)) < 5) {
                leftPlayer.speedY = -1;
            } else {
                leftPlayer.speedY = -5;
            }
        }
    }
}

function numberOfPlayers() {
    path = window.location.pathname;
    if (path.search("singleplayer.html") > 0) {
        singleplayer = true;
    }
}