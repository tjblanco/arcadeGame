// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x;
    this.y;
    this.speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    // Bugs cross the screen
    if (this.x >= 500) {
        this.y = yPos[[Math.floor(Math.random() * yPos.length)]];
        this.x = -100;
        this.speed = speeds[[Math.floor(Math.random() * speeds.length)]];
    }
    // Reset the game if the player and the bug meet
    if(this.y === player.y && (this.x >= player.x - 60 && this.x <= player.x + 60) ) {
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Enemies our player must avoid
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for the player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-pink-girl.png';
    // Define the player initial positions
    this.x = 200;
    this.y = 380;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle the key input
Player.prototype.handleInput = function(key) {
    // Set max and min values for xy coordinates as well as the increment
    const increment = {
            x: 100,
            y: -80
          },
          min = {
              x: 0,
              y: 380
          },
          max = {
              x: 400,
              y: -20
          };
    // Handle player movement
    switch (key) {
        case 'left':
            if (this.x !== min.x) {
                this.x = this.x - increment.x;
            }
            break;
        case 'right':
            if (this.x !== max.x) {
                this.x = this.x + increment.x;
            }
            break;
        case 'up':
            if (this.y !== max.y) {
                this.y = this.y + increment.y;
            }
            break;
        case 'down':
            if (this.y !== min.y) {
                this.y = this.y - increment.y;
            }
            break;
    }
    if(this.y === max.y) {
        // You won!! Resert the game
        score += 1;
        this.x = 200;
        this.y = 380;

        // Update score
        score === 1 ? document.querySelector('#score').innerHTML = (`You have won ${score} game!`) : document.querySelector('#score').innerHTML = (`You have won ${score} games!`);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let score = 0;
let player = new Player();
let allEnemies = [];

// Define allowed y positions for the enemy
const yPos = [220, 140, 60],
      minX = 0,
      maxX = 500;

// Define enemies possible speeds
const speeds = [120, 180, 200, 220, 250, 300];

// Initialize enemies
for(let i = 0 ; i < 5; i++) {
    allEnemies.push(new Enemy());
    // Setting y position
    allEnemies[i].y = yPos[[Math.floor(Math.random() * yPos.length)]];
    allEnemies[i].x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    allEnemies[i].speed = speeds[[Math.floor(Math.random() * speeds.length)]];
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
