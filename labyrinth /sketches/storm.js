let squares = [];
let startTime;
let lastRound = -1;

const CYCLE = 12;     
const ROUNDS = 5;     
const START_COUNT = 5; 

function setup() {
  createCanvas(windowWidth, windowHeight - 170);
  background(0);
  startTime = millis();
}

function makeSquare(x, y) {
  return {
    x: x,
    y: y,
    vx: random(-0.5, 0.5),
    vy: random(-0.5, 0.5),
    size: random(25, 250),
    mode: random([CORNER, CENTER, RADIUS]),
    phase: random(1000) 
  };
}

function draw() {
  let t = (millis() - startTime) / 1000;
  let round = floor(t / CYCLE);      
  let cycleTime = t % CYCLE;          

  if (t >= CYCLE * ROUNDS) {
    startTime = millis();
    lastRound = -1;
    return;
  }

  if (round !== lastRound) {
    squares = [];
    for (let i = 0; i < START_COUNT; i++) {
      squares.push(makeSquare(random(width), random(height)));
    }
    lastRound = round;
  }

  let intensity = 1 + round * 0.5;
  let maxSquares = START_COUNT + (round + 1) * 8;

  if (cycleTime < 3) {
    fadeScreen(25);
    for (let s of squares) {
      s.x += s.vx;
      s.y += s.vy;
      let breathe = s.size + sin(frameCount * 0.05 + s.phase) * 20;
      drawSquare(s, breathe, random(1, 8), 40);
    }
  }

  else if (cycleTime < 6) {
    fadeScreen(15);
  
    if (frameCount % 5 === 0 && squares.length < maxSquares) {
      let parent = random(squares);
      squares.push(makeSquare(parent.x + random(-60, 60), parent.y + random(-60, 60)));
    }
    for (let s of squares) {
      s.x += s.vx * 2;
      s.y += s.vy * 2;
      drawSquare(s, s.size, random(1, 40), 50);
    }
  }

  else {
    fadeScreen(6);
    for (let s of squares) {
      s.vx += random(-1, 1) * intensity;
      s.vy += random(-1, 1) * intensity;
      s.vx = constrain(s.vx, -12, 12);
      s.vy = constrain(s.vy, -12, 12);
      s.x += s.vx;
      s.y += s.vy;

      if (random() < 0.6) {
        rectMode(random([CORNER, CORNERS, CENTER, RADIUS]));
        drawSquare(s, random(20, 350), random(1, 200), 60, true);
      }
    }
  }

  for (let s of squares) {
    if (s.x < 0 || s.x > width) s.vx *= -1;
    if (s.y < 0 || s.y > height) s.vy *= -1;
    s.x = constrain(s.x, 0, width);
    s.y = constrain(s.y, 0, height);
  }
}

function drawSquare(s, size, weight, alpha, keepMode) {
  if (!keepMode) rectMode(s.mode);
  strokeWeight(weight);
  stroke(random(255), random(255), random(255), alpha);
  fill(random(255), random(255), random(255), alpha * 0.6);
  square(s.x, s.y, size);
}

function fadeScreen(amount) {
  noStroke();
  fill(0, amount);
  rectMode(CORNER);
  rect(0, 0, width, height);
}