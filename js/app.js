// Enemies our player must avoid
var Enemy = function(x,y,vel) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=x;
    this.y=y;
    this.vel=vel;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.vel * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 500) {
        this.x = -90;
        this.vel = 200 + (Math.random() * 100);
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
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
var Player=function(x,y,vel)
{
  this.x=x;
  this.y=y;
  this.vel=vel;
  this.sprite='images/char-boy.png'
}
Player.prototype.render=function()
{
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update=function()
{
  if (this.y > 380) {
      this.y = 380;
  }

  if (this.x > 400) {
      this.x = 400;
  }

  if (this.x < 0) {
      this.x = 0;
  }

  // Check for player reaching top of canvas and winning the game
  if (this.y < 0) {
      this.x = 200;
      this.y = 380;
  }
};

Player.prototype.handleInput=function(keyPress)
{
  switch (keyPress) {
      case 'left':
          this.x -= this.vel + 50;
          break;
      case 'up':
          this.y -= this.vel + 30;
          break;
      case 'right':
          this.x += this.vel + 50;
          break;
      case 'down':
          this.y += this.vel + 30;
          break;
  }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies=[];
var player=new Player(200, 380, 50);
var enemy;
var enemyPosition=[60,140,220];
enemyPosition.forEach(function(Y) {
    enemy = new Enemy(0, Y, 100 + Math.floor(Math.random() * 150));
    allEnemies.push(enemy);
});


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
