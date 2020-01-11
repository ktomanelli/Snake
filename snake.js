const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const { width, height } = canvas;
const MOVE_AMOUNT = 10;
const x = Math.floor((Math.random() * width) / 2);
const y = Math.floor((Math.random() * height) / 2);
let xi = x;
const yi = y;
let direction = 0;
let prevDir = direction;
const length = 200;
ctx.lineJoin = 'square';
ctx.lineCap = 'square';
ctx.lineWidth = 20;
ctx.lineLength = 100;
ctx.strokeStyle = `hsl(100,100%,50%)`;

ctx.beginPath();
ctx.moveTo(xi, yi);
ctx.lineTo(x, y);
ctx.stroke();

function draw(dir) {
  // move x/y according to key press
  switch (dir) {
    case 0:
      if (prevDir !== 180) {
        xi = x - length;
        ctx.beginPath();
        ctx.moveTo(xi, yi);
        ctx.lineTo(x, y);
        ctx.stroke();
        console.log('right');
      }
      break;
    case 90:
      if (prevDir !== 270) {
        console.log('up');
      }
      break;
    case 180:
      if (prevDir !== 0) {
        console.log('left');
      }
      break;
    case 270:
      if (prevDir !== 90) {
        console.log('down');
      }
      break;
    default:
      break;
  }
}

function handleKey(e) {
  if (typeof e !== 'boolean') {
    if (e.key.includes('Arrow')) {
      prevDir = direction;
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
requestAnimationFrame(gameLoop);
