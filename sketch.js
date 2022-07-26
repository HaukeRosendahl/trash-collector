let windowsI = 0;
let windowsF = 0;

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
const asteroids2 = []; ////////
const asteroids3 = [];
const asteroids4 = [];
const asteroids5 = [];
const asteroids6 = [];
const asteroids7 = [];
const asteroids8 = [];
const asteroids9 = [];

// Geschwindigkeit asteroids
let speedy = 0.5;
let rota = 0;

let spacespeed = 6;

// Liste der abgefeuerten Laser
let lasers = [];
let explosions = [];

// scoreboard
let score = 0;

let spaceshipImg;
let asteroidImg1;
let asteroidImg2; /////////
let asteroidImg3;
let asteroidImg4;
let asteroidImg5;
let asteroidImg6;
let asteroidImg7;
let asteroidImg8;
let asteroidImg9;
let windowsImg;
let windowsImg2;
let laserImg;
const shotImg = [];
const explosionImg = [];


// setzt den Focus aufs Spielfeld für die Tastatursteuerung
this.focus();


// Bilder
function preload() {
  spaceshipImg = loadImage('spaceship.png');
  laserImg = loadImage(' shot.png');
  asteroidImg1 = loadImage('asteroid1.png');
  asteroidImg2 = loadImage('asteroid2.png');
  asteroidImg3 = loadImage('asteroid3.png'); //////////
  asteroidImg4 = loadImage('asteroid4.png');
  asteroidImg5 = loadImage('asteroid5.png');
  asteroidImg6 = loadImage('asteroid6.png');
  asteroidImg7 = loadImage('asteroid7.png');
  asteroidImg8 = loadImage('asteroid8.png');
  asteroidImg9 = loadImage('asteroid9.png');
  windowsImg = loadImage('windows.png');
  windowsImg2 = loadImage('windows2.png');

  for (let i = 1; i <= 10; i++) {
    explosionImg.push(loadImage('shot6_exp' + i.toString() + '.png')); 
  }
}


function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(20,20,30);  
  frameRate(60); 

  rota = rota + 0.02;

if (gameOver == false && score > 0) {
  fill(255, 0, 50);
  textSize(20);
  text('Score:', 30, 30);
  text(score, 95, 30)
} else if (gameOver == true) {
  fill(255, 0, 50);
  textSize(20);
  text('Score:', width/2, height/2 +140);
  text(score, width/2, height/2 + 170)
}

