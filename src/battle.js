let player;
let enemies = [];
let bullets = [];
let stars = [];
let hearts = [];
let level = 1 // Keep track of the current battle level within battle.js
let score = 0;
let lives = 5; 
let lastFrame;
let isPaused  // Tracks whether the game is paused
let isGameOver // Tracks whether the game is over
let isLevelComplete = false; // Tracks whether the level is completed

function setupBattle(level) {
  // Initialize game elements for the given level
  player = new Player();
  enemies = [];
  bullets = [];
  stars = [];
  hearts = [];

  // Reset score and lives for the new battle
  score = 0;
  lives = 5;
  isPaused = false;
  isGameOver = false;

  // Generate stars
  for (let i = 0; i < 50; i++) {
    stars.push(new Star());
  }

  spawnEnemies(level); // Spawn enemies based on level
}

function drawBattleScreen() {
  if (isPaused) {
    // Capture the last frame when the game is paused
    if (!lastFrame) {
      lastFrame = get();  // Capture the current frame
    }
    // Draw the captured frame as the background for the pause menu
    drawMenuBackground(lastFrame); 
  } else if (isGameOver) {
    // Capture the last frame when the game is over
    if (!lastFrame) {
      lastFrame = get();  // Capture the current frame
    }
    // Draw the captured frame as the background for the game over menu
    drawMenuBackground(lastFrame); 
  } else if (isLevelComplete) {
    if (!lastFrame) {
      lastFrame = get();
    }
    // Draw the captured frame as the background for the level complete menu
    drawMenuBackground(lastFrame); 
  } else {
    // Continue normal battle flow
    image(backgroundimage, 0, 0, width, height); // Display the background

    spawnHeart();
    
    // Update and display hearts
    for (let i = hearts.length - 1; i >= 0; i--) {
      hearts[i].update();
      hearts[i].display();

      // Check if the player catches the heart
      if (hearts[i].isCaught(player)) {
        hearts.splice(i, 1); // Remove the heart
        lives = min(lives + 1, 10); // Add a life, capped at 5
      }

      // Remove hearts that fall off the screen
      if (hearts[i] && hearts[i].y > height) {
        hearts.splice(i, 1);
      }
    }

    // Update and display stars (background)
    for (let star of stars) {
      star.update();
      star.show();
    }

    // Player logic
    player.update();
    player.display();

    // Bullet logic
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].update();
      bullets[i].display();

      // Remove bullet if off-screen
      if (bullets[i].y < 0) {
        bullets.splice(i, 1);
      }
    }

    // Enemy logic
    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].update();
      enemies[i].display();

      // Check collisions with bullets
      for (let j = bullets.length - 1; j >= 0; j--) {
        if (enemies[i].collides(bullets[j])) {
          explosionSound.play();
          score += 10;
          enemies.splice(i, 1);
          bullets.splice(j, 1);
          break;
        }
      }

      // Check if enemy reaches the bottom
      if (enemies[i] && enemies[i].y > height) {
        enemies.splice(i, 1);
        lives -= 1;
      }
    }

    // Display UI (score, level, lives)
    displayScore();
    displayLevel();
    displayLives();

    // Check for game over (triggered automatically when lives <= 0)
    checkGameOver();

    // Check for level completion
    if (enemies.length === 0 && !isGameOver) {
      levelComplete();
    }
  }
}

// **Toggle Pause** - When ESC is pressed, toggle between paused and not paused
function togglePause() {
  isPaused = !isPaused; // Toggle the pause state
  if (isPaused) {
    lastFrame = get();  // Capture the current frame when pausing
    noLoop(); // Stop the game loop
    document.getElementById('pause-menu').classList.remove('hidden'); // Show the pause menu

    // Play menuPopUp sound when pause menu opens
    if (menuPopUp.isLoaded()) {
      menuPopUp.play();
    }

    // Start pause menu music after 0.5 seconds
    if (pauseMenuMusic.isLoaded()) {
      setTimeout(() => {
        pauseMenuMusic.loop();
      }, 200); // 200 milliseconds delay
    }
  } else {
    // Stop pause menu music when resuming
    if (pauseMenuMusic.isPlaying()) {
      pauseMenuMusic.stop();
    }
    loop(); // Resume the game loop
    document.getElementById('pause-menu').classList.add('hidden'); // Hide the pause menu
  }
}

