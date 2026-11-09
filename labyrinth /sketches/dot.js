let x
let y 
x = 20;
y = 15;

function setup() {
  x= 20
  createCanvas(600, 600);
  background(225, 235, 14)
}

function draw() {
  
 circle(x,y,12);
  x = x + 5;
  y = y + 5;
  
  console.log("the value of x : " + x + "  and the value of y :" + y);

}

function mousePressed(){
  background(220);
}