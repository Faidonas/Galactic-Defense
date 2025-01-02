class Bullet {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 33;
      this.speed = 2;
      this.isHit = false; // Track if the enemy was hit
    }
  
    update() {
      if (!this.isHit) {
        this.y -= this.speed;
      }
    }
  
    display() {
      if (this.isHit) {
        image(explosionImage, this.x, this.y, this.size, this.size);
      } else {
        image(bulletImage, this.x, this.y, this.size, this.size);
      }
    }
  
    collides(bullet) {
      let hit = bullet.x > this.x && bullet.x < this.x + this.size &&
                bullet.y > this.y && bullet.y < this.y + this.size;
      if (hit) {
        this.isHit = true;
        setTimeout(() => {
          this.isHit = false;
        }, 200); // Reset to avoid displaying explosion too long
      }
      return hit;
    }
  }
  