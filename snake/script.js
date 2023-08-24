const playBoard= document.querySelector(".playboard")
const scoreBoard= document.querySelector(".score")
// const highScore1= document.querySelector(".highscore")

let foodX, foodY;
let snakeX = 13, snakeY=10;
let snakeBody =[];
let velocityX = 0, velocityY=0;
let gameOver = false;
let intervalID;
let score = 0;
// let highScore = localStorage.getItem("highscore") || 0 ;
const changefood=() => {
    foodX = Math.floor(Math.random()* 30)  +1;
    foodY = Math.floor(Math.random()* 30)  +1;
}
const handleGame=()=>{
    alert("Game over Click OK to continue")
    clearInterval(intervalID)
    location.reload();
}
const changeDirection=(e)=>{
    if(e.key ==="ArrowUp"){
        velocityX=0;
        velocityY=-1;
    }
    else if(e.key ==="ArrowDown"){
        velocityX=0;
        velocityY=1;
    }else if(e.key ==="ArrowLeft"){
        velocityX=-1;
        velocityY=0;
    }else if(e.key ==="ArrowRight"){
        velocityX=1;
        velocityY=0;
    } 
}
const initGame=()=>{
    if(gameOver) return handleGame();
    let htmlMarkup =`<div class ="food" style="grid-area :${foodY} / ${foodX}"></div>`;
    if(snakeX === foodX && snakeY=== foodY){
        changefood();
        snakeBody.push([foodX,foodY])
        // console.log(snakeBody)
        score++;
        scoreBoard.innerHTML = `Score:${score}`
        // highScore1.innerHTML = `HighScore :${highScore1}`
        // highScore = score >= highScore ? score : highScore;
        // localStorage.setItem("highcore", highScore);
    } 
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    
    snakeBody[0] = [snakeX ,snakeY]
    snakeX += velocityX
    snakeY += velocityY
    if(snakeX<=0 ||snakeX > 30||snakeY<=0 ||snakeY > 30 ){
       gameOver = true;
    }
    for (let i = 0; i < snakeBody.length; i++)
{    htmlMarkup +=`<div class ="head" style="grid-area :${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
if (i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0] ){
    gameOver = true;
}
}
    playBoard.innerHTML = htmlMarkup

}
changefood();
 intervalID = setInterval(initGame ,125);
document.addEventListener("keydown", changeDirection);