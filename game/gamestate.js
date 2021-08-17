function GameState() {
	this.game_score = 0;
	this.lives = 3;
	this.getScore = function() {
        return this.game_score;
    }
    this.updateScore = function() {
		this.game_score++;
	}
	this.increaseHealth = function() {
		this.lives++;
	}
	this.looseLive = function() {
		this.lives--;
	}
	this.getLives = function() {
		return this.lives;
	}
}
