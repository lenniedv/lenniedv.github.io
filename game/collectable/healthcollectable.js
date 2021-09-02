function HealthCollectable(collect) {
    this.collect = collect;
    this.isFound = false;

    this.draw = function () {
        if (this.isFound) return;

        fill(255, 0, 0);
        beginShape();
        vertex(this.collect.x_pos, this.collect.y_pos);
        bezierVertex(this.collect.x_pos - this.collect.size / 2, this.collect.y_pos - this.collect.size / 2, this.collect.x_pos - this.collect.size, this.collect.y_pos + this.collect.size / 3, this.collect.x_pos, this.collect.y_pos + this.collect.size);
        bezierVertex(this.collect.x_pos + this.collect.size, this.collect.y_pos + this.collect.size / 3, this.collect.x_pos + this.collect.size / 2, this.collect.y_pos - this.collect.size / 2, this.collect.x_pos, this.collect.y_pos);
        endShape(CLOSE);
        stroke(color("black"));
        strokeWeight(3);
        point(this.collect.x_pos - this.collect.size / 2 + 3, this.collect.y_pos - this.collect.size / 2 + 15);
        point(this.collect.x_pos - this.collect.size / 2 + 10, this.collect.y_pos - this.collect.size / 2 + 15);
        strokeWeight(4);
        point(this.collect.x_pos - this.collect.size / 2 + 8, this.collect.y_pos - this.collect.size / 2 + 23);
        noStroke();
    }

    this.check = function (gameChar_world_x, gameChar_y, state) {
        if (!this.isFound && dist(gameChar_world_x, gameChar_y, this.collect.x_pos, this.collect.y_pos) < 50) {
            this.isFound = true;
            state.sounds.life.play();
            state.increaseHealth();
        }
    }

}
