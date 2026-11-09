// A square that bounces off the walls but never hits a corner.

const GAP = 30; // minimum frames between the two walls it is heading for
let sq = { x: 0, y: 0, s: 70, vx: 2.6, vy: 1.9 };
let sinceX = 1000; // frames since the last left/right bounce
let sinceY = 1000; // frames since the last top/bottom bounce

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  placeSquare();
}

// start somewhere that is not already lined up with a corner
function placeSquare() {
  for (let tries = 0; tries < 100; tries++) {
    sq.x = random(width - sq.s);
    sq.y = random(height - sq.s);
    if (steer()) return;
  }
}

function draw() {
  background(0);
  moveSquare();
  fill(255);
  square(sq.x, sq.y, sq.s);
}

function moveSquare() {
  steer();

  sq.x += sq.vx;
  sq.y += sq.vy;
  sinceX++;
  sinceY++;

  // bounce off the left and right walls
  if (sq.x <= 0) {
    sq.x = 0;
    sq.vx = abs(sq.vx);
    sinceX = 0;
  } else if (sq.x >= width - sq.s) {
    sq.x = width - sq.s;
    sq.vx = -abs(sq.vx);
    sinceX = 0;
  }

  // bounce off the top and bottom walls
  if (sq.y <= 0) {
    sq.y = 0;
    sq.vy = abs(sq.vy);
    sinceY = 0;
  } else if (sq.y >= height - sq.s) {
    sq.y = height - sq.s;
    sq.vy = -abs(sq.vy);
    sinceY = 0;
  }
}

// how many frames until the square reaches the wall it is heading toward
function framesToWall(pos, v, max) {
  if (v > 0) return (max - pos) / v;
  return pos / -v;
}

// A corner hit happens when the square reaches a side wall and a top/bottom
// wall at the same moment. So any two bounces on different axes must stay at
// least GAP frames apart: the next two, and each next one against the last one.
function pathIsSafe() {
  let tx = framesToWall(sq.x, sq.vx, width - sq.s);
  let ty = framesToWall(sq.y, sq.vy, height - sq.s);
  return abs(tx - ty) >= GAP && tx + sinceY >= GAP && ty + sinceX >= GAP;
}

// If a corner is coming up, change the speed a little. True when the path is safe.
function steer() {
  for (let tries = 0; tries < 40; tries++) {
    if (pathIsSafe()) return true;
    let newSpeed = random(2, 4);
    if (random() < 0.5) {
      sq.vy = sq.vy > 0 ? newSpeed : -newSpeed;
    } else {
      sq.vx = sq.vx > 0 ? newSpeed : -newSpeed;
    }
  }
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sq.x = constrain(sq.x, 0, max(0, width - sq.s));
  sq.y = constrain(sq.y, 0, max(0, height - sq.s));
  if (!steer()) placeSquare();
}
