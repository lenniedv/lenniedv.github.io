function CookieCollectable(collect) {
    this.collect = collect;
    this.isFound = false;

    this.draw = function () {
        if (this.isFound) return;

        fill(rgba(205, 145, 64, 1), rgba(205, 145, 64, 1), rgba(205, 145, 64, 1));
        rect(collect.x_pos, collect.y_pos, collect.size, 8);

        ellipse(collect.x_pos - 5, collect.y_pos - 1, 15, 15); // left top
        ellipse(collect.x_pos + collect.size, collect.y_pos - 1, 15, 15); // right top

        ellipse(collect.x_pos - 5, collect.y_pos + 10, 15, 15); // left bottom
        ellipse(collect.x_pos + collect.size, collect.y_pos + 10, 15, 15); // right bottom	
    }

    this.check = function (gameChar_world_x, gameChar_y, state) {
        if (!this.isFound && dist(gameChar_world_x, gameChar_y, this.collect.x_pos, this.collect.y_pos) < 50) {
            this.isFound = true;
            state.sounds.cookie.play();
            state.updateScore();
        }
    }

}
