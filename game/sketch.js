const MOVING = {
  STATIC: 'STATIC',
  LEFT_RIGHT: 'LEFT_RIGHT'
}

const DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
}

var gameChar_x
var gameChar_y
var floorPos_y
var scrollPos
var gameChar_world_x

var trees_x
var clouds
var mountains
var canyons
var collectables
var health
var kennel
var enemies

var state
var player
var platforms

var moon
var fire

function setup() {
  createCanvas(1024, 576)
  initNewGame()
}

function preload() {
  state = new GameState()
  state.init()
}

function initNewGame() {
  floorPos_y = (height * 3) / 4
  startGame()
}

function restartGame() {
  state.restart()
  startGame()
}

function startGame() {
  state.music.bush.play()

  gameChar_x = width / 2
  gameChar_y = floorPos_y

  scrollPos = 0
  gameChar_world_x = gameChar_x - scrollPos

  player = new Player(gameChar_world_x, gameChar_y)

  trees_x = [50, 300, 900]

  clouds = [
    {
      x_pos: 299,
      y_pos: 105,
      move: true,
      speed: 0.2,
      direction: DIRECTION.LEFT
    },
    {
      x_pos: 500,
      y_pos: 95
    },
    {
      x_pos: 800,
      y_pos: 50,
      move: true,
      speed: 0.2,
      direction: DIRECTION.RIGHT
    }
  ]

  mountains = [
    {
      x_pos: 0,
      y_pos: 434,
      width: 200,
      top_y_pos: 134
    },
    {
      x_pos: 500,
      y_pos: 434,
      width: 200,
      top_y_pos: 134
    },
    {
      x_pos: 800,
      y_pos: 434,
      width: 200,
      top_y_pos: 134
    }
  ]

  canyons = [
    {
      x_pos: 200,
      width: 50
    },
    {
      x_pos: 400,
      width: 50
    },
    {
      x_pos: 700,
      width: 80
    }
  ]

  healths = [
    {
      x_pos: 300,
      y_pos: gameChar_y - 10,
      size: 20
    }
  ]

  platforms = [
    {
      x_pos: 1,
      y_pos: floorPos_y - 60,
      width: 130,
      height: 20,
      moving: MOVING.STATIC
    },
    {
      x_pos: 120,
      y_pos: floorPos_y - 100,
      width: 200,
      height: 20,
      moving: MOVING.LEFT_RIGHT
    }
  ]

  collectables = [
    {
      x_pos: 100,
      y_pos: gameChar_y - 10,
      size: 30
    },

    {
      x_pos: 600,
      y_pos: gameChar_y - 10,
      size: 30
    },

    {
      x_pos: 800,
      y_pos: gameChar_y - 10,
      size: 30
    }
  ]

  moon = {
    x: 625,
    y: 104
  }

  enemies = [
    {
      x_pos: 300,
      y_pos: gameChar_y - 50,
      type: ENEMY_TYPE.SPIDER,
      score: 0,
      direction: DIRECTION.DOWN,
      range: 200
    },
    {
      x_pos: 800,
      y_pos: gameChar_y,
      type: ENEMY_TYPE.CAT,
      score: 20,
      direction: DIRECTION.RIGHT,
      range: 200
    }
  ]

  for (var i = 0; i < clouds.length; i++) {
    clouds[i].object = new Cloud(clouds[i])
  }

  for (var i = 0; i < platforms.length; i++) {
    var p = new Platform(platforms[i])
    platforms[i].object = p
  }

  for (var i = 0; i < collectables.length; i++) {
    var collect = new CookieCollectable(collectables[i])
    collectables[i].object = collect
  }

  for (var i = 0; i < healths.length; i++) {
    var collect = new HealthCollectable(healths[i])
    healths[i].object = collect
  }

  for (var i = 0; i < enemies.length; i++) {
    var enemy = new Enemy(enemies[i])
    enemies[i].object = enemy
  }

  for (var i = 0; i < canyons.length; i++) {
    var c = new Canyon(canyons[i])
    canyons[i].object = c
  }

  kennel = new Kennel(1200, gameChar_y - 10)
}

function drawWelcome() {
  image(state.entryScreen, 0, 0, width, height)
}

function killPlayer(type) {
  player.kill(type, frameCount)
}

function killEnemy(enemy) {
  enemy.kill()
  state.updateScoreBy(enemy.score)
}

