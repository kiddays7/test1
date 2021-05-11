/******      白棋为0， 黑棋为1,  -1为该位置没有棋子， 0为该位置有黑棋， 1为该位置有白棋      ******/
var chessBoard = document.getElementById("chessBoard");
var ctx = chessBoard.getContext("2d");

playMode = true;        //游戏模式

var logo = new Image();
logo.src = "GoBang_logo.png";
logo.onload = function () {
    ctx.drawImage(logo, 5,10, 600, 600);
    drawChessBoard();
}

wins = []; myWins = []; aiWins = []; counts = 0;  //定义赢法数组，玩家赢法数组，人机赢法数组，赢法总数
for(let i = 0; i < 12; i++){
    wins[i] = [];
    for(let j = 0; j < 12; j++){
        wins[i][j] = [];
    }
}

for(let i = 1; i < 12; i++){        //横线赢法
    for(let j = 1; j < 8; j++){
        for(let k = 0; k < 5; k++){
            wins[i][j + k][counts] = true;
        }
        counts++;
    }
}
for(let i = 1; i < 12; i++){        //竖线赢法
    for(let j = 1; j < 8; j++){
        for(let k = 0; k < 5; k++){
            wins[j + k][i][counts] = true;
        }
        counts++;
    }
}
for(let i = 1; i < 8; i++){        //斜线赢法
    for(let j = 1; j < 8; j++){
        for(let k = 0; k < 5; k++){
            wins[i + k][j + k][counts] = true;
        }
        counts++;
    }
}
for(let i = 11; i > 4; i--){        //反斜线赢法
    for(let j = 1; j < 8; j++){
        for(let k = 0; k < 5; k++){
            wins[i - k][j + k][counts] = true;
        }
        counts++;
    }
}
for(let i = 0; i < counts; i++){
    myWins[i] = 0;
    aiWins[i] = 0;
}
function drawChessBoard() {
    ctx.strokeStyle = "black";
    var w = 500, h = 500;     //棋盘的真实大小
    interval = w / 10;      //全局变量  10为真实棋盘的格子数
    chessArr = [];  //全局变量  存储棋子的二维数组，用来判断该位置是否已有棋子
    for(var i = 0; i < 12; i++){
        chessArr[i] = [];
        for(var j = 0; j < 12; j++){
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

clickWho = true;  flag = false //全局变量  黑棋一下换白棋、 判断棋局是否结束
chessBoard.onclick = function (e) {
    if(flag){
        return ;
    }
    var x = Math.floor((e.offsetX + interval) / 53);
    var y = Math.floor((e.offsetY + interval) / 53);
    console.log("下棋的真实位置：", x, y);
    if(chessArr[x][y] === -1){
        if(clickWho){
            chessPlay(x, y, 0);
            chessArr[x][y] = 0;
            for(var i = 0; i < counts; i++){
                if(wins[x][y][i]){
                    myWins[i]++;
                    aiWins[i] = -1;
                }
                if(myWins[i] === 5){
                    alert("恭喜，你赢了！");
                    flag = true;
                }
            }
        }
        /**** 玩家对玩家 ***/
        // else{
        //     chessPlay(x, y, 1);
        //     chessArr[x][y] = 1;
        //     for(var j = 0; j < counts; j++){
        //         if(wins[x][y][j]){
        //             aiWins[j]++;
        //             myWins[j] = -1;
        //         }
        //         if(aiWins[j] === 5){
        //             alert("恭喜，你输了！");
        //             flag = true;
        //         }
        //     }
        // }
        //clickWho = !clickWho;
        if(!flag){
            clickWho = !clickWho;
            computerChess();
        }
    }

}
function computerChess() {       //计算机判断将白棋落在哪个位置
    var myScore = [];
    var aiScore = [];
    var max = 0;
    var maxX = 0, maxY = 0;

    for(var i = 0; i < 12; i++){
        myScore[i] = [];
        aiScore[i] = [];
        for(var j = 0; j < 12; j++){
            myScore[i][j] = 0;
            aiScore[i][j] = 0;
        }
    }
    for(var i = 1; i < 12; i++){
        for(var j = 1; j < 12; j++){
            if(chessArr[i][j] === -1){
                for(var k = 0; k < counts; k++){
                    if(wins[i][j][k]){
                        switch (myWins[k]) {
                            case 1: myScore[i][j] += 100; break;
                            case 2: myScore[i][j] += 200; break;
                            case 3: myScore[i][j] += 10000; break;
                            case 4: myScore[i][j] += 20000; break;
                        }
                        switch (aiWins[k]) {
                            case 1: aiScore[i][j] += 150; break;
                            case 2: aiScore[i][j] += 300; break;
                            case 3: aiScore[i][j] += 15000; break;
                            case 4: aiScore[i][j] += 25000; break;
                        }
                    }
                }
                if(myScore[i][j] > max) {
                    max = myScore[i][j];
                    maxX = i;
                    maxY = j;
                }
                else if(myScore[i][j] === max){
                    if(aiScore[i][j] > aiScore[maxX][maxY]){
                        max = aiScore[i][j];
                        maxX = i;
                        maxY = j;
                    }
                }
                if(aiScore[i][j] > max) {
                    max = aiScore[i][j];
                    maxX = i;
                    maxY = j;
                }
                else if(aiScore[i][j] === max){
                    if(myScore[i][j] > myScore[maxX][maxY]){
                        max = myScore[i][j];
                        maxX = i;
                        maxY = j;
                    }
                }
            }
        }
    }
    chessPlay(maxX, maxY, 1);
    chessArr[maxX][maxY] = 1;
    for(var j = 0; j < counts; j++){
        if(wins[maxX][maxY][j]){
            aiWins[j]++;
            myWins[j] = -1;
        }
        if(aiWins[j] === 5){
            alert("遗憾，你输了！");
            flag = true;
        }
    }
    if(!flag){
        clickWho = !clickWho;
    }
}