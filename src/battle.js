let player;
let enemies = [];
let bullets = [];
let stars = [];
let hearts = [];
let level = 1; // Keep track of the current battle level within battle.js
let wave = 1; // Track the current wave within the level
let maxWaves = 5; // Number of waves per level
let score = 0;
let lives = 5; // Keep lives local to battle.js
let isPaused = false; // Tracks whether the game is paused
let isGameOver = false; // Tracks whether the game is over
let menuOptions = ["Resume", "Go to Map"]; // Menu options
let selectedOption = 0; // Keeps track of the currently selected option
let gameOverOptions = ["Retry", "Go to Map"]; // Options for the game over screen
let selectedGameOverOption = 0; // Track the selected option in the game over screen

function setupBattle(level) {
  console.log(`Setting up battle for level ${level}`); // Debug statement
  // Initialize game elements for the given level
  player = new Player();
  enemies = [];
  bullets = [];
  stars = [];
  hearts = [];
  wave = 1; // Reset wave to 1 for the new level

  // Reset score and lives for the new battle
  score = 0;
  lives = 5; 

  // Generate stars
  for (let i = 0; i < 50; i++) {
    stars.push(new Star());
  }

  spawnEnemies(level, wave); // Spawn enemies based on level and wave
}

function drawBattleScreen() {
  if (isPaused) {
    drawPauseMenu(); // Show pause menu
  } else if (isGameOver) {
    gameOver(); // Show game over screen
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
        //catchHeartSound.play(); // Play a sound effect (optional)
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
          enemies[i].health -= 1; // Decrease health for medium and strong enemies
          if (enemies[i].health <= 0) {
            score += enemies[i] instanceof StrongEnemy ? 30 : enemies[i] instanceof MediumEnemy ? 20 : 10; // More points for medium and strong enemies
            enemies.splice(i, 1);
          }
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

    // Check for game over
    if (lives <= 0) {
      isGameOver = true; // Set the game over flag
      noLoop(); // Stop the game loop to keep the game over screen visible
    }

    // Check for wave completion
    if (enemies.length === 0 && !isGameOver) {
      waveComplete();
    }
  }
}

function waveComplete() {
  // Called when the player finishes a wave
  if (wave < maxWaves) {
    wave++; // Move to the next wave
    spawnEnemies(level, wave); // Spawn enemies for the next wave
  } else {
    levelComplete(); // If all waves are completed, complete the level
  }
}

function levelComplete() {
  // Called when the player finishes a level
  if (level < totalLevels) {
    level++; // Unlock the next level only if it's less than totalLevels
    lastUnlockedLevel = level; // Update lastUnlockedLevel to the newly unlocked level
  }
  screen = "map"; // Switch back to map
}



function keyPressedBattle() {
  // Handle player input for the battle screen
  if (key === ' ') {
    bullets.push(player.shoot());
    laserSound.play();
  }
  if (keyCode === ESCAPE) {
    togglePause(); // Toggle pause when ESC is pressed
  }
}

function gameOver() {
  textSize(64);
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  text("GAME OVER", width / 2, height / 3); // Display "Game Over" message

  // Display game over menu options
  textSize(32);
  for (let i = 0; i < gameOverOptions.length; i++) {
    if (i === selectedGameOverOption) {
      fill(255, 0, 0); // Highlight the selected option
    } else {
      fill(255);
    }
    text(gameOverOptions[i], width / 2, height / 2 + i * 40); // Display options with some vertical spacing
  }
}

// **Toggle Pause** - When ESC is pressed, toggle between paused and not paused
function togglePause() {
  isPaused = !isPaused; // Toggle the pause state
}

// **Draw Pause Menu** - If paused, show the pause menu with options
function drawPauseMenu() {
  background(0, 0, 0, 150); // Semi-transparent background
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("PAUSED", width / 2, height / 3);

  // Draw menu options
  for (let i = 0; i < menuOptions.length; i++) {
    if (i === selectedOption) {
      fill(255, 0, 0); // Highlight selected option
    } else {
      fill(255);
    }
    text(menuOptions[i], width / 2, height / 2 + i * 40); // Spacing between options
  }
}

// **Handle Pause Menu Selection** - Handles the selection when an option is clicked
function handlePauseSelection() {
  if (selectedOption === 0) {
    isPaused = false; // Resume the battle
  } else if (selectedOption === 1) {
    screen = "map"; // Go back to the map screen
    // currentLevel = 1; // Reset level or set to appropriate level
  }
}

function spawnHeart() {
  if (random(1) < 0.01) { // 1% chance per frame to spawn a heart
    let x = random(50, width - 50); // Random X position
    hearts.push(new Heart(x, -20)); // Spawn the heart slightly above the screen
  }
}

function mousePressed() {
  if (screen === "start") {
    // Assuming you have a start screen where levels are selected
    if (mouseY > startButtonY && mouseY < startButtonY + buttonHeight) {
      startLevel(1); // Start the first level when the start button is clicked
    }
  } else if (isGameOver) {
    // Check if player clicked on one of the options
    let optionHeight = 40;
    let startY = height / 2;

    for (let i = 0; i < gameOverOptions.length; i++) {
      let optionY = startY + i * optionHeight;
      if (mouseY > optionY - 20 && mouseY < optionY + 20) {
        selectedGameOverOption = i; // Select the clicked option
        handleGameOverSelection(); // Handle the selected option
        break;
      }
    }
  } else if (isPaused) {
    // Check if player clicked on one of the pause menu options
    let optionHeight = 40;
    let startY = height / 2;

    for (let i = 0; i < menuOptions.length; i++) {
      let optionY = startY + i * optionHeight;
      if (mouseY > optionY - 20 && mouseY < optionY + 20) {
        selectedOption = i; // Select the clicked option
        handlePauseSelection(); // Handle the selected option
        break;
      }
    }
  }
}

function handleGameOverSelection() {
  if (selectedGameOverOption === 0) {
    // Retry the current level
    setupBattle(level); // Reset and start the current level again
    isGameOver = false; // Reset game over state
    loop(); // Resume the game loop
  } else if (selectedGameOverOption === 1) {
    // Go back to the map screen
    screen = "map";
    isGameOver = false; // Reset game over state
    loop();
  }
}

function startLevel(level) {
  console.log(`Starting level ${level}`); // Debug statement
  setupBattle(level);
  screen = "battle"; // Switch to battle screen
}
