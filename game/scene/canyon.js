function Canyon(config) {
  this.config = config

  this.draw = function (floorPos_y, height) {
    fill(rgba(100, 155, 255, 1), rgba(100, 155, 255, 1), rgba(100, 155, 255, 1))
    rect(this.config.x_pos, floorPos_y, this.config.width, height)
    fill(rgba(77, 80, 86, 1), rgba(77, 80, 86, 1), rgba(77, 80, 86, 1))
    rect(this.config.x_pos, height - 30, this.config.width, 30)
  }

  this.check = function (gameChar_world_x, gameChar_y, floorPos_y, killPlayer) {
    if (
      gameChar_y == floorPos_y &&
      gameChar_world_x > this.config.x_pos &&
      gameChar_world_x < this.config.x_pos + this.config.width
    ) {
      killPlayer()
    }
  }
}
