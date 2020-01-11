const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const { width, height } = canvas;
const MOVE_AMOUNT = 10;
let x = Math.floor((Math.random() * width) / 2);
let y = Math.floor((Math.random() * height) / 2);
let xi = x;
let yi = y;
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
  console.log(prevDir);
  switch (dir) {
    case 90:
      y -= MOVE_AMOUNT;
      yi = y + length;
      xi = x;
      // start the path
      if (prevDir === 180) {
        ctx.beginPath();
        x -= length;
        xi -= length;
        ctx.moveTo(x, y);
        ctx.lineTo(xi, yi);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(xi, yi);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      break;
    case 0:
      x += MOVE_AMOUNT;
      xi = x - length;
      yi = y;
      // start the path
      ctx.beginPath();
      ctx.moveTo(xi, yi);
      ctx.lineTo(x, y);
      ctx.stroke();
      break;
    case 270:
      y += MOVE_AMOUNT;
      yi = y + length;
      xi = x;
      // start the path
      ctx.beginPath();
      ctx.moveTo(xi, yi);
      ctx.lineTo(x, y);
      ctx.stroke();
      break;
    case 180:
      x -= MOVE_AMOUNT;
      xi = x - length;
      yi = y;
      // start the path
      ctx.beginPath();
      ctx.moveTo(xi, yi);
      ctx.lineTo(x, y);
      ctx.stroke();
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
