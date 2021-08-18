const ENEMY_TYPE = {
    SPIDER: "SPIDER",
    CAT: "CAT"
}

function Enemy(config) {
    this.config = config;
    this.x_pos = config.x_pos;
    this.y_pos = config.y_pos;
    this.type = config.type;
    this.direction = config.direction;
    this.isFound = false;

    this.draw = function() {
        if (this.isFound) return;

        if (this.type == ENEMY_TYPE.SPIDER) {

            var topY = config.y_pos - this.config.range;

            if (this.y_pos == topY) {
                this.direction = DIRECTION.DOWN;
            }
            else if (this.y_pos == this.config.y_pos) {
                this.direction = DIRECTION.UP;
            }

            this.y_pos = this.direction == DIRECTION.UP ? this.y_pos -= 1 : this.y_pos += 1;

            fill(255, 0, 0);
            ellipse(this.x_pos, this.y_pos, 50, 50);
        }

        else if (this.type == ENEMY_TYPE.CAT) {

            var destinationY = this.config.direction == DIRECTION.RIGHT ? this.config.x_pos + this.config.range :  config.x_pos - this.config.range;

            if (this.x_pos == destinationY) {
                this.direction = this.config.direction == DIRECTION.RIGHT ? DIRECTION.LEFT : DIRECTION.RIGHT;
            }
            else if (this.x_pos == this.config.x_pos) {
                this.direction = this.config.direction;
            }

            this.x_pos = this.direction == DIRECTION.LEFT ? this.x_pos -= 1 : this.x_pos += 1;

            fill(255, 0, 0);
            ellipse(this.x_pos, this.y_pos, 20, 20);
        }
    }

    this.check = function(gc_x, gc_y, killPlayer) {
        if (!this.isFound && dist(gameChar_world_x, gameChar_y, this.x_pos, this.y_pos) < 50) {
            this.isFound = true;
            killPlayer(this.type);
        }
    }
}