class Enemy {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 30;
      this.speed = 1;
    }
  
    update() {
      this.y += this.speed;
    }
  
    display() {
      imageMode(CENTER);
      image(enemyImage, this.x, this.y, this.size, this.size);
    }
  
    collides(bullet) {
      return (
        bullet.x > this.x &&
        bullet.x < this.x + this.size &&
        bullet.y > this.y &&
        bullet.y < this.y + this.size
      );
    }
  }
  