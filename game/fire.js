function Fire(startX, startY, range) {
  this.startX = startX
  this.startY = startY
  this.x_pos = startX
  this.y_pos = startY
  this.range = range

  this.draw = function (playerDirection) {
    var destinationY =
      playerDirection == DIRECTION.LEFT ? this.startX - this.range : this.startX + this.range

    if (this.x_pos == destinationY) {
      return
    }

    this.x_pos = playerDirection == DIRECTION.RIGHT ? (this.x_pos += 5) : (this.x_pos -= 5)

    stroke(0, 0, 128)
    fill(238, 232, 170)
    ellipse(this.x_pos, this.y_pos, 40, 40)
  }

  this.check = function (enemy, killEnemy) {
    if (
      enemy.type != ENEMY_TYPE.SPIDER &&
      dist(enemy.x_pos, enemy.y_pos, this.x_pos, this.y_pos) < 50
    ) {
      killEnemy(enemy)
    }
  }
}
