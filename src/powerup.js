class PowerUp {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 30;
      this.speed = 2;
      this.type = random(['double', 'triple']); // Different types of power-ups
    }
  
    update() {
      this.y += this.speed;
    }
  
    display() {
      if (this.type === 'double') {
        image(doublePowerUpImage, this.x, this.y, this.size, this.size);
      } else if (this.type === 'triple') {
        image(triplePowerUpImage, this.x, this.y, this.size, this.size);
      }
    }
  
    isCaught(player) {
      let d = dist(this.x, this.y, player.x, player.y);
      return d < this.size / 2 + player.size / 2;
    }
  }