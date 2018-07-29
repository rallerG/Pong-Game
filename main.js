var leftPlayer;
var rightPlayer;
var ball;

window.onload = function() {
    gameArea.start();
    leftPlayer = new component(20, 150, "white", 30, gameArea.canvas.height / 2 - 75);
    rightPlayer = new component(20, 150, "white", gameArea.canvas.width - 50, gameArea.canvas.height / 2 - 75);
    ball = new component(25, 25, "white", gameArea.canvas.width / 2, gameArea.canvas.height / 2);
}


var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        //resize canvas
        this.canvas.width = (window.innerWidth - 16);
        this.canvas.height = (window.innerHeight - 20);
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.update = function() {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
    leftPlayer.update();
    rightPlayer.update();
    ball.update();
}

function setScore() {
    
}