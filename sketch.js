/* DN3008 Generative Art, Cheng Ziren Alex 2026
 * Week 5 - Randomness & Noise
 * Assignment
 */

let isNight = false; // variable to track day/night mode

// ============================================================
// 1. SETUP & DRAW
// ============================================================
function setup() {
  createCanvas(1100, 800);
  frameRate(20); // slow down the frame rate to see
  noFill(); // no fill for shapes
} 

function draw() {
  // background changes between day and night
  if (isNight) {
    background(0, 0, 0); // black night
  } else {
    background(25, 25, 50); // dark blue day
  }

  // background particles
  stroke(255, 255, 255); // white snow

  var standardDeviation = 400; // standard deviation for Gaussian distribution
  for (var i = 0; i < 5000; i++) {
    // randomGaussian() generates a random number with a Gaussian distribution
    // first argument is the mean (center) of the distribution
    // second argument is the standard deviation (spread) of the distribution
    var backDist = randomGaussian(0, standardDeviation);
    // create a vector with the random distance and a random y-coordinate
    var b = createVector(backDist, random(-height, height));
    // translate the vector to the center of the canvas
    b.add(width / 2, height / 2);
    point(b.x, b.y);
  }

  // sun / moon
  // translate to the position of the sun/moon
  translate(width / 5, height / 4);
  if (!isNight) {
    drawSun(); // draw sun for day
  } else {
    drawMoon(); // draw moon for night
  }

  // mount fuji
  stroke(150, 150, 225); // blue
  for (var i = 0; i < 50000; i++) {
    // random x and y coordinates for the particles
    var x = random(width)-120; // shift left to center the mountain
    var y = random(height);
    if (y > abs(x - 150) * 0.5 + 200) {
      // draw the particle if it is below the mountain shape
      point(x-100, y-100);
    }
  }

  // snow on mount fuji
  stroke(225, 225, 225); // white
  for (var i = 0; i < 4000; i++) {
    // random x and y coordinates for the particles
    var x = random(-100, 500);
    var y = random(100, 400);
    if (y > abs(x - 150) * 0.5 + 200) {
      // draw the particle if it is below the mountain shape
      point(x-100, y-100);
    }
  }

  // pagoda
  drawPagoda(width * 0.6, height * 0.75, 4); // x, y, scale
}

// ============================================================
// 2. SUN / MOON TOGGLE
// ============================================================
// draw sun with red circle
function drawSun() {
  stroke(227, 28, 35);
  for (var i = 0; i < 7000; i++) {
    // random distance from the center of the sun
    var cirDist = (max(random(0, 1), random(0, 1)) * width) / 10;
    // random angle for the point on the sun's circumference
    var angle = random(0, PI * 2);
    // create a vector for the point on the sun's circumference
    var c = createVector(cos(angle), sin(angle));
    c.mult(cirDist); // scale the vector by the random distance
    point(c.x - 20, c.y - 20); // draw the point
  }
}

// draw moon with white crescent
function drawMoon() {
  stroke(255);
  for (var i = 0; i < 5000; i++) {
    // random distance from the center of the moon
    var cirDist = (max(random(0, 1), random(0, 1)) * width) / 10;
    // random angle for the point on the moon's circumference
    var angle = random(0, PI * 2);
    // create a vector for the point on the moon's circumference
    var c = createVector(cos(angle), sin(angle));
    c.mult(cirDist); // scale the vector by the random distance
    var cutoutX = c.x - 55;
    var cutoutY = c.y + 25;
    if (cutoutX * cutoutX + cutoutY * cutoutY > 75 * 75) {
      point(c.x - 20, c.y - 20); // draw the point
    }
  }
}

function keyPressed() {
  // toggle between day and night when spacebar is pressed
  if (key === ' ') {
    isNight = !isNight;
  }
}

