class Star {
    constructor() {
      this.x = random(width); // Random x position
      this.y = random(-height, height); // Random y position (some start above the screen)
      this.size = random(2, 5); // Random size for depth effect
      this.speed = random(1, 5); // Random speed
      this.twinkle = random(100); // Used for brightness variation
    }
  
    update() {
      // Move the star down
      this.y += this.speed;
      
      // If the star moves off-screen, reset it to the top
      if (this.y > height) {
        this.y = random(-100, -10);
        this.x = random(width);
        this.speed = random(1, 5);
      }
      
      // Update twinkle effect
      this.twinkle += 0.1;
    }
  
    show() {
      noStroke();
      // Twinkle effect by varying brightness
      let brightness = map(sin(this.twinkle), -1, 1, 150, 255);
      fill(brightness);
      ellipse(this.x, this.y, this.size);
    }
  }