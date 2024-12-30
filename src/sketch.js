let screen = "map"; // Default to map screen
let currentLevel = 1; // Tracks the player's current level
let lastUnlockedLevel = 1; // Tracks the highest level unlocked by the player
let totalLevels = 5; // Adjust as needed


// Declare global assets variables
let playerImage, enemyImage, bulletImage, explosionImage, heartImage, pauseMenuImage, gameOverImage;
let laserSound, explosionSound;
let doublePowerUpImage, triplePowerUpImage;

function preload() {
  playerImage = loadImage('assets/images/player_ship.png');
  enemyImage = loadImage('assets/images/enemy_ship.png');
  mediumEnemyImage = loadImage('assets/images/medium_enemy_ship.png'); // Load medium enemy image
  strongEnemyImage = loadImage('assets/images/strong_enemy_ship.png'); // Load strong enemy image
  explosionImage = loadImage('assets/images/explosions.png');
  bulletImage = loadImage('assets/images/heart.png');
  heartImage = loadImage('assets/images/heart.png');
  backgroundimage = loadImage("assets/images/bg5.jpg");
  mapImage = loadImage("assets/images/map.jpg"); 
  pauseMenuImage = loadImage("assets/images/pausemenu.png");
  gameOverImage = loadImage("assets/images/gameover.png")
  doublePowerUpImage = loadImage('assets/images/double_powerup.png'); // Load double power-up image
  triplePowerUpImage = loadImage('assets/images/triple_powerup.png'); // Load triple power-up image
 
  laserSound = loadSound('assets/sounds/laser_shot.wav');
  explosionSound = loadSound('assets/sounds/explosion_sound.wav');
  buttonClicked = loadSound('assets/sounds/button-clicked.mp3');
  menuPopUp = loadSound('assets/sounds/menu-popup-sound.mp3');
  pauseMenuMusic = loadSound('assets/sounds/pause-menu-music.mp3');
  gameoverSound = loadSound('assets/sounds/game_over_mix.wav');
  bgMusic = loadSound('assets/sounds/background_music.wav');
  winningSound = loadSound('assets/sounds/winning_mix.wav');

  //Tune the volume of the sounds!
  bgMusic.setVolume(0.3);
  explosionSound.setVolume(0.5);

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Set up event listeners for the buttons
  document.getElementById('resume-button').addEventListener('click', function () {
    handlePauseSelection("Resume");
  });

  document.getElementById('map-button').addEventListener('click', function () {
    handlePauseSelection("Go to Map");
  });

  document.getElementById('restart-button').addEventListener('click', function () {
    handleGameOverSelection("Retry");
  });

  document.getElementById('main-menu-button').addEventListener('click', function () {
    handleGameOverSelection("Go to Map");
  });

  // Prevent default scrolling behavior
  window.addEventListener('wheel', function(e) {
    e.preventDefault();
  }, { passive: false });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust the canvas size dynamically
}

function draw() {
  background(30);

  if (screen === "map") {
    drawMapScreen(); // Draw the map screen
  } else if (screen === "battle") {
    drawBattleScreen(); // Draw the battle screen
  }
}

function keyPressed() {
  if (screen === "battle") {
    if (key === ' ') {
      keyPressedBattle();
    }
    if (keyCode === ESCAPE && !isGameOver && !isLevelComplete) {
      togglePause(); // Toggle pause when ESC is pressed
    }
  } else if (screen === "map") {
    if (key === 'Enter') {
      startBattle(currentLevel); // Start the current level on Enter
    }
  }
}
  