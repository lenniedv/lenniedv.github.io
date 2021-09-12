var levels = [
  // Level 1
  {
    game: {
      weapons: 5,
      fire_range: 200,
      mode: 'forest',
      music_type: 'forest'
    },
    player: {
      x_pos: 20,
      y_pos: 0
    },
    trees: [50, 900],
    clouds: [
      {
        x_pos: 299,
        y_pos: 105,
        move: true,
        speed: 0.2,
        direction: 'LEFT'
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
        direction: 'RIGHT'
      }
    ],
    mountains: [
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
    ],
    canyons: [
      {
        x_pos: 200,
        width: 250
      },
      {
        x_pos: 660,
        width: 100
      },
      {
        x_pos: 1000,
        width: 50
      },
      {
        x_pos: 1300,
        width: 300
      }
    ],
    healths: [
      {
        x_pos: 1250,
        y_pos: -120,
        size: 20
      }
    ],
    platforms: [
      {
        x_pos: 120,
        y_pos: -60,
        width: 130,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 150,
        y_pos: -150,
        width: 130,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 320,
        y_pos: -200,
        width: 200,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 320,
        y_pos: -100,
        width: 150,
        height: 20,
        moving: 'LEFT_RIGHT'
      },
      {
        x_pos: 1200,
        y_pos: -100,
        width: 100,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 1350,
        y_pos: -50,
        width: 150,
        height: 20,
        moving: 'STATIC'
      }
    ],
    collectables: [
      {
        x_pos: 200,
        y_pos: -160,
        size: 30
      },
      {
        x_pos: 400,
        y_pos: -220,
        size: 30
      },
      {
        x_pos: 320,
        y_pos: -120,
        size: 30
      },
      {
        x_pos: 600,
        y_pos: -10,
        size: 30
      },
      {
        x_pos: 900,
        y_pos: -10,
        size: 30
      },
      {
        x_pos: 1400,
        y_pos: -60,
        size: 30
      },
      {
        x_pos: 1800,
        y_pos: null,
        size: 30
      },
      {
        x_pos: 2000,
        y_pos: null,
        size: 30
      }
    ],
    enemies: [
      {
        x_pos: 300,
        y_pos: -50,
        type: 'SPIDER',
        score: 0,
        direction: 'DOWN',
        range: 200
      },
      {
        x_pos: 460,
        y_pos: null,
        type: 'CAT',
        score: 20,
        direction: 'RIGHT',
        range: 200
      },
      {
        x_pos: 1200,
        y_pos: null,
        type: 'CAT',
        score: 20,
        direction: 'RIGHT',
        range: 50
      },
      {
        x_pos: 1600,
        y_pos: null,
        type: 'CAT',
        score: 20,
        direction: 'RIGHT',
        range: 300
      },
      {
        x_pos: 1800,
        y_pos: null,
        type: 'CAT',
        score: 20,
        direction: 'RIGHT',
        range: 300
      },
      {
        x_pos: 2000,
        y_pos: null,
        type: 'CAT',
        score: 20,
        direction: 'RIGHT',
        range: 100
      }
    ],
    kennel: {
      x_pos: 2200,
      y_pos: -10
    }
  },
  // Level 2
  {
    game: {
      weapons: 5,
      fire_range: 200,
      mode: 'forest',
      music_type: 'forest'
    },
    player: {
      x_pos: 0,
      y_pos: 0
    },
    clouds: [
      {
        x_pos: 299,
        y_pos: 105,
        move: true,
        speed: 0.2,
        direction: 'LEFT'
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
        direction: 'RIGHT'
      }
    ],
    mountains: [
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
    ],
    canyons: [
      {
        x_pos: 200,
        width: 50
      },
      {
        x_pos: 400,
        width: 50
      }
    ],
    platforms: [
      {
        x_pos: 1,
        y_pos: -60,
        width: 130,
        height: 20,
        moving: 'STATIC'
      }
    ],
    collectables: [
      {
        x_pos: 100,
        y_pos: -10,
        size: 30
      },

      {
        x_pos: 600,
        y_pos: -10,
        size: 30
      },

      {
        x_pos: 800,
        y_pos: -10,
        size: 30
      }
    ],
    enemies: [
      {
        x_pos: 800,
        y_pos: null,
        type: 'CAT',
        score: 20,
        direction: 'RIGHT',
        range: 200
      }
    ],
    kennel: {
      x_pos: 1200,
      y_pos: -10
    }
  }
]
