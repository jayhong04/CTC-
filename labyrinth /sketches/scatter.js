let s = 0, x, y, sz, f = 0;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  x = random(width);
  y = random(height);
  sz = random(5, 200);
  f++;
  
  if (s === 0) {
    background(0, 50);
    fill(random(100), random(100), random(100), 200);
    if (f % 3 === 0) ellipse(mouseX + x - 200, mouseY + y - 200, sz, sz);
    if (f % 3 === 1) rect(mouseX + x - 200, mouseY + y - 200, sz, sz);
    if (f % 3 === 2) triangle(mouseX + x - 200, mouseY + y - 200 - sz, mouseX + x - 200 - sz, mouseY + y - 200 + sz, mouseX + x - 200 + sz, mouseY + y - 200 + sz);
  }
  
  if (s === 1) {
    background(0, 5);
    fill(random(255), random(255), random(255), 150);
    if (f % 3 === 0) ellipse(x, y, sz, sz);
    if (f % 3 === 1) rect(x, y, sz, sz);
    if (f % 3 === 2) triangle(x, y - sz, x - sz, y + sz, x + sz, y + sz);
    line(x, y, random(width), random(height));
  }
  
  if (s === 2) {
    background(0, 10);
    fill(random(200), random(200), random(200), 180);
    if (f % 3 === 0) triangle(mouseX, mouseY, x, y, random(width), random(height));
    if (f % 3 === 1) rect(mouseX - sz/2, mouseY - sz/2, sz, sz);
    if (f % 3 === 2) ellipse(mouseX, mouseY, sz, sz);
    line(mouseX, mouseY, x, y);
  }
}