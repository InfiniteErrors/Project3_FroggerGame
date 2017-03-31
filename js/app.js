Object.prototype.reset = function() {
    this.x = 200;
    this.y = 375;
}

Object.prototype.collection = function() {
    this.x = -100;
}

//Function to produce random speeds for the enemies.
function speedGen() {
    return Math.floor(Math.random() * 550) + 150;
};

//Creating an Enemy class and all of its movements, hot detection, speeds.
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speedGen();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 500) {
        this.x += this.speed * dt;
    } else {
        this.x = -50;
        this.speed = speedGen();
    }
    if (player.x <= this.x + 25 && player.x >= this.x - 25) {
        if (player.y <= this.y + 25 && player.y >= this.y - 25) {
            player.reset();
            if (playerScore > 0) {
                playerScore--;
                $(".num").text('Score: ' + playerScore);
            }
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Below is the player class, it handles the location, movement and of course rendering of the player.

// Player's overall score.
var playerScore = 0;

var Player = function(x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
};
//This update function chnages the players location based on which keys were pressed.
Player.prototype.update = function() {
    if (this.movement === 'up' && this.y >= 20) {
        this.y = this.y - 80;
    } else if (this.movement === 'down' && this.y < 375) {
        this.y = this.y + 80;
    } else if (this.movement === 'right' && this.x < 400) {
        this.x = this.x + 100;
    } else if (this.movement === 'left' && this.x > 10) {
        this.x = this.x - 100;
    } else if (this.y <= 20) {
        playerScore++
        $(".num").text('Score: ' + playerScore);
        this.reset();
    }
    this.movement = null;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// a handleInput() method.
Player.prototype.handleInput = function(e) {
    var movement = null;
    this.movement = e;
}

// Gem Class below, just a simple Class that moves off the screen and confirms that it was gotten by the player.

var gotGem = false;
var Gem = function(x, y) {
    this.sprite = 'images/Gem_Orange.png';
    this.x = x;
    this.y = y;
};

Gem.prototype.update = function() {
    if (player.x <= this.x + 25 && player.x >= this.x - 25) {
        if (player.y <= this.y + 25 && player.y >= this.y - 25) {
            this.collection();
            gotGem = true;
            $('.gem').append('You got the Gem! Nice work.');
        }
    }
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Instantiate my objects.
var enemy1 = new Enemy(-90, 60);
var enemy2 = new Enemy(-90, 140);
var enemy3 = new Enemy(-90, 220);
// Enemies are being placed on the canvas here.
var allEnemies = [enemy1, enemy2, enemy3];
// One new player is created.
var player = new Player(200, 375);

//Add an orange gem to the board.
var orangeGem = new Gem(302, 140);

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
