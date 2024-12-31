class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.size = 50;
    this.speed = 8;
    this.powerUp = null; // Track the current power-up
    this.powerUpDuration = 0; // Duration of the power-up
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);

    // Decrease power-up duration
    if (this.powerUpDuration > 0) {
      this.powerUpDuration--;
    } else {
      this.powerUp = null; // Reset power-up when duration ends
    }
  }

  display() {
    imageMode(CENTER);
    image(playerImage, this.x, this.y, this.size, this.size);
    this.displayPowerUpBar(); // Display the power-up time bar
  }

  shoot() {
    let bullets = [];
    if (this.powerUp === 'double') {
      bullets.push(new Bullet(this.x - 10, this.y - this.size / 2));
      bullets.push(new Bullet(this.x + 10, this.y - this.size / 2));
    } else if (this.powerUp === 'triple') {
      bullets.push(new Bullet(this.x - 15, this.y - this.size / 2));
      bullets.push(new Bullet(this.x, this.y - this.size / 2));
      bullets.push(new Bullet(this.x + 15, this.y - this.size / 2));
    } else {
      bullets.push(new Bullet(this.x, this.y - this.size / 2));
    }
    return bullets;
  }

  applyPowerUp(powerUp) {
    this.powerUp = powerUp.type;
    this.powerUpDuration = 600; // Power-up lasts for 600 frames
  }

  displayPowerUpBar() {
    if (this.powerUp) {
      let barWidth = 100;
      let barHeight = 10;
      let x = this.x - barWidth / 2;
      let y = this.y - this.size / 2 - 20;
      let remaining = map(this.powerUpDuration, 0, 600, 0, barWidth);

      fill(255, 0, 0);
      rect(x, y, barWidth, barHeight);
      fill(0, 255, 0);
      rect(x, y, remaining, barHeight);
    }
  }
}