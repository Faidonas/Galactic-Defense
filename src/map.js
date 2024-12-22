function drawMapScreen() {
    background(200);
  
    for (let i = 0; i < totalLevels; i++) {
      let x = width / 2 - totalLevels * 50 + i * 100; // Spread levels horizontally
      let y = height / 2;
  
      // Check if the level is unlocked
      if (i < lastUnlockedLevel) {
        fill(0, 255, 0); // Green for unlocked levels
      } else {
        fill(200); // Gray for locked levels
      }
  
      ellipse(x, y, 50, 50); // Draw level icon
      fill(0);
      textAlign(CENTER, CENTER);
      text(i + 1, x, y); // Display level number
  
      // Interaction: click to start level
      if (dist(mouseX, mouseY, x, y) < 25 && mouseIsPressed) {
        if (i < lastUnlockedLevel) { // Only allow clicks on unlocked levels
          currentLevel = i + 1; // Set the current level based on mouse click
          startBattle(currentLevel); // Start the selected level
        }
      }
    }
  }

function startBattle(level) {
    level = constrain(level, 1, totalLevels); // Ensure level is within bounds
    setupBattle(level); // Initialize the battle with the given level
    screen = "battle"; // Switch to the battle screen
}