function draw() {
  background(135, 211, 248) // fill the sky blue

  if (!state.isPlaying) {
    drawWelcome()
    noLoop()
    return
  }

  noStroke()
  fill(0, 154, 23)
  rect(0, floorPos_y, width, height / 4) // draw some green ground

  player.check(state, gameChar_y, height, frameCount, startGame)

  push()
  translate(scrollPos, 0)

  // Draw clouds.
  if (!state.checkDarkness()) {
    for (var i = 0; i < clouds.length; i++) {
      clouds[i].object.draw(width)
    }
  }

  // Draw mountains.
  for (var i = 0; i < mountains.length; i++) {
    new Mountain(mountains[i], i % 2 > 0).draw()
  }

  // Draw trees.

  for (var i = 0; i < trees_x.length; i++) {
    new Tree(trees_x[i], floorPos_y - 40).draw()
  }

  // Draw canyons.

  for (var i = 0; i < canyons.length; i++) {
    canyons[i].object.draw(floorPos_y, height)
    canyons[i].object.check(gameChar_world_x, gameChar_y, floorPos_y, killPlayer)
  }

  // Draw collectable items

  // Draw platforms
  for (var i = 0; i < platforms.length; i++) {
    platforms[i].object.draw()
  }

  for (var i = 0; i < collectables.length; i++) {
    collectables[i].object.draw()
    collectables[i].object.check(gameChar_world_x, gameChar_y, state)
  }

  for (var i = 0; i < healths.length; i++) {
    healths[i].object.draw()
    healths[i].object.check(gameChar_world_x, gameChar_y, state)
  }

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].object.draw()
    enemies[i].object.check(gameChar_world_x, gameChar_y, killPlayer)
    if (fire) {
      fire.check(enemies[i].object, killEnemy)
    }
  }

  if (fire) {
    fire.draw(player)
  }

  this.kennel.draw()
  this.kennel.check(gameChar_world_x, gameChar_y, frameCount, state)

  pop()

  if (state.nightMode) {
    state.darkness = frameCount / 2
    if (state.checkDarkness()) {
      drawDarkness()
    }
  }

  drawScore()
  drawControls()
  drawHealth()

  if (!state.gameOver && state.lives == 0) {
    state.music.bush.stop()
    drawCenterText('Game over.\nPress space to continue.')
    state.GameOver()
  }

  // Draw game character.
  if (!kennel.isReached) {
    player.draw(gameChar_x, gameChar_y)
  } else if (frameCount > kennel.frameCount) {
    state.music.bush.stop()
    drawCenterText('Level complete.\nPress space to continue.')
    state.sounds.levelup.play()
    noLoop()
    player.stopCharacter()
  }

  // Logic to make the game character move or the background scroll.
  if (player.isLeft) {
    if (gameChar_x > width * 0.2) {
      gameChar_x -= 5
    } else {
      scrollPos += 5
    }
  }

  if (player.isRight) {
    if (gameChar_x < width * 0.8) {
      gameChar_x += 5
    } else {
      scrollPos -= 5 // negative for moving against the background
    }
  }

  gameChar_world_x = gameChar_x - scrollPos

  // Logic to make the game character rise and fall.
  if (gameChar_y < floorPos_y) {
    if (!IsOnPlatform()) {
      gameChar_y += 2
      player.isFalling = true
    } else {
      player.isFalling = false
    }
  } else {
    player.isFalling = false
  }

  if (player.isPlummeting == true) {
    gameChar_y += 5
  }
}

function drawStars() {
  fill(255, 255, 255)

  ellipse(394, 109, 8, 8)
  ellipse(300, 173, 8, 8)
  ellipse(654, 56, 5, 5)
  ellipse(73, 100, 5, 5)
  ellipse(155, 237, 5, 5)
  ellipse(725, 198, 5, 5)
  ellipse(616, 50, 5, 5)
  ellipse(336, 264, 4, 4)
  ellipse(257, 66, 4, 4)
}

function drawMoon() {
  fill(254, 252, 215)
  ellipse(moon.x, moon.y, 80, 80)
}

function drawDarkness() {
  drawMoon()
  drawStars()

  var darknessApha = 0
  if (state.darkness > 600) {
    darknessApha = 150
  } else if (state.darkness > 500) {
    darknessApha = 100
  }

  fill(0, 0, 0, darknessApha)
  rect(0, 0, 1024, 576)
}

function IsOnPlatform() {
  var result = false
  for (var i = 0; i < platforms.length; i++) {
    result = platforms[i].object.check(gameChar_world_x, gameChar_y)
    if (result) {
      break
    }
  }

  return result
}

function drawScore() {
  drawText('Score: ' + state.game_score, 10, 32)
}

function drawHealth() {
  drawText('Health: ' + state.lives, 10, 60)
  for (var i = 0; i < state.lives; i++) {
    drawHeart(110 + i * 20, 45, 15)
  }
}

function drawControls() {
  drawText('CONTROLS', width - 100, 30, 12, 2)
  drawText('Left: <-', width - 100, 60, 12, 2)
  drawText('Right: ->', width - 100, 80, 12, 2)
  drawText('Jump: SPACE', width - 100, 100, 12, 2)
  drawText('Fire: ENTER', width - 100, 120, 12, 2)
}

function drawHeart(x, y, size) {
  fill(255, 0, 0)
  beginShape()
  vertex(x, y)
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size)
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y)
  endShape(CLOSE)
}

function drawCenterText(myText) {
  fill(128, 0, 0)
  stroke(255)
  strokeWeight(5)
  textSize(55)
  textAlign(CENTER)
  text(myText, width / 2, height / 2)
  textAlign(LEFT)
  noStroke()
  noFill()
}

function drawText(myText, x, y, size = 20, weight = 6) {
  fill(255)
  stroke(0)
  strokeWeight(weight)
  textSize(size)
  text(myText, x, y)
  noStroke()
  noFill()
}

function keyPressed() {
  if (player.freezeFlag == true) return

  if (keyCode == 37) {
    player.isLeft = true
  }

  if (keyCode == 39) {
    player.isRight = true
  }

  if (keyCode == 13) {
    fire = new Fire(gameChar_world_x, gameChar_y, state.fire_range)
    state.sounds.fire.play()
  }

  if (keyCode == 32) {
    if (!state.isPlaying) {
      state.isPlaying = true
      loop()
    } else if (state.game_over || state.lives == 0 || kennel.isReached) {
      kennel.isReached = false
      restartGame()
    } else if (gameChar_y == floorPos_y || IsOnPlatform()) {
      gameChar_y -= 100
    }
    state.sounds.jump.play()
  }
}

function keyReleased() {
  if (keyCode == 37) {
    player.isLeft = false
  }
  if (keyCode == 39) {
    player.isRight = false
  }
}

function rgba(val1, val2, val3) {
  var result = color(val1, val2, val3)
  return result
}