// **Game Over Toggle** - Automatically triggered when the player loses
function gameOverToggle() {
    // Show the game over screen and stop the game loop
    document.getElementById('game-over-menu').classList.remove('hidden'); // Show the game over menu
    noLoop(); // Stop the game loop to keep the game over screen visible
}

// **Handle Pause Menu Selection** - Handles the selection when an option is clicked
function handlePauseSelection(option) {
  // Play button click sound
  if (buttonClicked.isLoaded()) {
    buttonClicked.play();
  }

  if (option === "Resume") {
    isPaused = false; // Resume the battle
    document.getElementById('pause-menu').classList.add('hidden');

    // Stop pause menu music when resuming
    if (pauseMenuMusic.isPlaying()) {
      pauseMenuMusic.stop();
    }
  } else if (option === "Go to Map") {
    screen = "map"; // Go back to the map screen
    document.getElementById('pause-menu').classList.add('hidden');

    // Stop pause menu music when leaving
    if (pauseMenuMusic.isPlaying()) {
      pauseMenuMusic.stop();
    }
  }
  loop(); // Resume the game loop
}

// **Handle Game Over Menu Selection** - Handles the selection when an option is clicked
function handleGameOverSelection(option) {
  // Play button click sound
  if (buttonClicked.isLoaded()) {
    buttonClicked.play();
  }
  if (option === "Retry") {
    setupBattle(level); // Retry the current level
    isGameOver = false;
    document.getElementById('game-over-menu').classList.add('hidden');
  } else if (option === "Go to Map") {
    screen = "map"; // Go back to the map screen
    isGameOver = false;
    document.getElementById('game-over-menu').classList.add('hidden');
  }
  loop(); // Resume the game loop
}

function handleLevelCompleteSelection() {
  // Play button click sound
  if (buttonClicked.isLoaded()) {
    buttonClicked.play();
  }
  // Handle the "Continue" button click
  isLevelComplete = false;
  document.getElementById('level-complete-menu').classList.add('hidden');
  screen = "map"; // Switch to the map screen
  loop(); // Resume the game loop for the next level
}

// Function to handle the game over logic (automatically triggered when lives reach 0)
function checkGameOver() {
  if (lives <= 0) {
    isGameOver = true; // Game is over, set isGameOver to true
    gameOverToggle(); // Trigger game over toggle automatically
  }
}

function levelComplete() {
  // Called when the player finishes a level
  if (level < totalLevels) {
    level++; // Unlock the next level only if it's less than totalLevels
    lastUnlockedLevel = level; // Update lastUnlockedLevel to the newly unlocked level
  }
  isLevelComplete = true; // Set level complete state
  document.getElementById('level-complete-menu').classList.remove('hidden'); // Show the game over menu
  noLoop(); // Stop the game loop
}

function spawnEnemies(level) {
  // Spawn enemies based on the current level
  for (let i = 0; i < level * 5; i++) {
    let x = random(50, width - 50);
    let y = random(-200, -50);
    enemies.push(new Enemy(x, y));
  }
}

function spawnHeart() {
  if (random(1) < 0.01) { // 1% chance per frame to spawn a heart
    let x = random(50, width - 50); // Random X position
    hearts.push(new Heart(x, -20)); // Spawn the heart slightly above the screen
  }
}

function keyPressedBattle() {
  // Handle player input for the battle screen
  if (key === ' ') {
    bullets.push(player.shoot());
    laserSound.play();
  }
}

function drawMenuBackground(lastFrame) {
  if (lastFrame) {
    image(lastFrame, 0, 0, width, height); // Draw the captured frame as the background
  }
  // Dim the background with a semi-transparent overlay
  fill(0, 0, 0, 10); // Semi-transparent black
  rect(0, 0, width, height); // Cover the entire screen with the overlay
}