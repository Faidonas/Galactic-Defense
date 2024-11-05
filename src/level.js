function spawnEnemies() {
    let rows = level;
    let cols = 10;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        enemies.push(new Enemy(j * 60 + 20, i * 60 + 20));
      }
    }
  }
  