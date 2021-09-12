function GameState() {
  this.current_level = GAME_CONFIG.current_level
  this.game_score = 0
  this.lives = GAME_CONFIG.lives
  this.game_over = false
  this.isGameStarted = false
  this.isCompleted = false
  this.sounds = {}
  this.music = {}
  this.init_fire_range = 0
  this.init_weapon_count = 0
  this.fire_range = 0
  this.weapon_count = 0
  this.entryScreen
  this.finalScreen
  this.music_type

  this.setup = function (config) {
    this.init_fire_range = config.fire_range
    this.fire_range = config.fire_range
    this.init_weapon_count = config.weapons
    this.weapon_count = config.weapons
    this.music_type = config.music_type
    this.mode = config.mode
  }

  this.init = function () {
    this.isGameStarted = false
    this.isCompleted = false

    this.entryScreen = loadImage('assets/entryscreen.png')
    this.finalScreen = loadImage('assets/finalscreen.png')

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
    this.music.forest = loadSound('music/forest.wav')
    this.music.forest.setVolume(0.1)
    this.music.forest.loop()
  }

  this.playMusic = function () {
    if (this.music_type == 'forest') {
      this.music.forest.play()
    } else {
      this.music.city.play()
    }
  }

  this.stopMusic = function () {
    this.music.city.stop()
    this.music.forest.stop()
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
  this.fireWeapon = function () {
    this.weapon_count--
    this.sounds.fire.play()
  }
  this.GameOver = function () {
    this.sounds.gameover.play()
    this.game_over = true
    noLoop()
  }
  this.restart = function () {
    this.lives = GAME_CONFIG.lives
    this.fire_range = this.init_fire_range
    this.weapon_count = this.init_weapon_count
    this.isGameStarted = true
    this.game_over = false
    this.sounds.gameover.stop()
    loop()
  }
  this.nextLevel = function (start) {
    state.current_level++
    if (levels.length > state.current_level) {
      start()
    } else {
      state.isCompleted = true
    }
    loop()
  }
}
