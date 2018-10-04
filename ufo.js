var samples = [];
var colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
var mainloop;
var iterateTime = 1000;
var x, y;
var ufo;
var ufos = [];

var particles = [];
var number = 100;
var flower = 1.5;
var size = 1;


let timer;




var shapes = ['circle', 'disk', 'unknown', 'other', 'triangle', 'cigar', 'light', 'sphere', 'fireball', 'oval', 'diamond', 'changing', 'formation', 'flash', 'cylinder', 'chevron', 'rectangle', 'cross', 'egg', 'teardrop', 'cone'];

function preload() {
  // load data
  table = loadTable('../data/ufo_small.csv', 'csv',
    function(success) {
      console.log('success');
    },
    function(err) {
      console.log(err);
    });

  // load music samples
  for (var i = 1; i < 8; i++) {
    var filename = 'samples/' + i + '.wav';
    var s = loadSound(filename);
    mainloop = loadSound("MainLoop.wav");
    samples.push(s);
  }
}

function setup() {


  all_sightings = table.getRows();
  console.log(all_sightings);
  createCanvas(windowWidth, windowHeight);
  nextRow(0);
  textAlign(CENTER);
  mainloop.loop();

ufo = new Particle(createVector(random(width), random(height)));

  //
  // for (let i = 0; i < number * flower; i++) {
  //   particles.push(new Particle(random(width), random(height)));
  // }
  // rectMode(CENTER);

}

function drawToScreen(i,shape) {
let x =random(width);
let y = random(height);
  fill(colors[i]);
  noStroke();
  ellipse(x, y, 15*i,15*i);

  textSize(38);
  push()
  fill(255);

  text(shape, x, y, 10, 100);
  pop();
}


function draw() {
  // timer = second();
  // console.log(timer);
  // background(0);
  // fill(255, 10);
  // stroke(255);
  // line(width / 2, height / 2 + 100, width / 2, height / 2);
  // noFill();
  // for (let i = 0; i < particles.length; i++) {
  //   particles[i].attraction();
  //   particles[i].Bounce();
  //   particles[i].update();
  //   particles[i].checkedges();
  //   particles[i].display();
  // }
  background(0,10);
  ufo.update();
  ufo.checkEdge();
  ufo.display();
}

var Particle = function(position) {
  this.acceleration = createVector();
  this.velocity = createVector(random(-2.5,2.5), random(-2.5, 2.5));
  this.position = position.copy();
  this.r = 10;
  this.addr = -0.3
  // this.lifespan = 4000.0;
};

//update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.r= this.r + this.addr;
  // this.lifespan -= 2;
};

Particle.prototype.checkEdge = function(){
if(this.r <= 0 || this.r>=10){
  this.addr*=-1;
}
  if(this.position.x > width || this.position.x <0){
    this.velocity.x *=-1;
  }

  if(this.position.y > height || this.position.y <0){
    this.velocity.y *=-1;
  }
  // this.lifespan -= 2;
};

Particle.prototype.display = function(){

  ellipse(this.position.x, this.position.y, this.r, this.r);
  // this.lifespan -= 2;
};
// var Particle = function(x, y) {
//   this.vel = createVector(0, 0);
//   this.acc = createVector(0, 0);
//   this.rotation = 0;
//   this.count = 0;
//   this.blow = 0;
//   this.pos = createVector(x, y);
// };
// //update position
// Particle.prototype.update = function() {
//   this.vel.add(this.acc); // vel = vel + acc;
//   this.pos.add(this.vel);
//   this.acc.mult(0); // pos = pos + vel;
// };
//
// Particle.prototype.checkedges = function() {
//   var C = createVector(width / 2, height / 2);
//   var distance = dist(this.pos.x, this.pos.y, C.x, C.y);
//   var an = atan(this.pos.x / this.pos.y);
//   if (distance > (number / 3) * flower + 5 && this.count == 0) {
//     this.vel.x *= -0.8;
//     this.vel.y *= -0.8;
//     this.count++;
//   } else if (distance < (number / 3) * flower && this.count == 1) {
//     this.count++;
//   } else if (distance > (number / 3) * flower && this.count > 1) {
//     this.vel.x *= -0.8;
//     this.vel.y *= -0.8;
//     this.count = 0;
//   }
// };
//
// Particle.prototype.display = function(index) {
//
//   push();
//   noStroke();
//   fill(255, 50);
//   // fill(colors[index]);
//   translate(this.pos.x, this.pos.y);
//   push();
//   var C = createVector(width / 2, height / 2);
//   var rotateAngle = p5.Vector.sub(this.pos, C);
//   this.rotation = rotateAngle.heading();
//   //draw the dandelion
//   this.drawDandelion(0, 0, 50, 15);
//   pop();
//
//
// };
//
// Particle.prototype.attraction = function() {
//   var EndPoint = createVector(width / 2, height / 2);
//   var attraction = p5.Vector.sub(EndPoint, this.pos);
//   attraction.mult(0.00005);
//   // setTimeout(function(){
//   //   attraction.mult(0.1);
//   // },1000);
//
//   this.applyAttraction(attraction);
// }
//
// Particle.prototype.applyAttraction = function(f) {
//
//   this.acc.add(f);
// }
//
// Particle.prototype.Bounce = function() {
//
//   var C = createVector(width / 2, height / 2);
//   var distance = dist(this.pos.x, this.pos.y, C.x, C.y);
//
//     if (distance < 50) {
//
//       // this.pos.x = lerp(this.pos.x, this.pos.x * 0.1, this.vel.x * 0.01);
//       // this.pos.y = lerp(this.pos.y, this.pos.y * 0.1, this.vel.y * 0.01);
//
//       this.attraction();
//
//     }
//
// }
//
//
// Particle.prototype.drawDandelion = function(x, y, a, b) {
//   scale(0.2);
//   noStroke();
//   push()
//   //rotation
//   rotate(this.rotation + PI / 2);
//   push()
//   rotate(PI / 6);
//   //-25,0,50,15
//   arc(x - 25, y, a, b, 0, PI);
//   arc(x - 25, y, a, b, PI, 0);
//   pop();
//   push()
//   rotate(-PI / 6);
//   arc(x + 25, y, a, b, 0, PI);
//   arc(x + 25, y, a, b, PI, 0);
//   pop();
//   stroke(255);
//   strokeWeight(5);
//   line(x, y, 0, 50);
//   pop();
//   pop();
// }


function cleanText(text) {
  text = text.replace(new RegExp("&#44", 'g'), ",");
  text = text.replace(new RegExp("&#39", 'g'), "'");
  text = text.replace(new RegExp("&amp;", 'g'), "&");
  text = text.replace(new RegExp("&#33", 'g'), "!");
  text = text.replace(new RegExp("&#8217", 'g'), "\'");
  text = text.replace(new RegExp("&#8230", 'g'), "...");
  text = text.replace(new RegExp("&quot;", 'g'), "\"");
  return text.trim();
}




function nextRow(i) {

  // draw description text to screen
  // get the shape of the ufo
  let shape = all_sightings[i]['arr'][4]; //find the shape from the dataset
  if (shape.length <= 0) {
    shape = 'unknown';
  }
  let index = shapes.indexOf(shape) % 7;

  console.log(index);
  console.log(shape);
  // play one sample for each ufo sighting, on a fixed timeout
  setTimeout(function() {
    samples[index].play();

    // console.log(samples[index]);
    if (i < all_sightings.length) {
      nextRow(i + 1);
    }
  }, iterateTime);
  drawToScreen(index,shape);
  // draw(index);

}
