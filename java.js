const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let dead = new Audio();

let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
let eating = new Audio();

eating.src= "audio/eat.mp3"
dead.src = "audio/dead.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";
// create the snake

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}
// create the food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}
// create score

let score = 0;
var time = 150 - (score / 4);
let d;
document.addEventListener('keydown', direction);
function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
        left.play();
    }
    if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
        up.play();
    }
    if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
        right.play();
    }
    if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
        down.play();
    }
}
function collosion(head,array){
    for(var i=0;i<array.length;i++){
        if(head.x== array[i].x && head.y == array[i].y){
            return true
        }
    }
    return false;
}
function eat(){
    
}
function draw() {
    ctx.drawImage(ground, 0, 0);
    // Vẽ đuôi con rắn
    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    // Vẽ hình quả táo
    ctx.drawImage(foodImg, food.x, food.y);
    // Xét đầu con rắn
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    // kiểm tra xem rắn đã va chạm với táo chưa 
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eating.play();
        console.log(score);
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    }
    else {
        snake.pop();
    }
    // kiểm tra chuyển động của con rắn
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;
    // Lấy lại đầu con rắn mới 
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collosion(newHead,snake)) {
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);s
}
let game = setInterval(draw, time);