// ============================================================
// 3. PAGODA FUNCTIONS
// ============================================================
// draw pagoda with three floors and roofs
function drawPagoda(x, y, s) {
  stroke(255, 0, 0); // red

  // bottom floor
  for (var i = 0; i < 5000; i++) {
    // random x and y coordinates for the particles
    var px = random(x - 30 * s, x + 30 * s);
    var py = random(y - 45 * s, y);

    if ( // only keep particles close to pagoda shape
      px > x - 30 * s + random(-5 * s, 5 * s) &&
      px < x + 30 * s + random(-5 * s, 5 * s)
    ) {
      point(px, py); // draw the particle
    }
  }

  // middle floor
  for (var i = 0; i < 4000; i++) {
    // random x and y coordinates for the particles
    var px = random(x - 23 * s, x + 23 * s);
    var py = random(y - 90 * s, y - 45 * s);
    point(px, py); // draw the particle
  }

  // top floor
  for (var i = 0; i < 3000; i++) {
    // random x and y coordinates for the particles
    var px = random(x - 17 * s, x + 17 * s);
    var py = random(y - 125 * s, y - 90 * s);
    point(px, py); // draw the particle
  }

  // bottom roof
  drawRoof(x, y - 45 * s, 55 * s, 20 * s, 250, 55, 35);
  // middle roof
  drawRoof(x, y - 90 * s, 43 * s, 18 * s, 250, 55, 30);
  // top roof
  drawRoof(x, y - 125 * s, 32 * s, 15 * s, 250, 55, 25);

  // bottom windows
  drawWindow(x - 18 * s, y - 25 * s, 8 * s, 15 * s);
  drawWindow(x, y - 25 * s, 8 * s, 15 * s);
  drawWindow(x + 18 * s, y - 25 * s, 8 * s, 15 * s);
  // middle window
  drawWindow(x, y - 68 * s, 8 * s, 13 * s);
  // top window
  drawWindow(x, y - 105 * s, 7 * s, 11 * s);

  // spire
  stroke(129, 149, 134); // light green
  drawLine(x, y - 140 * s, x, y - 180 * s, 150);

  // spire ornaments
  drawCircle(x, y - 148 * s, 7 * s, 200); // bottom ornament
  drawCircle(x, y - 160 * s, 5 * s, 180); // middle ornament
  drawCircle(x, y - 172 * s, 3 * s, 150); // top ornament
}

// draw roof with triangle shape
function drawRoof(cx, cy, roofWidth, roofHeight, particleCount, roofEdge, verticalLine) {
  stroke(129, 149, 134); // light green
  // draw roof particles
  for (var i = 0; i < particleCount; i++) {
    // random x coordinate within the roof width
    var px = random(cx - roofWidth, cx + roofWidth);
    // triangle roof shape
    var distanceFromCenter = abs(px - cx);
    var roofTop = cy - roofHeight * (1 - distanceFromCenter / roofWidth);
    var py = random(roofTop, cy);
    // random particle displacement
    px += random(-roofEdge / 10, roofEdge / 10);
    py += random(-verticalLine / 10, verticalLine / 10);
    point(px, py); // draw the particle
  }

  // draw roof outline
  drawLine(cx - roofWidth, cy, cx, cy - roofHeight, 250);
  drawLine(cx, cy - roofHeight, cx + roofWidth, cy, 250);
}

// line function
function drawLine(x1, y1, x2, y2, amount) {
  // draw a line with random particles
  for (var i = 0; i < amount; i++) {
    // random interpolation between the two points
    var t = random();
    var x = lerp(x1, x2, t);
    var y = lerp(y1, y2, t);
    // random particle displacement
    x += randomGaussian(0, 2.5);
    y += randomGaussian(0, 2.5);
    point(x, y); // draw the particle
  }
}

// window function
function drawWindow(x, y, w, h) {
  // draw a window with random particles
  stroke(255); // white
  for (var i = 0; i < 100; i++) {
    // random x and y coordinates for the particles
    var px = random(x - w / 2, x + w / 2);
    var py = random(y - h / 2, y + h / 2);
    // only keep particles close to window shape
    if (
      px > x - w / 2 &&
      px < x + w / 2 &&
      py > y - h / 2 &&
      py < y + h / 2
    ) {
      point(px, py); // draw the particle
    }
  }
}

// circle function
function drawCircle(x, y, radius, amount) {
  // draw a circle with random particles
  for (var i = 0; i < amount; i++) {
    // random angle and distance for the particles
    var angle = random(TWO_PI);
    var r = radius / 2 + randomGaussian(0, radius / 6);
    // calculate the x and y coordinates of the particle
    var px = x + cos(angle) * r;
    var py = y + sin(angle) * r;
    point(px, py); // draw the particle
  }
}

