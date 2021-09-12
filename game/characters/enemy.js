const ENEMY_TYPE = {
  SPIDER: 'SPIDER',
  CAT: 'CAT'
}

function Enemy(config) {
  this.config = config
  this.config.y_pos = getPos(config.y_pos, gameChar_y)
  this.x_pos = config.x_pos
  this.y_pos = this.config.y_pos
  this.type = config.type
  this.direction = config.direction
  this.isFound = false
  this.score = config.score

  this.kill = function () {
    this.isFound = true
  }

  this.draw = function () {
    if (this.isFound) return

    if (this.type == ENEMY_TYPE.SPIDER) {
      var topY = this.config.y_pos - this.config.range

      if (this.y_pos == topY) {
        this.direction = DIRECTION.DOWN
      } else if (this.y_pos == this.config.y_pos) {
        this.direction = DIRECTION.UP
      }

      this.y_pos = this.direction == DIRECTION.UP ? (this.y_pos -= 1) : (this.y_pos += 1)

      fill(255, 0, 0)
      this.drawSpider()
    } else if (this.type == ENEMY_TYPE.CAT) {
      var destinationY =
        this.config.direction == DIRECTION.RIGHT
          ? this.config.x_pos + this.config.range
          : config.x_pos - this.config.range

      if (this.x_pos == destinationY) {
        this.direction = this.config.direction == DIRECTION.RIGHT ? DIRECTION.LEFT : DIRECTION.RIGHT
      } else if (this.x_pos == this.config.x_pos) {
        this.direction = this.config.direction
      }

      this.x_pos = this.direction == DIRECTION.LEFT ? (this.x_pos -= 1) : (this.x_pos += 1)

      fill(255, 0, 0)
      noStroke()
      ellipse(this.x_pos, this.y_pos, 50, 50)
    }
  }

  this.check = function (gc_x, gc_y, killPlayer) {
    if (!this.isFound && dist(gc_x, gc_y, this.x_pos, this.y_pos) < 50) {
      this.isFound = true
      killPlayer(this.type)
    }
  }

  this.drawSpider = function () {
    fill(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))
    ellipse(this.x_pos, this.y_pos + 10, 20, 20)

    fill(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))
    ellipse(this.x_pos, this.y_pos, 30, 30)

    fill(rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))
    ellipse(this.x_pos - 10, this.y_pos + 10, 5, 5)
    fill(rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))
    ellipse(this.x_pos + 2, this.y_pos + 10, 5, 5)

    fill(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))

    ellipse(this.x_pos - 8, this.y_pos - 20, 8)
    ellipse(this.x_pos + 8, this.y_pos - 20, 8)

    ellipse(this.x_pos - 20, this.y_pos - 10, 8)
    ellipse(this.x_pos + 20, this.y_pos - 10, 8)

    ellipse(this.x_pos - 20, this.y_pos + 8, 8)
    ellipse(this.x_pos + 20, this.y_pos + 8, 8)

    ellipse(this.x_pos - 18, this.y_pos + 20, 8)
    ellipse(this.x_pos + 18, this.y_pos + 20, 8)
  }
}
