window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    resizeCanvas(canvas);
    placeOutline(canvas)
}


function resizeCanvas(canvas) {
    canvas.width = (window.innerWidth - 16);
    canvas.height = (window.innerHeight - 20);      //edit for right format fx 200
}


function placeOutline(canvas) {
    var ctx = canvas.getContext("2d");
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

function setScore() {
    
}