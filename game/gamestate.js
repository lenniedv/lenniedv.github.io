function GameState() {
  this.game_score = 0
  this.lives = 3
  this.game_over = false
  this.isPlaying = false
  this.sounds = {}
  this.music = {}
  this.nightMode = false
  this.darkness = 0
  this.fire_range = 200
  this.entryScreen

  this.init = function () {
    this.isPlaying = false
    this.entryScreen = loadImage('assets/entryscreen.png')

    soundFormats('mp3', 'wav')

    //load your sounds here
    this.sounds = {}
    this.sounds.fire = loadSound('sounds/fire.wav')
    this.sounds.fire.setVolume(0.5)
    this.sounds.enemyDie = loadSound('sounds/enemy_die.mp3')
    this.sounds.enemyDie.setVolume(0.5)
    this.sounds.jump = loadSound('sounds/jump.wav')
    this.sounds.jump.setVolume(0.5)
    this.sounds.lost = loadSound('sounds/lifelost.wav')
    this.sounds.lost.setVolume(0.5)
    this.sounds.kennel = loadSound('sounds/kennelentry.wav')
    this.sounds.kennel.setVolume(0.5)
    this.sounds.gameover = loadSound('sounds/gameover.mp3')
    this.sounds.gameover.setVolume(0.2)
    this.sounds.levelup = loadSound('sounds/levelup.wav')
    this.sounds.levelup.setVolume(0.2)
    this.sounds.cookie = loadSound('sounds/cookie.wav')
    this.sounds.cookie.setVolume(0.5)
    this.sounds.life = loadSound('sounds/life.mp3')
    this.sounds.life.setVolume(0.5)

    this.music = {}
    this.music.city = loadSound('music/city.wav')
    this.music.city.setVolume(0.1)
    this.music.bush = loadSound('music/bush.wav')
    this.music.bush.setVolume(0.1)
    this.music.bush.loop()
  }

  this.checkDarkness = function () {
    return state.darkness > 200
  }

  this.updateScore = function () {
    this.game_score++
  }

  this.updateScoreBy = function (score) {
    this.game_score += score
  }

  this.increaseHealth = function () {
    this.lives++
  }
  this.looseLive = function () {
    this.lives--
  }
  this.GameOver = function () {
    this.sounds.gameover.play()
    this.game_over = true
    noLoop()
  }
  this.restart = function () {
    this.lives = 3
    this.isPlaying = true
    this.game_over = false
    this.sounds.gameover.stop()
    loop()
  }
}
