let player;
let enemies = [];
let bullets = [];
let level = 1;
let score = 0;

// Assets
let playerImage, enemyImage, explosionImage;
let laserSound, explosionSound, bgMusic;

function preload() {
  playerImage = loadImage('assets/images/player_ship.png');
  enemyImage = loadImage('assets/images/enemy_ship.png');
  explosionImage = loadImage('assets/images/explosions.png');
  
  laserSound = loadSound('assets/sounds/laser_shot.wav');
  explosionSound = loadSound('assets/sounds/explosion_sound.wav');
  bgMusic = loadSound('assets/sounds/background_music.wav');
}

function setup() {
  createCanvas(800, 600);
  player = new Player();
  spawnEnemies();

  bgMusic.loop();  // Start the background music in a loop
}

function draw() {
  background(0);

  player.update();
  player.display();

  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].display();
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update();
    enemies[i].display();

    for (let j = bullets.length - 1; j >= 0; j--) {
      if (enemies[i].collides(bullets[j])) {
        enemies.splice(i, 1);
        bullets.splice(j, 1);
        explosionSound.play();  // Play explosion sound
        score += 10;
        break;
      }
    }
  }

  displayScore();
  displayLevel();

  if (enemies.length === 0) {
    level++;
    spawnEnemies();
  }
}

function keyPressed() {
  if (key === ' ') {
    bullets.push(player.shoot());
    laserSound.play();  // Play laser sound
  }
}
