function drawMapScreen() {
  // Display the background
  image(mapImage, 0, 0, width, height);

  // Load and apply the Orbitron font (you must preload it in your sketch)
  textFont('Orbitron');

  // Add header text
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Select Your Level", width / 2, height / 4);

  // Add instructions below the levels
  textSize(18);
  fill(200);
  text(
    "Click on an unlocked level to start your mission",
    width / 2,
    height / 4 + 40
  );

  for (let i = 0; i < totalLevels; i++) {
    let x = width / 2 - totalLevels * 50 + i * 100; // Spread levels horizontally
    let y = height / 2;

    // Default color for locked or unlocked levels
    if (i < lastUnlockedLevel) {
      fill(129, 117, 0); // Darker blue for unlocked levels
    } else {
      fill(100, 100, 100, 150); // Semi-transparent gray for locked levels
    }

    // Draw level circle
    ellipse(x, y, 50, 50);

    // Level text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text(i + 1, x, y);

    // Hover effect: apply reddish-orange only when the mouse is over a level
    if (dist(mouseX, mouseY, x, y) < 25) {
      push();
      noFill();
      stroke(255, 80, 40); // Reddish-orange hover outline
      strokeWeight(3);
      ellipse(x, y, 55, 55); // Slightly larger circle
      pop();

      // Handle click to start level
      if (mouseIsPressed && i < lastUnlockedLevel) {
        currentLevel = i + 1; // Set the current level based on mouse click
        startBattle(currentLevel); // Start the selected level
      }
    }
  }

  // Footer text
  textSize(14);
  fill(180);
  text(
    `Last unlocked level: ${lastUnlockedLevel}`,
    width / 2,
    height - 50
  );
}

function startBattle(level) {
  level = constrain(level, 1, totalLevels); // Ensure level is within bounds
  setupBattle(level); // Initialize the battle with the given level
  screen = "battle"; // Switch to the battle screen
}
