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

    fill(00, 0, 255)
    noStroke()
    ellipse(this.x_pos, this.y_pos, 20, 20)
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
