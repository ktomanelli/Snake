const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const { width, height } = canvas;
const speed = 20;
const snackLoc = [0, 0];
let x = Math.floor((Math.random() * width) / 20);
let y = Math.floor((Math.random() * height) / 20);
let snack = false;
const snakeCoords = [];
let direction = 0;
const length = 10;
let isPaused = false;
ctx.lineJoin = 'square';
ctx.lineCap = 'square';
ctx.lineWidth = 20;
ctx.lineLength = 100;
ctx.strokeStyle = `hsl(100,100%,50%)`;

function getChange(num, dir) {
  if (num === 0) {
    if (dir === 0) {
      if (x >= width) {
        x = 0;
      }
      x += speed;
      return 1;
    }
    if (dir === 90) {
      return 0;
    }
    if (dir === 180) {
      if (x <= 0) {
        x = width;
      }
      x -= speed;
      return -1;
    }
    if (dir === 270) {
      return 0;
    }
  } else {
    if (dir === 0) {
      return 0;
    }
    if (dir === 90) {
      if (y <= 0) {
        y = height;
      }
      y -= speed;
      return 1;
    }
    if (dir === 180) {
      return 0;
    }
    if (dir === 270) {
      if (y >= height) {
        y = 0;
      }
      y += speed;
      return -1;
    }
  }
}

function buildSnake(dir) {
  for (let i = 0; i < length; i += 1) {
    snakeCoords.unshift([
      x + i * getChange(0, direction),
      y + i * getChange(1, direction),
    ]);
  }
}
function updateSnake(dir) {
  if (!isPaused) {
    snakeCoords.unshift([x + getChange(0, dir), y + getChange(1, dir)]);
    if (snakeCoords[0] === snackLoc) {
      snack = false;
    }
    snakeCoords.pop();
  }
}
function generateSnacks() {
  if (!snack) {
    snackLoc[0] = Math.floor((Math.random() * width) / 20);
    snackLoc[1] = Math.floor((Math.random() * height) / 20);
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
  console.log(snakeCoords);
  console.log(snackLoc);
  // console.log(speed);
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
      // console.log(isPaused);
    }
    if (e.key.includes('Arrow')) {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp':
          direction = 90;
          break;
        case 'ArrowDown':
          direction = 270;
          break;
        case 'ArrowLeft':
          direction = 180;
          break;
        case 'ArrowRight':
          direction = 0;
          break;
        default:
          break;
      }
    }
    // draw();
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
