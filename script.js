// Get the canvas element
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 400;
canvas.height = 400;

// Set initial snake properties
let snake = [{ x: 200, y: 200 }];
let snakeDirection = 'right';
let snakeLength = 1;

// Set initial food properties
let food = { x: 100, y: 100 };

// Set game speed
let gameSpeed = 100;

// Event listener for arrow keys
document.addEventListener("keydown", changeDirection);

// Event listener for mobile touch control
document.addEventListener("touchstart", handleTouchStart);

// Game loop
setInterval(gameLoop, gameSpeed);

// Function to change snake direction based on key press
function changeDirection(event) {
    if (event.key === "ArrowUp" && snakeDirection !== "down") {
        snakeDirection = "up";
    } else if (event.key === "ArrowDown" && snakeDirection !== "up") {
        snakeDirection = "down";
    } else if (event.key === "ArrowLeft" && snakeDirection !== "right") {
        snakeDirection = "left";
    } else if (event.key === "ArrowRight" && snakeDirection !== "left") {
        snakeDirection = "right";
    }
}

// Function to handle mobile touch control
function handleTouchStart(event) {
    const touch = event.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;

    const canvasRect = canvas.getBoundingClientRect();
    const canvasX = touchX - canvasRect.left;
    const canvasY = touchY - canvasRect.top;

    if (canvasX < canvas.width / 2 && canvasY < canvas.height / 2) {
        snakeDirection = "up";
    } else if (canvasX > canvas.width / 2 && canvasY > canvas.height / 2) {
        snakeDirection = "down";
    } else if (canvasX < canvas.width / 2) {
        snakeDirection = "left";
    } else {
        snakeDirection = "right";
    }
}

// Main game loop function
function gameLoop() {
    // Move snake
    const head = { ...snake[0] };
    if (snakeDirection === "up") head.y -= 10;
    if (snakeDirection === "down") head.y += 10;
    if (snakeDirection === "left") head.x -= 10;
    if (snakeDirection === "right") head.x += 10;

    // Add the new head to the snake array
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        snakeLength++;
        spawnFood();
    } else {
        snake.pop();
    }

    // Check for game over
    if (checkGameOver()) {
        alert("Game Over {RP} ! Press OK to restart.");
        resetGame();
    }

    // Draw everything
    drawGame();
}

// Draw the game state
function drawGame() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = "green";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Spawn food at random position
function spawnFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

// Check if snake has collided with wall or itself
function checkGameOver() {
    const head = snake[0];
    // Check if snake hits wall
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    // Check if snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Reset game to initial state
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    snakeDirection = 'right';
    snakeLength = 1;
    spawnFood();
}
