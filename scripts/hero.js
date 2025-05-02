let cols, rows;
let cellSize = 10;
let binaryGrid = [];
let flowerRadius = 15;
let center;
let angleOffset = 0;
let flipTimers = [];

function setup() {

  createCanvas(windowWidth * 1.01, windowHeight * 1.01);
  textFont('monospace');
  textSize(cellSize * .8);
  textAlign(CENTER, CENTER);
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  center = createVector(cols / 2, rows / 2);

  for (let y = 0; y < rows; y++) {
    binaryGrid[y] = [];
    let row = [];
    for (let x = 0; x < cols; x++) {
      binaryGrid[y][x] = 0;
      row.push(0);
    }
    flipTimers.push(row);
  }
}

function flipNearbyCells(cx, cy, radius) {
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      let nx = cx + dx;
      let ny = cy + dy;
      if (
        nx >= 0 && nx < cols &&
        ny >= 0 && ny < rows &&
        (dx * dx + dy * dy <= radius * radius)
      ) {
        let now = millis();
        if (now - flipTimers[ny][nx] > 1000) {
          binaryGrid[ny][nx] = 1;
          flipTimers[ny][nx] = now;
        }
      }
    }
  }
}

function draw() {
  //background(34, 19, 20, 50);
  clear();

  angleOffset += 0.01;

  let pulse = sin(frameCount * 0.05) * 1.2;
  let cx = center.x + sin(angleOffset) * 5;
  let cy = center.y + cos(angleOffset) * 5;
  let now = millis();

  let secret = "you found the secret message!";
  let revealDelay = 300;
  let messageStartTime = 2000;
  let secretStartX = floor(center.x - secret.length / 2);

  let mx = floor(mouseX / cellSize);
  let my = floor(mouseY / cellSize);
  let dxMouse = mx - cx;
  let dyMouse = my - cy;
  let angleMouse = atan2(dyMouse, dxMouse);
  let distanceMouse = sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
  let petalLoop = sin(frameCount * 0.01);
  let petalCount = map(petalLoop, -1, 1, 1, 5);
  let petalAmplitude = 10 + pulse;
  let petalRotation = PI;
  let flowerShapeMouse = flowerRadius + petalAmplitude * sin(petalCount * angleMouse + petalRotation);
  let mouseInsideFlower = distanceMouse < flowerShapeMouse * 0.6;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let px = x * cellSize + cellSize / 2;
      let py = y * cellSize + cellSize / 2;

      let dx = x - cx;
      let dy = y - cy;
      let distance = sqrt(dx * dx + dy * dy);
      let angle = atan2(dy, dx);
      let flowerShape = flowerRadius + petalAmplitude * sin(petalCount * angle + petalRotation);
      let isEdge = abs(distance - flowerShape) < 0.5;

      if (dist(mouseX, mouseY, px, py) < cellSize * 1.5) {
        flipNearbyCells(x, y, 2);
      }

      if (binaryGrid[y][x] === 1 && now - flipTimers[y][x] > 1000) {
        binaryGrid[y][x] = 0;
      }

      let output = binaryGrid[y][x];

      if (
        mouseInsideFlower &&
        y === floor(center.y) &&
        x >= secretStartX &&
        x < secretStartX + secret.length &&
        distance < flowerShape * 0.6
      ) {
        let charIndex = x - secretStartX;
        let letterTime = messageStartTime + charIndex * revealDelay;
        if (now > letterTime) {
          output = secret[charIndex];
        } else {
          output = "";
        }
      } else {
        if (isEdge) output = 1;
        if (distance < flowerShape && !isEdge) output = "";
        if (distance < flowerShape * 0.5 && random() < 0.0002) {
          output = random(secret.split(""));
        }
      }

      if (output !== "") {
        fill("#F4F4F4");
      } else {
        fill("#F4F4F4");
      }

      text(output, px, py);
    }
  }

}

