// Enemies our player must avoid.
var Enemy = function(row) {
	this.x = this.getStartPoint();
	this.y = (row * 85) + 60;
	this.speed = this.getNewSpeed();
    this.sprite = 'images/enemy-bug.png';
};
//Begin movement at random point outside canvas. 
Enemy.prototype.getStartPoint = function() {
    return Math.floor((Math.random() * -505) + -101);
    } 
//Gets random speed
Enemy.prototype.getNewSpeed = function() {
    return Math.floor((Math.random() * 5) + 3);
    }

// Updates the enemy's position.
Enemy.prototype.update = function(dt) {
	//Restart movement from a new starting position 
	//each time the enemy gets out of canvas.
	if (this.x >= 505) {
		this.reset();
	} else {
		this.x = this.x + this.speed;
	}
    // TODO: You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
//Restarts movement from a new starting position with a new speed.
Enemy.prototype.reset = function() {
	this.x = this.getStartPoint();
	this.speed = this.getNewSpeed();
};

// Draws the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//The player
var Player = function() {
	this.getStartPoint();
	this.sprite = 'images/char-boy.png';
};

//Sets starting position for the player
Player.prototype.getStartPoint = function() {
    this.x = 2 * 101;
	this.y = (4 * 85) + 60;
	return this.x, this.y;
    } 

Player.prototype.update = function() {
	this.x = this.x;
	this.y = this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Allows player to move inside the canvas.
Player.prototype.handleInput = function(allowedKeys){
	switch (allowedKeys) {
		case 'left': 
			if (this.x >= 101)
				this.x = this.x - 101;
			break;
		case 'right':
			if (this.x < 404)
				this.x = this.x + 101;
			break;
		case 'up':
			if (this.y > 0)
				this.y = this.y - 85;
			break;
		case 'down':
			if (this.y <= 340)
				this.y = this.y + 85;
			break;
	}
}

//Moves the player back to the starting position.
Player.prototype.reset = function() {
	this.getStartPoint();
};

var player = new Player();

var allEnemies = [];

//Instantiate enemies (on apropriate rows of the canvas).
for (var row = 0; row < 3; row++) {
	allEnemies.push(new Enemy(row));
}

// This listens for key presses and sends the keys to your.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});