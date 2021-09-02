function Cloud(config) {
    this.config = config;
    this.moving = config.move == true;
    this.x_pos = config.x_pos;
    this.speed = config.speed;
    this.direction = config.direction;

    this.draw = function (game_width) {

        if (this.moving) {
            if (this.direction == DIRECTION.LEFT) {
                this.x_pos = this.x_pos < 0 ? this.config.x_pos : this.x_pos -= this.speed;
            }
            else {
                this.x_pos = this.x_pos > game_width ? this.config.x_pos : this.x_pos += this.speed;
            }
        }

        fill(rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1));
        ellipse(this.x_pos, config.y_pos + 10, 60, 60);
        ellipse(this.x_pos + 70, config.y_pos + 10, 50, 50);
        ellipse(this.x_pos + 30, config.y_pos + 16, 50, 50);
        ellipse(this.x_pos + 12, config.y_pos - 15, 40, 40);
        ellipse(this.x_pos + 50, config.y_pos - 15, 40, 40);
    }
}