let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");

console.log(ctx);
let score_res = document.getElementById("score_display");
let scale = 20;
let rows = canvas.height / scale;
let columns = canvas.width / scale;

let snake = [];
snake[0] = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * columns) * scale,
};

let food = {
  z: Math.floor(Math.random() * columns) * scale,
  k: Math.floor(Math.random() * columns) * scale,
};

let d = "right";
let score = 0;
document.onkeydown = direction;
function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "right") {
    d = "left";
  } else if (key == 38 && d != "down") {
    d = "up";
  } else if (key == 39 && d != "left") {
    d = "right";
  } else if (key == 40 && d != "up") {
    d = "down";
  }
}
let playGame = setInterval(draw, 100);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // drawing the moving snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "red";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }

  // drowing the food
  ctx.fillStyle = "green";
  ctx.strokeStyle = "yellow";
  ctx.fillRect(food.z, food.k, scale, scale);
  ctx.strokeRect(food.z, food.k, scale, scale);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  //   console.log(snakeX);
  // which direction
  if (d == "left") snakeX -= scale;
  if (d == "up") snakeY -= scale;
  if (d == "right") snakeX += scale;
  if (d == "down") snakeY += scale;

  if (snakeX > canvas.width) {
    snakeX = 0;
  }
  if (snakeY > canvas.height) {
    snakeY = 0;
  }
  if (snakeX < 0) {
    snakeX = canvas.width;
  }
  if (snakeY < 0) {
    snakeY = canvas.height;
  }
  if (snakeX == food.z && snakeY == food.k) {
    score = score + 1;
    // console.log(score);
    score_res.textContent = score;

    food = {
      z: Math.floor(Math.random() * columns) * scale,
      k: Math.floor(Math.random() * columns) * scale,
    };
    // snake.unshift(newHead);
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  if (gameOver(newHead, snake)) {
    clearInterval(playGame);
  }
  //   snake.pop();
  snake.unshift(newHead);
}

function gameOver(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    } else {
      return false;
    }
  }
}
