class Enemy {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 30;
      this.speed = 1.5;
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
  