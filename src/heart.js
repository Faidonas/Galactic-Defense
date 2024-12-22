class Heart {
    constructor(x, y) {
      this.x = x; // X position
      this.y = y; // Y position
      this.size = 20; // Size of the heart
      this.speed = 2; // Falling speed
    }
  
    // Draw the heart
    display() {
        image(heartImage, this.x, this.y, this.size, this.size);
    }
  
    // Update the heart's position
    update() {
      this.y += this.speed;
    }
  
    // Check if the heart is caught by the player
    isCaught(player) {
      let d = dist(this.x, this.y, player.x, player.y);
      return d < this.size / 2 + player.size / 2;
    }
  }
  