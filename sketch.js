// x Position vom Raumschiff
let spaceshipX = innerWidth / 2;
// y Position vom Raumschiff
let spaceshipY = innerHeight - 70;
// Rotation vom Raumschiff
let rotation = 0;
// gibt an, ob das Spiel schon vorbei ist weil das Raumschiff getroffen wurde
let gameOver = false;
// Liste der Sterne
let stars = [];
// Liste der Asteroiden
const asteroids = [];
// Liste der abgefeuerten Laser
let lasers = [];
let explosions = [];

let spaceshipImg;
let asteroidImg;
let laserImg;
const shotImg = [];
const explosionImg = [];


// setzt den Focus aufs Spielfeld für die Tastatursteuerung
this.focus();


// Bilder
function preload() {
  laserImg = loadImage(' shot.png');
  asteroidImg = loadImage('asteroid.png');
  
  
  for (let i = 1; i <= 10; i++) {
    explosionImg.push(loadImage('shot6_exp' + i.toString() + '.png')); 
  }
}


function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(20,20,30);

  if (gameOver) {
    textSize(40);
    textAlign(CENTER, CENTER)
    fill('white');
    text('GAME OVER', width / 2, height / 2);
    return;
  }
  
  drawStars();
  drawAsteroids(); 
  drawLasers();
  drawSpaceship(); 
  drawExplosions();
  

  detectCollisions();

  // draw Spaceship
  push();
  translate(spaceshipX, spaceshipY);
  rotate(rotation);
  
  noStroke()
  fill(255, 50, 0);
  ellipse(0, 0 + random(35, 60), 25, 85);
  fill(255, 80, 0);
  ellipse(0, 0 + random(35, 55), 15, 55); 

  stroke(30);
  
  fill(255, 0, 50);
  arc(0, 0 + 36, 40, 40, PI, 0, CHORD);
 
  fill(255, 255, 255);
  ellipse(0, 0, 30, 80);
 
  fill(100, 200, 255);
  ellipse(0, 0 - 12, 15, 15);
  
 
  fill(255, 0, 50);
  ellipse(0, 0 + 32, 5, 30);

  triangle(0-1.5, 0-39, 0+1.5, 0-39, 0, 0-60);

  triangle(0-5, 0-38, 0+5, 0-38, 0, 0-45);

  pop();
  //
  
  
}


// Asteoriden
function drawAsteroids() {
  // neue Asteroiden generieren
  if (frameCount % 120 === 0) {
    asteroids.push({ x: random(0, width), y: 0, size: 50 });
  }
  
  // Asteroiden zeichnen
  for (let i = 0; i < asteroids.length; i++) {
    push();
    translate(asteroids[i].x, asteroids[i].y)
    image(asteroidImg, asteroids[i].size / -2, asteroids[i].size / -2, asteroids[i].size, asteroids[i].size);
    pop();
    
    asteroids[i].y++;
    asteroids[i].size += 0.05;
  }
}

// Laser
function keyPressed() {
  if (keyCode === 32) {
    lasers.push({ x: spaceshipX, y: spaceshipY, rotation: rotation, age: 0 });
  }
}  

function drawLasers() {
  for (let i = 0; i < lasers.length; i++) {
    push(); 
    translate(lasers[i].x, lasers[i].y );
    rotate(lasers[i].rotation);
    let imgNumber = Math.min(3, Math.floor(lasers[i].age / 3));
    image(laserImg,  -6 ,  0 ,  12,  60);
    pop();
     
    // neue Position berechnen
    lasers[i].x += 10 * sin(lasers[i].rotation);
    lasers[i].y -= 10 * cos(lasers[i].rotation);
    lasers[i].age++;
  }
  
  // alte Laser entfernen
  lasers = lasers.filter(l => l.x >= 0 && l.x <= width && l.y >= 0 && l.y <= height);
}

