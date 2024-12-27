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
  
  // Display hearts
  for (let i = 0; i < lives; i++) {
    image(heartImage, width - (i + 1) * heartWidth - 10, 25, heartWidth, heartHeight); // Display hearts from right to left
  }
}

