const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const { width, height } = canvas;
const speed = 10;

let x = Math.floor((Math.random() * width) / 2);
let y = Math.floor((Math.random() * height) / 2);

const snakeCoords = [];
let direction = 0;
const length = 100;
ctx.lineJoin = 'square';
ctx.lineCap = 'square';
ctx.lineWidth = 20;
ctx.lineLength = 100;
ctx.strokeStyle = `hsl(100,100%,50%)`;

function getChange(num, dir) {
  if (num === 0) {
    if (dir === 0) {
      x += speed;
      return 1;
    }
    if (dir === 90) {
      return 0;
    }
    if (dir === 180) {
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
      y -= speed;
      return 1;
    }
    if (dir === 180) {
      return 0;
    }
    if (dir === 270) {
      y += speed;
      return -1;
    }
  }
}

function buildSnake(dir) {
  for (let i = 0; i < length; i++) {
    snakeCoords.unshift([
      x + i * getChange(0, direction),
      y + i * getChange(1, direction),
    ]);
  }
}
function updateSnake(dir) {
  snakeCoords.unshift([x + getChange(0, dir), y + getChange(1, dir)]);
  snakeCoords.pop();
}
function draw(dir) {
  ctx.beginPath();
  updateSnake(dir);
  console.log(snakeCoords);
  for (let i = 0; i < snakeCoords.length; i++) {
    ctx.moveTo(snakeCoords[i][0], snakeCoords[i][1]);
    ctx.lineTo(snakeCoords[i][0], snakeCoords[i][1]);
    ctx.stroke();
  }
}

function handleKey(e) {
  if (typeof e !== 'boolean') {
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
    draw(direction);
  }
}
function gameLoop() {
  ctx.clearRect(0, 0, width, height);
  draw(direction);

  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', handleKey);
buildSnake(direction);
requestAnimationFrame(gameLoop);
