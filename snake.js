const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const { width, height } = canvas;
const MOVE_AMOUNT = 10;
let x = Math.floor((Math.random() * width) / 2);
let y = Math.floor((Math.random() * height) / 2);
let xi = x;
let yi = y;
let direction = 0;
const length = 50;
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
    case 90:
      y -= MOVE_AMOUNT;
      yi = y + length;
      xi = x;
      break;
    case 0:
      x += MOVE_AMOUNT;
      xi = x - length;
      yi = y;
      break;
    case 270:
      y += MOVE_AMOUNT;
      yi = y - length;
      xi = x;
      break;
    case 180:
      x -= MOVE_AMOUNT;
      xi = x - length;
      yi = y;
      break;

    default:
      break;
  }
  // start the path
  ctx.beginPath();
  ctx.moveTo(xi, yi);
  ctx.lineTo(x, y);
  ctx.stroke();
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
    console.log(x, y, xi, yi);
  }
}
function gameLoop() {
  ctx.clearRect(0, 0, width, height);
  draw(direction);

  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', handleKey);
requestAnimationFrame(gameLoop);
