let screen = "map"; // Default to map screen
let currentLevel = 1; // Tracks the player's current level
let lastUnlockedLevel = 1; // Tracks the highest level unlocked by the player
let totalLevels = 5; // Adjust as needed


// Declare global assets variables
let playerImage, enemyImage, bulletImage, explosionImage, heartImage;
let laserSound, explosionSound;

function preload() {
  playerImage = loadImage('assets/images/player_ship.png');
  enemyImage = loadImage('assets/images/enemy_ship.png');
  mediumEnemyImage = loadImage('assets/images/medium_enemy_ship.png'); // Load medium enemy image
  strongEnemyImage = loadImage('assets/images/strong_enemy_ship.png'); // Load strong enemy image
  explosionImage = loadImage('assets/images/explosions.png');
  bulletImage = loadImage('assets/images/heart.png');
  heartImage = loadImage('assets/images/heart.png');
  backgroundimage = loadImage("assets/images/bg5.jpg");
  //mapImage = loadImage("path-to-your-map-image.jpg"); 
 
  laserSound = loadSound('assets/sounds/laser_shot.wav');
  explosionSound = loadSound('assets/sounds/explosion_sound.wav');
  // bgMusic = loadSound('assets/sounds/background_music.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust the canvas size dynamically
}

function draw() {
    background(30);
  
    if (screen === "map") {
      drawMapScreen(); // Draw the map screen
    } else if (screen === "battle") {
      if (lives <= 0) {
        isGameOver = true; // Set game over flag to true if lives are 0
      }
      drawBattleScreen(); // Draw the battle screen
    }
  
    // Show game over screen if game is over
    if (isGameOver) {
      gameOver(); // Display the game over menu
    }
}

function keyPressed() {
  if (screen === "battle") {
    if (key === ' ') {
      keyPressedBattle();
    }
    if (keyCode === ESCAPE) {
      togglePause(); // Toggle pause when ESC is pressed
    }
  } else if (screen === "map") {
    if (key === 'Enter') {
      startBattle(currentLevel); // Start the current level on Enter
    }
  }
}
  