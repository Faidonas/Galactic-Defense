function spawnEnemies(level, wave) {
  // Spawn enemies based on the current level and wave
  let numEnemies = level * wave * 2; // Increase the number of enemies with each wave
  let numStrongEnemies = Math.floor(numEnemies * 0.2); // 20% of enemies are strong
  let numMediumEnemies = Math.floor(numEnemies * 0.3); // 30% of enemies are medium

  let spacingX = width / (numEnemies + 1); // Horizontal spacing between enemies
  let spacingY = 60; // Vertical spacing between rows of enemies

  for (let i = 0; i < numEnemies; i++) {
    let x = random(50, width - 50); // Randomize x position for more challenge
    let y = -spacingY * (Math.floor(i / 10) + 1); // Arrange enemies in rows

    if (i < numStrongEnemies) {
      enemies.push(new StrongEnemy(x, y));
    } else if (i < numStrongEnemies + numMediumEnemies) {
      enemies.push(new MediumEnemy(x, y));
    } else {
      enemies.push(new Enemy(x, y));
    }
  }
}