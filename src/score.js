function displayScore() {
  fill(255);
  textSize(18);
  textAlign(LEFT);
  text("Score: " + score, 10, 25);
}

function displayLevel() {
  fill(255);
  textSize(18);
  textAlign(LEFT);
  text("Level: " + currentLevel, 10, 45);
}

// Display lives as hearts
function displayLives() {
  const heartWidth = 30; // Width of the heart image
  const heartHeight = 30; // Height of the heart image
  const maxLives = 10; // Max number of lives
  
  // Display hearts
  for (let i = 0; i < lives; i++) {
    image(heartImage, width - (i + 1) * heartWidth - 10, 25, heartWidth, heartHeight); // Display hearts from right to left
  }
}

function gameOver() {
  textSize(64);
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);  // Red color for "Game Over"
  text("GAME OVER", width / 2, height / 2);

  // Stop any ongoing music or sounds
  // bgMusic.stop();  // Uncomment if you're using background music

  // Optionally, you can stop the game or reset it after some time
  noLoop();  // Stops the draw loop to freeze the game
}

