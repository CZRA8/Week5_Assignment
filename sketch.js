/* DN3008 Generative Art, Cheng Ziren Alex 2026
 * Week 5 - Randomness & Noise
 * Assignment
 */

function setup() {
  createCanvas(550, 400);
  frameRate(20); // slow down the frame rate to see
  noFill(); // no fill for shapes
} 

function draw() {
  background(0);

  // background
  stroke(255); // white
  var standardDeviation = 400;
  for (var i = 0; i < 5000; i++) {
    var backDist = randomGaussian(0, standardDeviation);
    var b = createVector(backDist, random(-height, height));
    point(b.x, b.y);
  }

  // sun
  stroke(227, 28, 35); // red
  translate(width / 5, height / 4);
  for (var i = 0; i < 5000; i++) {
    var cirDist = (max(random(0, 1), random(0, 1)) * width) / 10;
    var angle = random(0, PI * 2);
    var c = createVector(cos(angle), sin(angle));
    c.mult(cirDist);
    point(c.x, c.y + 20);
  }

  // mount fuji
  stroke(150, 150, 225); // blue
  for (var i = 0; i < 30000; i++) {
    var x = random(width) - 100;
    var y = random(height);
    if (y > abs(x - 150) * 0.5 + 200) {
      point(x-100, y-100);
    }
  }

  // snow on mount fuji
  stroke(225); // white
  for (var i = 0; i < 2000; i++) {
    var x = random(70, 230);
    var y = random(180, 260);
    if (y > abs(x - 150) * 0.5 + 200) {
      point(x-100, y-100);
    }
  }

  // pagoda
  drawPagoda(width * 0.6, height * 0.75, 2);
}

// pagoda function
function drawPagoda(x, y, s) {
  stroke(255, 0, 0); // red

  // bottom floor
  for (var i = 0; i < 2000; i++) {
    var px = random(x - 30 * s, x + 30 * s);
    var py = random(y - 45 * s, y);

    // slightly noisy edges
    if (
      px > x - 30 * s + random(-5 * s, 5 * s) &&
      px < x + 30 * s + random(-5 * s, 5 * s)
    ) {
      point(px, py);
    }
  }

  // middle floor
  for (var i = 0; i < 2000; i++) {
    var px = random(x - 23 * s, x + 23 * s);
    var py = random(y - 90 * s, y - 45 * s);
    point(px, py);
  }

  // top floor
  for (var i = 0; i < 2000; i++) {
    var px = random(x - 17 * s, x + 17 * s);
    var py = random(y - 125 * s, y - 90 * s);
    point(px, py);
  }

  // bottom roof
  drawNoisyRoof(
    x,
    y - 45 * s,
    55 * s,
    20 * s,
    180,
    55,
    35
  );

  // middle roof
  drawNoisyRoof(
    x,
    y - 90 * s,
    43 * s,
    18 * s,
    200,
    55,
    30
  );

  // top roof
  drawNoisyRoof(
    x,
    y - 125 * s,
    32 * s,
    15 * s,
    220,
    55,
    25
  );

  // windows
  // bottom windows
  drawNoisyWindow(x - 18 * s, y - 25 * s, 8 * s, 15 * s);
  drawNoisyWindow(x,      y - 25 * s, 8 * s, 15 * s);
  drawNoisyWindow(x + 18 * s, y - 25 * s, 8 * s, 15 * s);
  // middle window
  drawNoisyWindow(x, y - 68 * s, 8 * s, 13 * s);
  // top window
  drawNoisyWindow(x, y - 105 * s, 7 * s, 11 * s);
  // spire
  stroke(129, 149, 134); // light green
  drawNoisyLine(
    x,
    y - 140 * s,
    x,
    y - 180 * s,
    150
  );
  // spire ornaments
  drawNoisyCircle(x, y - 148 * s, 7 * s, 80);
  drawNoisyCircle(x, y - 160 * s, 5 * s, 60);
  drawNoisyCircle(x, y - 172 * s, 3 * s, 40);
}

// roof function
function drawNoisyRoof(cx, cy, roofWidth, roofHeight,
                       particleCount, edgeNoise, verticalNoise) {
  stroke(129, 149, 134); // light green
  for (var i = 0; i < particleCount; i++) {
    var px = random(cx - roofWidth, cx + roofWidth);
    // triangle roof shape
    var distanceFromCenter = abs(px - cx);
    var roofTop = cy -
      roofHeight *
      (1 - distanceFromCenter / roofWidth);
    var py = random(roofTop, cy);
    px += random(-edgeNoise / 10, edgeNoise / 10);
    py += random(-verticalNoise / 10, verticalNoise / 10);
    point(px, py);
  }

  stroke(129, 149, 134); // light green
  drawNoisyLine(
    cx - roofWidth,
    cy,
    cx,
    cy - roofHeight,
    250
  );
  drawNoisyLine(
    cx,
    cy - roofHeight,
    cx + roofWidth,
    cy,
    250
  );
  // long curved-looking eaves
  drawNoisyLine(
    cx - roofWidth,
    cy,
    cx - roofWidth - 12,
    cy + 5,
    80
  );
  drawNoisyLine(
    cx + roofWidth,
    cy,
    cx + roofWidth + 12,
    cy + 5,
    80
  );
}

// line function
function drawNoisyLine(x1, y1, x2, y2, amount) {
  for (var i = 0; i < amount; i++) {
    var t = random();
    var x = lerp(x1, x2, t);
    var y = lerp(y1, y2, t);
    // random particle displacement
    x += randomGaussian(0, 2.5);
    y += randomGaussian(0, 2.5);
    point(x, y);
  }
}

// window function
function drawNoisyWindow(x, y, w, h) {
  stroke(255); // white
  for (var i = 0; i < 100; i++) {
    var px = random(x - w / 2, x + w / 2);
    var py = random(y - h / 2, y + h / 2);
    // only keep particles close to window shape
    if (
      px > x - w / 2 &&
      px < x + w / 2 &&
      py > y - h / 2 &&
      py < y + h / 2
    ) {
      point(px, py);
    }
  }
}

// circle function
function drawNoisyCircle(x, y, radius, amount) {
  for (var i = 0; i < amount; i++) {
    var angle = random(TWO_PI);
    var r = radius / 2 + randomGaussian(0, radius / 6);
    var px = x + cos(angle) * r;
    var py = y + sin(angle) * r;
    point(px, py);
  }
}

