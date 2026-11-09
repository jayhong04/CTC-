let squareSize = 350;
let lineWidth = 1.2;

function setup() {
  
  createCanvas(500, 500);
  background(0);
}

function draw() {
  lineWidth = random(1,120);
  rectMode(CORNERS);
  strokeWeight(lineWidth);
  stroke(85, 17, 255, 10);
  fill(0, 220, 0, 34);
  square(10, 250, squareSize);

lineWidth = random(1,80);
  rectMode(RADIUS);
  strokeWeight(lineWidth);
  stroke(12, 1, 150, 60);
  fill(172, 2, 45, 10);
  square(250, 25, squareSize);

  
lineWidth = random(1,150);
  rectMode(CENTER);
  strokeWeight(lineWidth);
  stroke(12, 1, 150, 60);
  fill(0, 0, 0, 10);
  square(250, 250, squareSize);

  
}

