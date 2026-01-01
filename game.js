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
    
    // 如果方向为 0，0（静止状态），不更新，等待玩家按方向键
    if (direction.x === 0 && direction.y === 0) {
        return;
    }

    // 计算蛇头的新位置
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // 检查是否撞墙
    if (head.x < 0 || head.x >= GRID_COUNT || head.y < 0 || head.y >= GRID_COUNT) {
        gameOver();
        return;
    }

    // 检查是否撞到自己（排除蛇头本身）
    if (snake.some((segment, index) => index > 0 && segment.x === head.x && segment.y === head.y)) {
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
    // 如果游戏正在运行且未暂停，则不重复启动
    if (gameRunning && !gamePaused) return;
    
    // 确保清除之前的游戏循环
    if (gameLoop) {
        clearInterval(gameLoop);
    }
    
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
        gameLoop = null; // 清除引用
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

// ========== 重新开始游戏 ==========
function restartGame() {
    console.log('restartGame 函数被调用'); // 调试信息
    
    // 确保停止所有游戏循环
    if (gameLoop) {
        clearInterval(gameLoop);
        gameLoop = null;
    }
    
    // 重置游戏状态
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 }; // 初始方向为静止，等待玩家按方向键
    score = 0;
    scoreElement.textContent = score;
    gameRunning = false;
    gamePaused = false;
    
    // 隐藏游戏结束遮罩层（必须在设置游戏状态之前）
    if (gameOverOverlay) {
        gameOverOverlay.classList.add('hidden');
    }
    if (gamePausedOverlay) {
        gamePausedOverlay.classList.add('hidden');
    }
    
    // 生成新食物
    generateFood();
    
    // 重新绘制
    draw();
    
    // 重置按钮状态
    if (startBtn) startBtn.disabled = false;
    if (pauseBtn) {
        pauseBtn.disabled = true;
        pauseBtn.textContent = '暂停';
    }
    
    // 等待一小段时间确保 DOM 更新完成，然后开始游戏
    setTimeout(() => {
        // 开始新游戏（直接设置状态，不通过 startGame 的检查）
        gameRunning = true;
        gamePaused = false;
        if (startBtn) startBtn.disabled = true;
        if (pauseBtn) {
            pauseBtn.disabled = false;
            pauseBtn.textContent = '暂停';
        }
        
        // 开始游戏循环
        gameLoop = setInterval(gameMainLoop, 150);
        
        console.log('游戏已重新开始，gameRunning:', gameRunning, 'gameLoop:', gameLoop); // 调试信息
    }, 50);
}

// ========== 游戏结束 ==========
function gameOver() {
    gameRunning = false;
    if (gameLoop) {
        clearInterval(gameLoop);
        gameLoop = null; // 清除引用
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

// 确保 restartBtn 存在后再绑定事件
if (restartBtn) {
    restartBtn.addEventListener('click', function(e) {
        console.log('再来一局按钮被点击'); // 调试信息
        
        // 阻止事件冒泡
        e.stopPropagation();
        
        // 调用重新开始函数
        restartGame();
        
        // 返回 false 阻止默认行为
        return false;
    }, false);
    
    // 也尝试使用 mousedown 事件作为备选
    restartBtn.addEventListener('mousedown', function(e) {
        e.stopPropagation();
    });
} else {
    console.error('restartBtn 元素未找到！');
}

// 使用事件委托，在 gameOverOverlay 上监听点击事件
if (gameOverOverlay) {
    gameOverOverlay.addEventListener('click', function(e) {
        // 如果点击的是 restartBtn 或其内部元素
        if (e.target && (e.target.id === 'restartBtn' || e.target.closest('#restartBtn'))) {
            console.log('通过事件委托检测到再来一局按钮点击');
            e.stopPropagation();
            restartGame();
        }
    });
}

// ========== 初始化游戏 ==========
loadHighScore(); // 加载最高分
generateFood(); // 生成初始食物
draw(); // 绘制初始画面