if (score == 0 && gameOver == false) {
  fill(255, 0, 50);
  textSize(30);
  text('You are a Trash Collector', (width/2) - 170, (height/2) - 200 );
  text('--', (width/2) - 20, (height/2) - 150);
  text('Get rid of all the Trash in Space!', (width/2) - 220, (height/2) - 100 );
  textSize(20);
  text('Spacebar = Shoot', (width) - 220, (height) - 200 );
  text('Left Arrow = Go Left', (width) - 220, (height) - 150 );
  text('Right Arrow = Go Right', (width) - 220, (height) - 125 );
  text('E = Rotate Right', (width) - 220, (height) - 50   );
  text('Q = Rotate Left', (width) - 220, (height) - 75 );
}






  if (gameOver) {
    
    textSize(40);
    textAlign(CENTER, CENTER)
    fill(255, 0, 50);
    text('GAME OVER', width / 2, (height / 2) - 100);
    textSize(20);
    text('press "F5" to try again', width / 2, (height / 2 ) + 0);
    fill(150);
    textSize(15);
    text('Tip:    1.Dont shoot the CEOs, Rescue them! (Get hit by them)    2.Dont shoot the HAWK, its not trash! (Dont hit it either though)', width / 2, (height / 2 ) + 420);

    
    return;
  }
  
  drawStars();
  drawAsteroids(); 
  drawAsteroids2(); //////
  drawAsteroids3();
  drawAsteroids4();
  drawAsteroids5();
  drawAsteroids6();
  drawAsteroids7();
  drawAsteroids8();
  drawAsteroids9();
  drawLasers();
  drawSpaceship(); 
  drawExplosions();
  

  detectCollisions();
  detectCollisions2(); ////////
  detectCollisions3();
  detectCollisions4();
  detectCollisions5();
  detectCollisions6();
  detectCollisions7();
  detectCollisions8();
  detectCollisions9();

  // draw Spaceship
  push();
  translate(spaceshipX, spaceshipY);
  rotate(rotation);
  
  noStroke()
  fill(255, 50, 0);
  ellipse(0, 0 + random(35, 60), 25, 85);
  fill(255, 80, 0);
  ellipse(0, 0 + random(35, 55), 15, 55); 

  image(spaceshipImg, -36, -66, 74, 120);

  pop();
  //
  
  if (windowsI == 1) {
    image(windowsImg, width/2 - 400, height/ 2 - 500);

    if (mouseIsPressed == true) {
      windowsF = windowsF + 1;
    }
  }
  if (windowsF >= 1) {
    image(windowsImg2, 0, 0, width, height);
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











// Asteoriden
function drawAsteroids() {
  // neue Asteroiden generieren
  if (frameCount % 435 === 0) {
    asteroids.push({ x: random(0, width), y: 0, size: 50 });
  }
  
  // Asteroiden zeichnen
  for (let i = 0; i < asteroids.length; i++) {
    push();
    translate(asteroids[i].x, asteroids[i].y) 
    rotate(rota+0.01);
    image(asteroidImg1, asteroids[i].size / -2, asteroids[i].size / -2, asteroids[i].size, asteroids[i].size);
    pop();
    
    asteroids[i].y += speedy;
    asteroids[i].size += 0.05;

    if (asteroids[i].y > height + 30) {
      gameOver = true;
    }
    
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

          score = score + 70;
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

// Asteoriden22222 /////////////
function drawAsteroids2() {
  // neue Asteroiden generieren
  if (frameCount % 200 === 0) {
    asteroids2.push({ x: random(0, width), y: 0, size: 50 });
  }
  
  // Asteroiden zeichnen
  for (let i = 0; i < asteroids2.length; i++) {
    push();
    translate(asteroids2[i].x, asteroids2[i].y)
    rotate(rota);
    image(asteroidImg2, asteroids2[i].size / -2, asteroids2[i].size / -2, asteroids2[i].size, asteroids2[i].size);
    pop();
    
    asteroids2[i].y += speedy;
    asteroids2[i].size += 0.05;
   
    if (asteroids2[i].y > height + 30) {
      gameOver = true;
    }
  }
}

// Kollisionen22222 //////////
function detectCollisions2() {
  // Kollisionen von Asteroiden mit Lasern
  let asteroid2Collisions = [];
  
  for (let l = 0; l < lasers.length; l++) {
    for (let a = 0; a < asteroids2.length; a++) {
      if (collideRectCircle(
            lasers[l].x - 2, 
            lasers[l].y - 20, 
            4, 
            20, 
            asteroids2[a].x, 
            asteroids2[a].y, 
            asteroids2[a].size)) {
          asteroid2Collisions.push({ laserIndex: l, asteroid2Index: a });
          explosions.push({ x: lasers[l].x, y: lasers[l].y, duration: 0 });

          score = score + 8;
      }
    }
  }
  
  for (let i = 0; i < asteroid2Collisions.length; i++) {
    lasers.splice(asteroid2Collisions[i].laserIndex, 1);
    asteroids2.splice(asteroid2Collisions[i].asteroid2Index, 1);
  }
  
  // Kollisionen von Asteroiden mit dem Raumschiff22222 
  let spaceshipPolygon = getSpaceshipPolygon();
 
  for (let i = 0; i < asteroids2.length && !gameOver; i++) {
    if (collideCirclePoly(
      asteroids2[i].x, 
      asteroids2[i].y, 
      asteroids2[i].size, spaceshipPolygon)) {


      gameOver = true;
    }
  }
}

// Asteoriden333 /////////////
function drawAsteroids3() {
  // neue Asteroiden generieren
  if (frameCount % 1567 === 0) {
    asteroids3.push({ x: random(0, width), y: 0, size: 50 });
  }
  
  // Asteroiden zeichnen
  for (let i = 0; i < asteroids3.length; i++) {
    push();
    translate(asteroids3[i].x, asteroids3[i].y)
    rotate(rota+0.02);
    image(asteroidImg3, asteroids3[i].size / -2, asteroids3[i].size / -2, asteroids3[i].size, asteroids3[i].size);
    pop();
    
    asteroids3[i].y += speedy;
    asteroids3[i].size += 0.05;
   
    if (asteroids3[i].y > height + 30) {
      gameOver = true;
    }
  }
}

// Kollisionen3333 //////////
function detectCollisions3() {
  // Kollisionen von Asteroiden mit Lasern
  let asteroid3Collisions = [];
  
  for (let l = 0; l < lasers.length; l++) {
    for (let a = 0; a < asteroids3.length; a++) {
      if (collideRectCircle(
            lasers[l].x - 2, 
            lasers[l].y - 20, 
            4, 
            20, 
            asteroids3[a].x, 
            asteroids3[a].y, 
            asteroids3[a].size)) {
          asteroid3Collisions.push({ laserIndex: l, asteroid3Index: a });
          explosions.push({ x: lasers[l].x, y: lasers[l].y, duration: 0 });

          score = score + 30000;
      }
    }
  }
  
  for (let i = 0; i < asteroid3Collisions.length; i++) {
    lasers.splice(asteroid3Collisions[i].laserIndex, 1);
    asteroids3.splice(asteroid3Collisions[i].asteroid3Index, 1);
  }
  
  // Kollisionen von Asteroiden mit dem Raumschiff3333 
  let spaceshipPolygon = getSpaceshipPolygon();
 
  for (let i = 0; i < asteroids3.length && !gameOver; i++) {
    if (collideCirclePoly(
      asteroids3[i].x, 
      asteroids3[i].y, 
      asteroids3[i].size, spaceshipPolygon)) {
      gameOver = true;
    }
  }
}

// Asteoriden44444 /////////////
function drawAsteroids4() {
  // neue Asteroiden generieren
  if (frameCount % 1000 === 0) {
    asteroids4.push({ x: random(0, width), y: 0, size: 50 });
  }
  
  // Asteroiden zeichnen
  for (let i = 0; i < asteroids4.length; i++) {
    push();
    translate(asteroids4[i].x, asteroids4[i].y)
    rotate(rota);
    image(asteroidImg4, asteroids4[i].size / -2, asteroids4[i].size / -2, asteroids4[i].size, asteroids4[i].size);
    pop();
    
    asteroids4[i].y += speedy;
    asteroids4[i].size += 0.05;
   
    if (asteroids4[i].y > height + 30) {
      gameOver = true;
    }
  }
}

// Kollisionen44444 //////////
function detectCollisions4() {
  // Kollisionen von Asteroiden mit Lasern
  let asteroid4Collisions = [];
  
  for (let l = 0; l < lasers.length; l++) {
    for (let a = 0; a < asteroids4.length; a++) {
      if (collideRectCircle(
            lasers[l].x - 2, 
            lasers[l].y - 20, 
            4, 
            20, 
            asteroids4[a].x, 
            asteroids4[a].y, 
            asteroids4[a].size)) {
          asteroid4Collisions.push({ laserIndex: l, asteroid4Index: a });
          explosions.push({ x: lasers[l].x, y: lasers[l].y, duration: 0 });

          score = score + 1000;
      }
    }
  }
  
  for (let i = 0; i < asteroid4Collisions.length; i++) {
    lasers.splice(asteroid4Collisions[i].laserIndex, 1);
    asteroids4.splice(asteroid4Collisions[i].asteroid4Index, 1);
  }
  
  // Kollisionen von Asteroiden mit dem Raumschiff4444
  let spaceshipPolygon = getSpaceshipPolygon();
 
  for (let i = 0; i < asteroids4.length && !gameOver; i++) {
    if (collideCirclePoly(
      asteroids4[i].x, 
      asteroids4[i].y, 
      asteroids4[i].size, spaceshipPolygon)) {
      gameOver = true;
    }
  }
}

// Asteoriden5555 /////////////
function drawAsteroids5() {
  // neue Asteroiden generieren
  if (frameCount % 2009 === 0) {
    asteroids5.push({ x: random(0, width), y: 0, size: 50 });
  }
  
  // Asteroiden zeichnen
  for (let i = 0; i < asteroids5.length; i++) {
    push();
    translate(asteroids5[i].x, asteroids5[i].y)
    rotate(rota);
    image(asteroidImg5, asteroids5[i].size / -2, asteroids5[i].size / -2, asteroids5[i].size, asteroids5[i].size);
    pop();
    
    asteroids5[i].y += speedy;
    asteroids5[i].size += 0.05;
   
    if (asteroids5[i].y > height + 30) {
      gameOver = true;
    }
  }
}

// Kollisionen55555 //////////
function detectCollisions5() {
  // Kollisionen von Asteroiden mit Lasern
  let asteroid5Collisions = [];
  
  for (let l = 0; l < lasers.length; l++) {
    for (let a = 0; a < asteroids5.length; a++) {
      if (collideRectCircle(
            lasers[l].x - 2, 
            lasers[l].y - 20, 
            4, 
            20, 
            asteroids5[a].x, 
            asteroids5[a].y, 
            asteroids5[a].size)) {
          asteroid5Collisions.push({ laserIndex: l, asteroid5Index: a });
          explosions.push({ x: lasers[l].x, y: lasers[l].y, duration: 0 });

          speedy = speedy + 0.3;
      }
    }
  }
  
  for (let i = 0; i < asteroid5Collisions.length; i++) {
    lasers.splice(asteroid5Collisions[i].laserIndex, 1);
    asteroids5.splice(asteroid5Collisions[i].asteroid5Index, 1);
  }
  
  // Kollisionen von Asteroiden mit dem Raumschiff55555
  let spaceshipPolygon = getSpaceshipPolygon();
 
  for (let i = 0; i < asteroids5.length && !gameOver; i++) {
    if (collideCirclePoly(
      asteroids5[i].x, 
      asteroids5[i].y, 
      asteroids5[i].size, spaceshipPolygon)) {
      
      gameOver = true;
    }
  }
}

// Asteoriden6666 /////////////
function drawAsteroids6() {
  // neue Asteroiden generieren
  if (frameCount % 2600 === 0) {
    asteroids6.push({ x: random(0, width), y: 0, size: 50 });
  }
  
  // Asteroiden zeichnen
  for (let i = 0; i < asteroids6.length; i++) {
    push();
    translate(asteroids6[i].x, asteroids6[i].y)
    rotate(rota - 0.2);
    image(asteroidImg6, asteroids6[i].size / -2, asteroids6[i].size / -2, asteroids6[i].size, asteroids6[i].size);
    pop();
    
    asteroids6[i].y += speedy;
    asteroids6[i].size += 0.05;
   
    if (asteroids6[i].y > height + 30) {
      gameOver = true;
    }
  }
}

// Kollisionen6666 //////////
function detectCollisions6() {
  // Kollisionen von Asteroiden mit Lasern
  let asteroid6Collisions = [];
  
  for (let l = 0; l < lasers.length; l++) {
    for (let a = 0; a < asteroids6.length; a++) {
      if (collideRectCircle(
            lasers[l].x - 2, 
            lasers[l].y - 20, 
            4, 
            20, 
            asteroids6[a].x, 
            asteroids6[a].y, 
            asteroids6[a].size)) {
          asteroid6Collisions.push({ laserIndex: l, asteroid6Index: a });
          explosions.push({ x: lasers[l].x, y: lasers[l].y, duration: 0 });

          score = score + 1;
      }
    }
  }
  
  for (let i = 0; i < asteroid6Collisions.length; i++) {
    lasers.splice(asteroid6Collisions[i].laserIndex, 1);
    asteroids6.splice(asteroid6Collisions[i].asteroid6Index, 1);
  }
  
  // Kollisionen von Asteroiden mit dem Raumschiff6666 
  let spaceshipPolygon = getSpaceshipPolygon();
 
  for (let i = 0; i < asteroids6.length && !gameOver; i++) {
    for (let a = 0; a < asteroids6.length; a++) {
    if (collideCirclePoly(
      asteroids6[i].x, 
      asteroids6[i].y, 
      asteroids6[i].size, spaceshipPolygon)) {
        asteroid6Collisions.push({asteroid6Index: a });
        for (let i = 0; i < asteroid6Collisions.length; i++) {
          
          asteroids6.splice(asteroid6Collisions[i].asteroid6Index, 1);
        }

        score = score + 148100000000


      
      }
    }
  }
}

// Asteoriden7 /////////////
function drawAsteroids7() {
  // neue Asteroiden generieren
  if (frameCount % 3802 === 0) {
    asteroids7.push({ x: random(0, width), y: 0, size: 50 });
  }
  
  // Asteroiden zeichnen
  for (let i = 0; i < asteroids7.length; i++) {
    push();
    translate(asteroids7[i].x, asteroids7[i].y)
    rotate(rota - 0.2);
    image(asteroidImg7, asteroids7[i].size / -2, asteroids7[i].size / -2, asteroids7[i].size, asteroids7[i].size);
    pop();
    
    asteroids7[i].y += speedy;
    asteroids7[i].size += 0.05;
   
    if (asteroids7[i].y > height + 30) {
      gameOver = true;
    }
  }
}

// Kollisionen7 //////////
function detectCollisions7() {
  // Kollisionen von Asteroiden mit Lasern
  let asteroid7Collisions = [];
  
  for (let l = 0; l < lasers.length; l++) {
    for (let a = 0; a < asteroids7.length; a++) {
      if (collideRectCircle(
            lasers[l].x - 2, 
            lasers[l].y - 20, 
            4, 
            20, 
            asteroids7[a].x, 
            asteroids7[a].y, 
            asteroids7[a].size)) {
          asteroid7Collisions.push({ laserIndex: l, asteroid7Index: a });
          explosions.push({ x: lasers[l].x, y: lasers[l].y, duration: 0 });

          score = score + 1;
      }
    }
  }
  
  for (let i = 0; i < asteroid7Collisions.length; i++) {
    lasers.splice(asteroid7Collisions[i].laserIndex, 1);
    asteroids7.splice(asteroid7Collisions[i].asteroid7Index, 1);
  }
  
  // Kollisionen von Asteroiden mit dem Raumschiff7
  let spaceshipPolygon = getSpaceshipPolygon();
 
  for (let i = 0; i < asteroids7.length && !gameOver; i++) {
    for (let a = 0; a < asteroids7.length; a++) {
    if (collideCirclePoly(
      asteroids7[i].x, 
      asteroids7[i].y, 
      asteroids7[i].size, spaceshipPolygon)) {
        asteroid7Collisions.push({asteroid7Index: a });
        for (let i = 0; i < asteroid7Collisions.length; i++) {
          
          asteroids7.splice(asteroid7Collisions[i].asteroid7Index, 1);
        }

        spacespeed = spacespeed + 1


      
      }
    }
  }
}

// Asteoriden8 /////////////
function drawAsteroids8() {
  // neue Asteroiden generieren
  if (frameCount % 4564 === 0) {
    asteroids8.push({ x: random(0, width), y: 0, size: 50 });
  }
  
  // Asteroiden zeichnen
  for (let i = 0; i < asteroids8.length; i++) {
    push();
    translate(asteroids8[i].x, asteroids8[i].y)
    rotate(rota);
    image(asteroidImg8, asteroids8[i].size / -2, asteroids8[i].size / -2, asteroids8[i].size, asteroids8[i].size);
    pop();
    
    asteroids8[i].y += speedy;
    asteroids8[i].size += 0.05;
   
    if (asteroids8[i].y > height + 30) {
      
    }
  }
}

// Kollisionen8 //////////
function detectCollisions8() {
  // Kollisionen von Asteroiden mit Lasern
  let asteroid8Collisions = [];
  
  for (let l = 0; l < lasers.length; l++) {
    for (let a = 0; a < asteroids8.length; a++) {
      if (collideRectCircle(
            lasers[l].x - 2, 
            lasers[l].y - 20, 
            4, 
            20, 
            asteroids8[a].x, 
            asteroids8[a].y, 
            asteroids8[a].size)) {
          asteroid8Collisions.push({ laserIndex: l, asteroid8Index: a });
          explosions.push({ x: lasers[l].x, y: lasers[l].y, duration: 0 });

          score = score - 60000;
      }
    }
  }
  
  for (let i = 0; i < asteroid8Collisions.length; i++) {
    lasers.splice(asteroid8Collisions[i].laserIndex, 1);
    asteroids8.splice(asteroid8Collisions[i].asteroid8Index, 1);
  }
  
  // Kollisionen von Asteroiden mit dem Raumschiff8
  let spaceshipPolygon = getSpaceshipPolygon();
 
  for (let i = 0; i < asteroids8.length && !gameOver; i++) {
    if (collideCirclePoly(
      asteroids8[i].x, 
      asteroids8[i].y, 
      asteroids8[i].size, spaceshipPolygon)) {
      gameOver = true;
    }
  }
}

// Asteoriden9 /////////////
function drawAsteroids9() {
  // neue Asteroiden generieren
  if (frameCount % 5327 === 0) {
    asteroids9.push({ x: random(0, width), y: 0, size: 50 });
  }
  
  // Asteroiden zeichnen
  for (let i = 0; i < asteroids9.length; i++) {
    push();
    translate(asteroids9[i].x, asteroids9[i].y)
    rotate(rota - 0.2);
    image(asteroidImg9, asteroids9[i].size / -2, asteroids9[i].size / -2, asteroids9[i].size, asteroids9[i].size);
    pop();
    
    asteroids9[i].y += speedy;
    asteroids9[i].size += 0.05;
   
    if (asteroids9[i].y > height + 30) {
      gameOver = true;
    }
  }
}

// Kollisionen9 //////////
function detectCollisions9() {
  // Kollisionen von Asteroiden mit Lasern
  let asteroid9Collisions = [];
  
  for (let l = 0; l < lasers.length; l++) {
    for (let a = 0; a < asteroids9.length; a++) {
      if (collideRectCircle(
            lasers[l].x - 2, 
            lasers[l].y - 20, 
            4, 
            20, 
            asteroids9[a].x, 
            asteroids9[a].y, 
            asteroids9[a].size)) {
          asteroid9Collisions.push({ laserIndex: l, asteroid9Index: a });
          explosions.push({ x: lasers[l].x, y: lasers[l].y, duration: 0 });

          score = score + 1;
      }
    }
  }
  
  for (let i = 0; i < asteroid9Collisions.length; i++) {
    lasers.splice(asteroid9Collisions[i].laserIndex, 1);
    asteroids9.splice(asteroid9Collisions[i].asteroid9Index, 1);
  }
  
  // Kollisionen von Asteroiden mit dem Raumschiff9
  let spaceshipPolygon = getSpaceshipPolygon();
 
  for (let i = 0; i < asteroids9.length && !gameOver; i++) {
    for (let a = 0; a < asteroids9.length; a++) {
    if (collideCirclePoly(
      asteroids9[i].x, 
      asteroids9[i].y, 
      asteroids9[i].size, spaceshipPolygon)) {
        asteroid9Collisions.push({asteroid9Index: a });
        for (let i = 0; i < asteroid9Collisions.length; i++) {
          
          asteroids9.splice(asteroid9Collisions[i].asteroid9Index, 1);
        }

        ////zeug
        windowsI = 1
        

      
      }
    }
  }
}





// Spaceship
function drawSpaceship() {
  // links und rechts bewegen
  if (keyIsDown(LEFT_ARROW) && spaceshipX >= 2) {
    spaceshipX -= spacespeed;
  } else if (keyIsDown(RIGHT_ARROW) && spaceshipX <= width - 2) {
    spaceshipX += spacespeed;
  }
  
  // rotieren
  if (keyIsDown(81)) {
    rotation -= 0.05;
  } else if (keyIsDown(69)) {
    rotation += 0.05;
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