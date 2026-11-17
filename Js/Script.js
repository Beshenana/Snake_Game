const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let score = 0; 

let snake = [];
snake[0] = {
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale
};

let food = {
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale
};

let d = "right";

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "right") {
        d = "left";
    }
    if (key == 38 && d != "down") {
        d = "up";
    }
    if (key == 39 && d != "left") {
        d = "right";
    }
    if (key == 40 && d != "up") {
        d = "down";
    }
}

// NEW: Helper function to check if the head ran into the body
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Call our draw function every 100ms
let playgame = setInterval(draw, 100);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
    }

    // Draw Food
    ctx.fillStyle = "#ff0";
    ctx.fillRect(food.x, food.y, scale, scale);
    ctx.strokeStyle = "red";
    ctx.strokeRect(food.x, food.y, scale, scale);

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Which direction
    if (d == "left") snakeX -= scale;
    if (d == "up") snakeY -= scale;
    if (d == "right") snakeX += scale;
    if (d == "down") snakeY += scale;

    // Screen-wrap boundaries
    if (snakeX >= canvas.width) {
        snakeX = 0;
    }
    if (snakeY >= canvas.height) {
        snakeY = 0;
    }
    if (snakeX < 0) {
        snakeX = canvas.width - scale;
    }
    if (snakeY < 0) {
        snakeY = canvas.height - scale;
    }

    // If snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * columns) * scale,
            y: Math.floor(Math.random() * rows) * scale
        };
    } else {
        snake.pop();
    }

    // Create the new head position
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // NEW: Check if the new head crashes into the snake's body
    if (collision(newHead, snake)) {
        clearInterval(playgame); // Stops the loop
        alert("Game Over! Your score: " + score);
        return; // Exits the function early so the head isn't drawn
    }

    snake.unshift(newHead);
}