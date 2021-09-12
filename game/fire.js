function Fire(startX, startY, range) {
  this.isFound = false
  this.startX = startX
  this.startY = startY
  this.x_pos = startX
  this.y_pos = startY
  this.range = range

  this.draw = function (player) {
    if (this.isFound) return

    var direction = player.isLeft ? DIRECTION.LEFT : DIRECTION.RIGHT

    var destinationY =
      direction == DIRECTION.RIGHT ? this.startX + this.range : this.startX - this.range

    if (this.x_pos == destinationY) {
      this.isFound = true
      return
    }

    this.x_pos = this.direction == DIRECTION.LEFT ? (this.x_pos -= 5) : (this.x_pos += 5)

    stroke(0, 0, 128)
    fill(238, 232, 170)
    ellipse(this.x_pos, this.y_pos, 40, 40)
    noStroke()
  }

  this.check = function (enemy, killEnemy) {
    if (
      !this.isFound &&
      enemy.type == ENEMY_TYPE.CAT &&
      dist(enemy.x_pos, enemy.y_pos, this.x_pos, this.y_pos) < 50
    ) {
      this.isFound = true
      killEnemy(enemy)
    }
  }
}
