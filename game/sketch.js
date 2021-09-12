/*
### The Game Project – The Grand Aventures Of Leo
Author: Lennie De Villiers

Broke the different game objects into different JavaScript files to make it modular. 
Would in the future use ES2 or TypeScript.

Levels are cofigured and read from levels.js

The State manage the game status.

Formatting code using Prettier (https://prettier.io) plugin.
Sounds / music from https://freesound.org/
*/

const GAME_CONFIG = {
  current_level: 0,
  lives: 3
}

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

var trees
var clouds
var mountains
var canyons
var collectables
var healths
var kennel
var enemies

var state
var player
var platforms

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
  gameChar_x = width / 2
  gameChar_y = floorPos_y

  scrollPos = 0
  gameChar_world_x = gameChar_x - scrollPos

  var levelDetails = levels[state.current_level]
  for (const [key, value] of Object.entries(levelDetails)) {
    if (key == 'game') {
      state.setup(value)
    } else if (key == 'player') {
      gameChar_x = getPos(value.x_pos)
      player = new Player(getPos(value.x_pos), getPos(value.y_pos))
    } else if (key == 'kennel') {
      kennel = new Kennel(getPos(value.x_pos), getPos(value.y_pos, gameChar_y))
    } else if (key == 'trees') {
      trees = []
      value.forEach(x => trees.push(new Tree(x, floorPos_y - 40)))
    } else if (key == 'clouds') {
      clouds = []
      value.forEach(x => clouds.push(new Cloud(x)))
    } else if (key == 'mountains') {
      mountains = []
      for (var i = 0; i < value.length; i++) {
        mountains.push(new Mountain(value[i], i % 2 > 0))
      }
    } else if (key == 'canyons') {
      canyons = []
      value.forEach(x => canyons.push(new Canyon(x)))
    } else if (key == 'healths') {
      healths = []
      value.forEach(x => healths.push(new HealthCollectable(x)))
    } else if (key == 'platforms') {
      platforms = []
      value.forEach(x => platforms.push(new Platform(x)))
    } else if (key == 'collectables') {
      collectables = []
      value.forEach(x => collectables.push(new CookieCollectable(x)))
    } else if (key == 'enemies') {
      enemies = []
      value.forEach(x => enemies.push(new Enemy(x)))
    }
  }
}

function drawWelcome() {
  image(state.entryScreen, 0, 0, width, height)
}

function drawCompleted() {
  image(state.finalScreen, 0, 0, width, height)
}

function killPlayer(type) {
  player.kill(type, frameCount)
  state.playMusic()
}

function killEnemy(enemy) {
  enemy.kill()
  state.updateScoreBy(enemy.score)
}

function getSkyColor() {
  return state.mode == 'forest' ? color(135, 211, 248) : color(36, 185, 249)
}

function getFloorColor() {
  return state.mode == 'forest' ? color(0, 154, 23) : color(104, 95, 80)
}

function draw() {
  background(getSkyColor())

  if (!state.isGameStarted) {
    drawWelcome()
    noLoop()
    return
  }

  if (state.isCompleted) {
    drawCompleted()
    noLoop()
    return
  }

  noStroke()
  fill(getFloorColor())
  rect(0, floorPos_y, width, height / 4)

  player.check(state, gameChar_y, height, frameCount, startGame)

  push()
  translate(scrollPos, 0)

  // Draw clouds.
  for (var i = 0; i < clouds.length; i++) {
    clouds[i].draw(width)
  }

  // Draw mountains.
  for (var i = 0; i < mountains.length; i++) {
    mountains[i].draw()
  }

  // Draw trees.
  for (var i = 0; i < trees.length; i++) {
    trees[i].draw()
  }

  // Draw canyons.
  for (var i = 0; i < canyons.length; i++) {
    canyons[i].draw(floorPos_y, height)
    canyons[i].check(gameChar_world_x, gameChar_y, floorPos_y, killPlayer)
  }

  // Draw platforms
  for (var i = 0; i < platforms.length; i++) {
    platforms[i].draw(state)
  }

  // Draw collectable items
  for (var i = 0; i < collectables.length; i++) {
    collectables[i].draw()
    collectables[i].check(gameChar_world_x, gameChar_y, state)
  }

  for (var i = 0; i < healths.length; i++) {
    healths[i].draw()
    healths[i].check(gameChar_world_x, gameChar_y, state)
  }

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw()
    enemies[i].check(gameChar_world_x, gameChar_y, killPlayer)
    if (fire) {
      fire.check(enemies[i], killEnemy)
    }
  }

  if (fire) {
    fire.draw(player)
  }

  this.kennel.draw()
  this.kennel.check(gameChar_world_x, gameChar_y, frameCount, state)

  pop()

  drawScore()
  drawControls()
  drawHealth()
  drawWeapons()

  if (!state.gameOver && state.lives == 0) {
    state.stopMusic()
    drawCenterText('Game over.\nPress space to continue.')
    state.GameOver()
  }

  // Draw game character.
  if (!kennel.isReached) {
    player.draw(gameChar_x, gameChar_y)
  } else if (frameCount > kennel.frameCount) {
    state.stopMusic()
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

function IsOnPlatform() {
  var result = false
  for (var i = 0; i < platforms.length; i++) {
    result = platforms[i].check(gameChar_world_x, gameChar_y)
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

function drawWeapons() {
  drawText('Weapons: ', 10, 100)
  stroke(0, 0, 128)
  fill(238, 232, 170)
  ellipse(125, 95, 20, 20)
  drawText(state.weapon_count, 145, 105)
  noStroke()
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
    if (state.weapon_count > 0) {
      fire = new Fire(gameChar_world_x, gameChar_y - 10, state.fire_range)
      state.fireWeapon()
    }
  }

  if (keyCode == 32) {
    if (!state.isGameStarted) {
      state.isGameStarted = true
      state.playMusic()
      loop()
    } else if (kennel.isReached) {
      kennel.isReached = false
      state.nextLevel(startGame)
    } else if (state.game_over || state.lives == 0) {
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

function getPos(value, initValue) {
  if (value == null) {
    return initValue
  }
  if (initValue !== null) {
    return value < 0 ? initValue - Math.abs(value) : value
  }

  return value
}
