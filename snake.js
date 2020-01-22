const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const { width, height } = canvas;
const speed = 20;
const snackLoc = [0, 0];
let x = 20 * Math.floor(Math.random() * (width / 20 + 1));
let y = 20 * Math.floor(Math.random() * (height / 20 + 1));
let snack = false;
const snakeCoords = [];
const direction = [0, 0];
const length = 10;
const go = 0;
let isPaused = false;
ctx.lineJoin = 'square';
ctx.lineCap = 'square';
ctx.lineWidth = 20;
ctx.lineLength = 100;
ctx.strokeStyle = `hsl(100,100%,50%)`;

function getChange(num, dir) {
  if (num === 0) {
    // X
    if (dir[0] === 0) {
      if (x >= width) {
        x = 0;
      }
      if (dir[1] !== 180) {
        x += speed;
        return 1;
      }
      return 0;
    }
    if (dir[0] === 90) {
      return 0;
    }
    if (dir[0] === 180) {
      if (x <= 0) {
        x = width;
      }
      if (dir[1] !== 0) {
        x -= speed;
        return -1;
      }
      return 0;
    }
    if (dir[0] === 270) {
      return 0;
    }
  } else {
    // Y
    if (dir[0] === 0) {
      return 0;
    }
    if (dir[0] === 90) {
      if (y <= 0) {
        y = height;
      }
      if (dir[1] !== 270) {
        y -= speed;
        return 1;
      }
      return 0;
    }
    if (dir[0] === 180) {
      return 0;
    }
    if (dir[0] === 270) {
      if (y >= height) {
        y = 0;
      }
      if (dir[1] !== 90) {
        y += speed;
        return -1;
      }

      return 0;
    }
  }
}

function buildSnake(dir) {
  for (let i = 0; i < length; i += 1) {
    snakeCoords.unshift([x + i * getChange(0, dir), y + i * getChange(1, dir)]);
  }
}
function updateSnake(dir) {
  if (!isPaused) {
    getChange(0, dir);
    getChange(1, dir);
    snakeCoords.unshift([x, y]);
    if (
      snakeCoords[0][0] === snackLoc[0] &&
      snakeCoords[0][1] === snackLoc[1]
    ) {
      // console.log(snakeCoords[0]);
      // console.log(snackLoc[0]);

      snack = false;
    }
    snakeCoords.pop();
  }
}
function generateSnacks() {
  if (!snack) {
    snackLoc[0] = 20 * Math.floor(Math.random() * (width / 20 + 1));
    snackLoc[1] = 20 * Math.floor(Math.random() * (height / 20 + 1));
    snack = true;
  }
  // ctx.strokeStyle = `hsl(0,100%,50%)`;
  ctx.beginPath();
  ctx.moveTo(snackLoc[0], snackLoc[1]);
  ctx.lineTo(snackLoc[0], snackLoc[1]);
  ctx.stroke();
}
function draw() {
  ctx.beginPath();
  generateSnacks();
  updateSnake(direction);
  for (let i = 0; i < snakeCoords.length; i += 1) {
    ctx.moveTo(snakeCoords[i][0], snakeCoords[i][1]);
    ctx.lineTo(snakeCoords[i][0], snakeCoords[i][1]);
    ctx.stroke();
  }
}
function togglePause() {
  if (isPaused === true) {
    isPaused = false;
  } else {
    isPaused = true;
    // add a ctx pattern that says paused and flashes soft white
  }
}
function handleKey(e) {
  // console.log(e.key);
  if (typeof e !== 'boolean') {
    if (e.key === ' ') {
      e.preventDefault();
      togglePause();
    }
    if (e.key.includes('Arrow')) {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp':
          direction.unshift(90);
          direction.pop();
          break;
        case 'ArrowDown':
          direction.unshift(270);
          direction.pop();
          break;
        case 'ArrowLeft':
          direction.unshift(180);
          direction.pop();
          break;
        case 'ArrowRight':
          direction.unshift(0);
          direction.pop();
          break;
        default:
          break;
      }
    }
  }
}

function gameLoop() {
  window.setTimeout(() => {
    ctx.clearRect(0, 0, width, height);
    draw();
    requestAnimationFrame(gameLoop);
  }, 50);
  // requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', handleKey);
buildSnake(direction);

requestAnimationFrame(gameLoop);
