class Player {
    constructor() {
      this.x = width / 2;
      this.y = height - 50;
      this.size = 50;
      this.speed = 5;
    }
  
    update() {
      if (keyIsDown(LEFT_ARROW)) {
        this.x -= this.speed;
      } else if (keyIsDown(RIGHT_ARROW)) {
        this.x += this.speed;
      }
      this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    }
  
    display() {
      imageMode(CENTER);
      image(playerImage, this.x, this.y, this.size, this.size);
    }
  
    shoot() {
      return new Bullet(this.x, this.y - this.size / 2);
    }
  }
  