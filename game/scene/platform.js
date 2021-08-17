function Platform(config) {
    this.config = config;
    this.x_pos = config.x_pos;
    this.y_pos = config.y_pos;
    this.width = config.width;
    this.height = config.height;
    this.top_pos_x = config.moving == MOVING.LEFT_RIGHT ? config.x_pos - 100 : 0; 
    this.direction = config.moving == MOVING.UP_DOWN ? DIRECTION.UP : DIRECTION.LEFT;

    this.draw = function() {
        fill(255, 255, 255);
        if (this.config.moving == MOVING.LEFT_RIGHT) {
            if (this.x_pos == this.top_pos_x) {
                this.direction = DIRECTION.RIGHT;
            }
            else if (this.x_pos == this.config.x_pos) {
                this.direction = DIRECTION.LEFT;
            }
            this.x_pos = this.direction == DIRECTION.LEFT ? this.x_pos -= 1 : this.x_pos += 1;
        }

        
        fill(rgba(168,94,27,1),rgba(168,94,27,1),rgba(168,94,27,1));
        rect(this.x_pos, this.y_pos , this.width, this.height);
        fill(rgba(57,213,125,1),rgba(57,213,125,1),rgba(57,213,125,1));
        rect(this.x_pos, this.y_pos , this.width, this.height / 2);   
        
        fill(rgba(57,213,125,1),rgba(57,213,125,1),rgba(57,213,125,1));
        ellipse(this.x_pos + 20, this.y_pos + 10, 20, 20);
        
        fill(rgba(57,213,125,1),rgba(57,213,125,1),rgba(57,213,125,1));
        ellipse(this.x_pos + 40, this.y_pos + 10, 20, 20);
        
        fill(rgba(57,213,125,1),rgba(57,213,125,1),rgba(57,213,125,1));
        ellipse(this.x_pos + 60, this.y_pos + 10, 20, 20);
        
        fill(rgba(57,213,125,1),rgba(57,213,125,1),rgba(57,213,125,1));
        ellipse(this.x_pos + 100, this.y_pos + 10, 20, 20);
        
        fill(rgba(57,213,125,1),rgba(57,213,125,1),rgba(57,213,125,1));
        ellipse(this.x_pos + 120, this.y_pos + 10 , 20, 20);
    }

    this.check = function(gc_x, gc_y) {

        if (gc_x > this.x_pos &&
            gc_x < this.x_pos + this.width)
        {
            var topDistance = this.y_pos - gc_y;
            var distanceCheck = topDistance >= 0 && topDistance < 5;
            if (distanceCheck) return true;
        }

        return false;
    }
}