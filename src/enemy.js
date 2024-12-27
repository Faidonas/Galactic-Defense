class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.speed = 1.5;
    this.health = 1; // Default health for regular enemies
  }

  update() {
    this.y += this.speed;
  }

  display() {
    imageMode(CENTER);
    image(enemyImage, this.x, this.y, this.size, this.size);
  }

  collides(bullet) {
    const hitboxPadding = 10; // Adjust this value to make the hitbox larger
    return (
      bullet.x > this.x - hitboxPadding &&
      bullet.x < this.x + this.size + hitboxPadding &&
      bullet.y > this.y - hitboxPadding &&
      bullet.y < this.y + this.size + hitboxPadding
    );
  }
}

class MediumEnemy extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.size = 50;
    this.speed = 1.25; // Medium speed for medium enemies
    this.health = 2; // Medium enemies need 2 hits to die
  }

  display() {
    imageMode(CENTER);
    image(mediumEnemyImage, this.x, this.y, this.size, this.size);
    this.displayHealthBar();
  }

  displayHealthBar() {
    fill(255, 0, 0);
    rect(this.x - this.size / 2, this.y - this.size, this.size, 5);
    fill(0, 255, 0);
    rect(this.x - this.size / 2, this.y - this.size, this.size * (this.health / 2), 5);
  }
}

class StrongEnemy extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.size = 60;
    this.speed = 1; // Slower speed for stronger enemies
    this.health = 3; // Stronger enemies need 3 hits to die
  }

  display() {
    imageMode(CENTER);
    image(strongEnemyImage, this.x, this.y, this.size, this.size);
    this.displayHealthBar();
  }

  displayHealthBar() {
    fill(255, 0, 0);
    rect(this.x - this.size / 2, this.y - this.size, this.size, 5);
    fill(0, 255, 0);
    rect(this.x - this.size / 2, this.y - this.size, this.size * (this.health / 3), 5);
  }
}