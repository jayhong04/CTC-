const SHAPES = ["square", "circle", "triangle", "hexagon", "star"];

let shapeType = "";
let layers, twist, size, spin, seed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  newShape();
}

function draw() {
  background(0);

  randomSeed(seed);

  shapeTower(width / 2, height / 2, size, layers, twist, shapeType, spin);
}

function shapeTower(x, y, size, layers, twist, type, spin) {
  for (let i = 0; i < layers; i++) {
    let progress = i / layers;
    let s = size * (1 - progress);
    let angle = i * twist + frameCount * spin * (1 + progress * 2) + random(-0.05, 0.05);
    let weight = random(1, 30) * (1 - progress);

    push();
    translate(x, y);
    rotate(angle);
    strokeWeight(weight);
    stroke(random(255), random(255), random(255), 140);
    fill(random(255), random(255), random(255), 40);
    drawShape(type, s);
    pop();
  }
}


function drawShape(type, s) {
  if (type === "square") {
    square(0, 0, s);
  } else if (type === "circle") {
    
    ellipse(0, 0, s, s * 0.6);
  } else if (type === "triangle") {
    polygon(3, s / 2);
  } else if (type === "hexagon") {
    polygon(6, s / 2);
  } else if (type === "star") {
    star(5, s / 2, s / 4);
  }
}


function polygon(sides, r) {
  beginShape();
  for (let i = 0; i < sides; i++) {
    let a = (TWO_PI / sides) * i;
    vertex(cos(a) * r, sin(a) * r);
  }
  endShape(CLOSE);
}


function star(points, outer, inner) {
  beginShape();
  for (let i = 0; i < points * 2; i++) {
    let a = (PI / points) * i;
    let r = i % 2 === 0 ? outer : inner;
    vertex(cos(a) * r, sin(a) * r);
  }
  endShape(CLOSE);
}

function newShape() {
  let next = random(SHAPES);
  while (next === shapeType) {
    next = random(SHAPES);
  }
  shapeType = next;

  layers = floor(random(6, 50));
  twist = random(-0.6, 0.6);
  size = random(300, 500);
  spin = random([-1, 1]) * random(0.01, 0.05);
  seed = random(100000);
}

function mousePressed() {
  newShape();
}