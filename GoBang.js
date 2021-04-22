/******     白棋为1， 黑棋为2,  -1为该位置没有棋子， 0为该位置有棋子      ********/
var chessBoard = document.getElementById("chessBoard");
var ctx = chessBoard.getContext("2d");

var logo = new Image();
logo.src = "logo2.png";
logo.onload = function () {
    ctx.drawImage(logo, 5,10, 600, 600);
    drawChessBoard();
}

function drawChessBoard() {
    ctx.strokeStyle = "black";
    var w = 500, h = 500;     //棋盘的真实大小
    interval = w / 10;      //全局变量  10为真实棋盘的格子数
    chessArr = new Array();  //全局变量  存储棋子的二维数组，用来判断该位置是否已有棋子
    for(var i = 0; i < 11; i++){
        chessArr[i] = new Array();
        for(var j = 0; j < 11; j++){
            chessArr[i][j] = -1;
        }
    }

    var x, y;
    x = y = interval;
    w = interval + w;
    h = interval + h;
    while(x <= w){
        ctx.moveTo(x, y);
        ctx.lineTo(x, h);
        ctx.stroke();
        x += interval;
    }
    x = y = interval;
    while(y <= h){
        ctx.moveTo(x, y);
        ctx.lineTo(w, y);
        ctx.stroke();
        y += interval;
    }

}
function chessPlay(x, y, is) {
    x = x * interval; y = y * interval;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.closePath();

    var grd = ctx.createRadialGradient(x, y, 20, x, y, 0);
    if(is === 0){
        grd.addColorStop(0, "black");
        grd.addColorStop(1, "#D8BFD8");
    }
    else{
        grd.addColorStop(0, "#A9A9A9");
        grd.addColorStop(1, "#FFFFFF");
    }
    ctx.fillStyle = grd;
    ctx.fill();
}

clickNum = 0;   //全局变量  黑棋一下换白棋
chessBoard.onclick = function (e) {
    var x = Math.floor((e.offsetX + interval) / 53);
    var y = Math.floor((e.offsetY + interval) / 53);
    console.log("下棋的真实位置：", x, y);
    if(chessArr[x-1][y-1] === -1){
        if(clickNum % 2 === 0){
            chessPlay(x, y, 0);
        }
        else{
            chessPlay(x, y, 1);
        }
        clickNum++;
        chessArr[x-1][y-1] = 0;
    }
    else{
        alert("该位置已存在棋子！");
    }
}