

function setup() {
  createCanvas(500, 500);
}
function draw() {
  background(140);
  for (let row = -1; row < 4; row++) {
    for (let col = -1; col < 4; col++) {
      let x = 100 + col * 150;
      let y = 100 + row * 150;
      drawEye(x, y);
    }
  }
}

function drawEye(x, y) {
  //console.log("the value of x : " + x + "  and the value of y :" + y);

  fill(225);
  stroke(0);
  strokeWeight(3);
  circle(x, y, 125);
  fill(10);
  circle(x - 15, y + 20, 50);
  fill(255);
  circle(x - 25, y + 15, 12);
}