// Spaceship
function drawSpaceship() {
  // links und rechts bewegen
  if (keyIsDown(LEFT_ARROW) && spaceshipX >= 2) {
    spaceshipX -= 6;
  } else if (keyIsDown(RIGHT_ARROW) && spaceshipX <= width - 2) {
    spaceshipX += 6;
  }
  
  // rotieren
  if (keyIsDown(81)) {
    rotation -= 0.05;
  } else if (keyIsDown(69)) {
    rotation += 0.05;
  }
}

// Kollisionen
function detectCollisions() {
  // Kollisionen von Asteroiden mit Lasern
  let asteroidCollisions = [];
  
  for (let l = 0; l < lasers.length; l++) {
    for (let a = 0; a < asteroids.length; a++) {
      if (collideRectCircle(
            lasers[l].x - 2, 
            lasers[l].y - 20, 
            4, 
            20, 
            asteroids[a].x, 
            asteroids[a].y, 
            asteroids[a].size)) {
          asteroidCollisions.push({ laserIndex: l, asteroidIndex: a });
          explosions.push({ x: lasers[l].x, y: lasers[l].y, duration: 0 });
      }
    }
  }
  
  for (let i = 0; i < asteroidCollisions.length; i++) {
    lasers.splice(asteroidCollisions[i].laserIndex, 1);
    asteroids.splice(asteroidCollisions[i].asteroidIndex, 1);
  }
  
  // Kollisionen von Asteroiden mit dem Raumschiff
  let spaceshipPolygon = getSpaceshipPolygon();
 
  for (let i = 0; i < asteroids.length && !gameOver; i++) {
    if (collideCirclePoly(
      asteroids[i].x, 
      asteroids[i].y, 
      asteroids[i].size, spaceshipPolygon)) {
      gameOver = true;
    }
  }
}

function getSpaceshipPolygon() {
  let spaceshipPolygon = [];
  addPointToPolygon(spaceshipPolygon, 0, -50);
  addPointToPolygon(spaceshipPolygon, 15, -30);
  addPointToPolygon(spaceshipPolygon, 15, 0);
  addPointToPolygon(spaceshipPolygon, 15, 40);
  addPointToPolygon(spaceshipPolygon, -15, 40);
  addPointToPolygon(spaceshipPolygon, -15, 0);
  addPointToPolygon(spaceshipPolygon, -15, -30);
  return spaceshipPolygon;
}

function addPointToPolygon(polygon, x, y) {
  push();
  tf = new Transformer();
  tf.rotate(rotation);
  tf.translate(x, y);
  polygon.push(createVector(spaceshipX + tf.x, spaceshipY + tf.y));
  pop();
}

// Explosionen
function drawExplosions() {
  for (let i = 0; i < explosions.length; i++) {
    push();
    translate(explosions[i].x, explosions[i].y);
    scale(2);
    let imgNumber = Math.min(9, Math.floor(explosions[i].duration / 3));
    image(explosionImg[imgNumber],  -24,  -24,  48,  48);
    pop();
    
    explosions[i].duration++;
  }
  
  explosions = explosions.filter(e => e.duration / 3 <= 9);
}

// Sterne
function drawStars() {
  // nach einer Lösung von https://editor.p5js.org/amyxiao/sketches/S1qEhKf2Z
  // alte Sterne löschen
  stars = stars.filter(star => star.z >= 0);
  
  // neue Sterne generieren
  for (let i = 0; i < frameCount / 600; i++) {
    stars.push({
      x: random(-width / 2, width / 2),
      y: random(-height / 2, height / 2),
      z: random(width)
    });
  }
  
  // Sterne zeichnen
  push();
  translate(width / 2, height / 2);
  fill(230, 255, 100);
  noStroke();
  
  let speed = frameCount / 600 + 1;
  
  for (let i = 0; i < stars.length; i++) { 
    let star = stars[i];
    star.z = star.z - speed;
    sx = star.x / star.z * width;
    sy = star.y / star.z * height;
    r = map(star.z, width, 0, 0, 8);
    circle(sx, sy, r);
  }
  
  pop();
}