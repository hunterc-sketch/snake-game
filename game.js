// ========== 游戏配置 ==========
const GRID_SIZE = 20; // 网格大小（每个格子20像素）
const CANVAS_SIZE = 400; // 画布大小
const GRID_COUNT = CANVAS_SIZE / GRID_SIZE; // 网格数量（20x20）

// ========== 获取游戏元素 ==========
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const gameOverOverlay = document.getElementById('gameOver');
const gamePausedOverlay = document.getElementById('gamePaused');
const restartBtn = document.getElementById('restartBtn');
const finalScoreElement = document.getElementById('finalScore');

// ========== 游戏状态变量 ==========
let snake = [{ x: 10, y: 10 }]; // 蛇的身体（初始位置在中间）
let direction = { x: 0, y: 0 }; // 移动方向
let food = { x: 15, y: 15 }; // 食物的位置
let score = 0; // 当前得分
let highScore = 0; // 最高分
let gameRunning = false; // 游戏是否运行中
let gamePaused = false; // 游戏是否暂停
let gameLoop; // 游戏循环定时器

// ========== 从本地存储加载最高分 ==========
function loadHighScore() {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) {
        highScore = parseInt(saved);
        highScoreElement.textContent = highScore;
    }
}

// ========== 保存最高分到本地存储 ==========
function saveHighScore() {
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        localStorage.setItem('snakeHighScore', highScore.toString());
    }
}

// ========== 生成随机食物位置 ==========
function generateFood() {
    // 生成一个不在蛇身上的随机位置
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * GRID_COUNT),
            y: Math.floor(Math.random() * GRID_COUNT)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    food = newFood;
}

// ========== 绘制游戏画面 ==========
function draw() {
    // 清空画布
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 绘制网格线（可选，让游戏更清晰）
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, CANVAS_SIZE);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(CANVAS_SIZE, i * GRID_SIZE);
        ctx.stroke();
    }

    // 绘制蛇
    ctx.fillStyle = '#667eea';
    snake.forEach((segment, index) => {
        // 蛇头用不同颜色
        if (index === 0) {
            ctx.fillStyle = '#764ba2';
        } else {
            ctx.fillStyle = '#667eea';
        }
        ctx.fillRect(
            segment.x * GRID_SIZE + 2,
            segment.y * GRID_SIZE + 2,
            GRID_SIZE - 4,
            GRID_SIZE - 4
        );
    });

    // 绘制食物
    ctx.fillStyle = '#f44336';
    ctx.fillRect(
        food.x * GRID_SIZE + 2,
        food.y * GRID_SIZE + 2,
        GRID_SIZE - 4,
        GRID_SIZE - 4
    );
}

// ========== 更新游戏状态 ==========
function update() {
    if (!gameRunning || gamePaused) return;

    // 计算蛇头的新位置
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // 检查是否撞墙
    if (head.x < 0 || head.x >= GRID_COUNT || head.y < 0 || head.y >= GRID_COUNT) {
        gameOver();
        return;
    }

    // 检查是否撞到自己
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    // 将新头部添加到蛇的前面
    snake.unshift(head);

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
    } else {
        // 没吃到食物，移除蛇尾
        snake.pop();
    }
}

// ========== 游戏主循环 ==========
function gameMainLoop() {
    update();
    draw();
}

// ========== 开始游戏 ==========
function startGame() {
    if (gameRunning) return;
    
    gameRunning = true;
    gamePaused = false;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    gameOverOverlay.classList.add('hidden');
    gamePausedOverlay.classList.add('hidden');
    
    // 开始游戏循环（每150毫秒更新一次）
    gameLoop = setInterval(gameMainLoop, 150);
}

// ========== 暂停/继续游戏 ==========
function togglePause() {
    if (!gameRunning) return;
    
    gamePaused = !gamePaused;
    
    if (gamePaused) {
        gamePausedOverlay.classList.remove('hidden');
        pauseBtn.textContent = '继续';
    } else {
        gamePausedOverlay.classList.add('hidden');
        pauseBtn.textContent = '暂停';
    }
}

// ========== 重置游戏 ==========
function resetGame() {
    // 停止游戏循环
    if (gameLoop) {
        clearInterval(gameLoop);
    }
    
    // 重置游戏状态
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreElement.textContent = score;
    gameRunning = false;
    gamePaused = false;
    
    // 重置按钮状态
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = '暂停';
    
    // 隐藏所有遮罩层
    gameOverOverlay.classList.add('hidden');
    gamePausedOverlay.classList.add('hidden');
    
    // 生成新食物
    generateFood();
    
    // 重新绘制
    draw();
}

// ========== 游戏结束 ==========
function gameOver() {
    gameRunning = false;
    if (gameLoop) {
        clearInterval(gameLoop);
    }
    
    // 保存最高分
    saveHighScore();
    
    // 显示游戏结束界面
    finalScoreElement.textContent = score;
    gameOverOverlay.classList.remove('hidden');
    
    // 重置按钮状态
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// ========== 处理键盘输入 ==========
document.addEventListener('keydown', (e) => {
    // 如果游戏未开始，按任意键开始游戏
    if (!gameRunning && e.key !== ' ') {
        startGame();
    }
    
    // 空格键：暂停/继续
    if (e.key === ' ') {
        e.preventDefault();
        if (gameRunning) {
            togglePause();
        } else {
            startGame();
        }
    }
    
    // 方向键：改变移动方向（但不能直接反向）
    if (gameRunning && !gamePaused) {
        switch(e.key) {
            case 'ArrowUp':
                if (direction.y === 0) { // 不能从向下直接变成向上
                    direction = { x: 0, y: -1 };
                }
                break;
            case 'ArrowDown':
                if (direction.y === 0) {
                    direction = { x: 0, y: 1 };
                }
                break;
            case 'ArrowLeft':
                if (direction.x === 0) {
                    direction = { x: -1, y: 0 };
                }
                break;
            case 'ArrowRight':
                if (direction.x === 0) {
                    direction = { x: 1, y: 0 };
                }
                break;
        }
    }
});

// ========== 按钮事件监听 ==========
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
resetBtn.addEventListener('click', resetGame);
restartBtn.addEventListener('click', () => {
    resetGame();
    startGame();
});

// ========== 初始化游戏 ==========
loadHighScore(); // 加载最高分
generateFood(); // 生成初始食物
draw(); // 绘制初始画面

