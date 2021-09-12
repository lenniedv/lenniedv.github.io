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
    trees: [900, 1600, 2000],
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
      },
      {
        x_pos: 1600,
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
        score: 5,
        direction: 'RIGHT',
        range: 200
      },
      {
        x_pos: 1200,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 50
      },
      {
        x_pos: 1600,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 300
      },
      {
        x_pos: 1800,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 300
      },
      {
        x_pos: 2000,
        y_pos: null,
        type: 'CAT',
        score: 5,
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
      x_pos: 20,
      y_pos: 0
    },
    trees: [500, 900, 1350],
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
      },
      {
        x_pos: 1800,
        y_pos: 434,
        width: 200,
        top_y_pos: 134
      }
    ],
    canyons: [
      {
        x_pos: 550,
        width: 200
      },
      {
        x_pos: 1200,
        width: 100
      },
      {
        x_pos: 1600,
        width: 100
      },
      {
        x_pos: 2000,
        width: 500
      }
    ],
    platforms: [
      {
        x_pos: 300,
        y_pos: -80,
        width: 200,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 600,
        y_pos: -100,
        width: 200,
        height: 20,
        moving: 'LEFT_RIGHT'
      },
      {
        x_pos: 700,
        y_pos: -180,
        width: 100,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 880,
        y_pos: -210,
        width: 120,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 1000,
        y_pos: -120,
        width: 100,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 1600,
        y_pos: -50,
        width: 100,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 1700,
        y_pos: -100,
        width: 200,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 1400,
        y_pos: -150,
        width: 200,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 2000,
        y_pos: -100,
        width: 100,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 2200,
        y_pos: -140,
        width: 100,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 2400,
        y_pos: -150,
        width: 200,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 2200,
        y_pos: -250,
        width: 300,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 2700,
        y_pos: -100,
        width: 200,
        height: 20,
        moving: 'LEFT_RIGHT'
      }
    ],
    healths: [
      {
        x_pos: 950,
        y_pos: -230,
        size: 20
      }
    ],
    collectables: [
      {
        x_pos: 400,
        y_pos: -90,
        size: 30
      },
      {
        x_pos: 600,
        y_pos: -110,
        size: 30
      },
      {
        x_pos: 800,
        y_pos: null,
        size: 30
      },
      {
        x_pos: 1750,
        y_pos: -120,
        size: 30
      },
      {
        x_pos: 1850,
        y_pos: -120,
        size: 30
      },
      {
        x_pos: 2300,
        y_pos: -260,
        size: 30
      },
      {
        x_pos: 2460,
        y_pos: -260,
        size: 30
      }
    ],
    enemies: [
      {
        x_pos: 520,
        y_pos: -50,
        type: 'SPIDER',
        score: 0,
        direction: 'DOWN',
        range: 300
      },
      {
        x_pos: 1000,
        y_pos: null,
        type: 'CAT',
        score: 10,
        direction: 'LEFT',
        range: 180
      },
      {
        x_pos: 1500,
        y_pos: null,
        type: 'CAT',
        score: 10,
        direction: 'LEFT',
        range: 180
      },
      {
        x_pos: 1650,
        y_pos: -50,
        type: 'SPIDER',
        score: 0,
        direction: 'DOWN',
        range: 200
      },
      {
        x_pos: 1600,
        y_pos: null,
        type: 'CAT',
        score: 10,
        direction: 'LEFT',
        range: 100
      },
      {
        x_pos: 2000,
        y_pos: null,
        type: 'CAT',
        score: 10,
        direction: 'LEFT',
        range: 300
      },
      {
        x_pos: 2400,
        y_pos: -260,
        type: 'CAT',
        score: 10,
        direction: 'LEFT',
        range: 100
      }
    ],
    kennel: {
      x_pos: 3000,
      y_pos: -10
    }
  },
  // Level 3
  {
    game: {
      weapons: 10,
      fire_range: 200,
      mode: 'city',
      music_type: 'city'
    },
    player: {
      x_pos: 20,
      y_pos: 0
    },
    trees: [],
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
    mountains: [],
    canyons: [
      {
        x_pos: 550,
        width: 200
      },
      {
        x_pos: 1200,
        width: 100
      },
      {
        x_pos: 1600,
        width: 100
      },
      {
        x_pos: 2000,
        width: 500
      }
    ],
    platforms: [
      {
        x_pos: 300,
        y_pos: -80,
        width: 200,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 600,
        y_pos: -100,
        width: 200,
        height: 20,
        moving: 'LEFT_RIGHT'
      },
      {
        x_pos: 700,
        y_pos: -180,
        width: 100,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 880,
        y_pos: -210,
        width: 120,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 1000,
        y_pos: -120,
        width: 100,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 1600,
        y_pos: -50,
        width: 100,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 1700,
        y_pos: -100,
        width: 200,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 1400,
        y_pos: -150,
        width: 200,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 2000,
        y_pos: -100,
        width: 100,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 2200,
        y_pos: -140,
        width: 100,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 2400,
        y_pos: -150,
        width: 200,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 2200,
        y_pos: -250,
        width: 300,
        height: 20,
        moving: 'STATIC'
      },
      {
        x_pos: 2700,
        y_pos: -100,
        width: 200,
        height: 20,
        moving: 'LEFT_RIGHT'
      }
    ],
    healths: [
      {
        x_pos: 950,
        y_pos: -230,
        size: 20
      }
    ],
    collectables: [
      {
        x_pos: 400,
        y_pos: -90,
        size: 30
      },
      {
        x_pos: 600,
        y_pos: -110,
        size: 30
      },
      {
        x_pos: 800,
        y_pos: null,
        size: 30
      },
      {
        x_pos: 1750,
        y_pos: -120,
        size: 30
      },
      {
        x_pos: 1850,
        y_pos: -120,
        size: 30
      },
      {
        x_pos: 2300,
        y_pos: -260,
        size: 30
      },
      {
        x_pos: 2460,
        y_pos: -260,
        size: 30
      }
    ],
    enemies: [
      {
        x_pos: 620,
        y_pos: -120,
        type: 'CAT',
        score: 20,
        direction: 'LEFT',
        range: 50
      },
      {
        x_pos: 1000,
        y_pos: null,
        type: 'CAT',
        score: 20,
        direction: 'LEFT',
        range: 180
      },
      {
        x_pos: 1000,
        y_pos: null,
        type: 'CAT',
        score: 20,
        direction: 'LEFT',
        range: 180
      },
      {
        x_pos: 1500,
        y_pos: null,
        type: 'CAT',
        score: 20,
        direction: 'LEFT',
        range: 180
      },
      {
        x_pos: 1600,
        y_pos: null,
        type: 'CAT',
        score: 20,
        direction: 'LEFT',
        range: 100
      },
      {
        x_pos: 2000,
        y_pos: null,
        type: 'CAT',
        score: 20,
        direction: 'LEFT',
        range: 300
      },
      {
        x_pos: 2400,
        y_pos: -260,
        type: 'CAT',
        score: 20,
        direction: 'LEFT',
        range: 100
      },
      {
        x_pos: 3000,
        y_pos: null,
        type: 'CAT',
        score: 20,
        direction: 'LEFT',
        range: 200
      },
      {
        x_pos: 3000,
        y_pos: null,
        type: 'CAT',
        score: 20,
        direction: 'LEFT',
        range: 200
      }
    ],
    kennel: {
      x_pos: 3000,
      y_pos: -10
    }
  },
  // Level 4
  {
    game: {
      weapons: 8,
      fire_range: 300,
      mode: 'city',
      music_type: 'city'
    },
    player: {
      x_pos: 20,
      y_pos: 0
    },
    trees: [],
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
    mountains: [],
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
        x_pos: 460,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 200
      },
      {
        x_pos: 800,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 100
      },
      {
        x_pos: 1200,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 50
      },
      {
        x_pos: 1600,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 300
      },
      {
        x_pos: 1800,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 300
      },
      {
        x_pos: 1700,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 300
      },
      {
        x_pos: 2000,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 100
      }
    ],
    kennel: {
      x_pos: 2200,
      y_pos: -10
    }
  },
  // Level 5
  {
    game: {
      weapons: 20,
      fire_range: 100,
      mode: 'city',
      music_type: 'city',
      end: true
    },
    player: {
      x_pos: 20,
      y_pos: 0
    },
    trees: [],
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
    mountains: [],
    canyons: [],
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
        height: 100,
        moving: 'STATIC'
      },
      {
        x_pos: 150,
        y_pos: -150,
        width: 130,
        height: 100,
        moving: 'STATIC'
      },
      {
        x_pos: 320,
        y_pos: -200,
        width: 200,
        height: 100,
        moving: 'STATIC'
      },
      {
        x_pos: 1200,
        y_pos: -100,
        width: 100,
        height: 100,
        moving: 'STATIC'
      },
      {
        x_pos: 1350,
        y_pos: -50,
        width: 150,
        height: 100,
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
        x_pos: 460,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 200
      },
      {
        x_pos: 800,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 100
      },
      {
        x_pos: 1200,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 50
      },
      {
        x_pos: 1600,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 300
      },
      {
        x_pos: 1800,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 300
      },
      {
        x_pos: 1700,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 300
      },
      {
        x_pos: 2000,
        y_pos: null,
        type: 'CAT',
        score: 5,
        direction: 'RIGHT',
        range: 100
      },
      {
        x_pos: 2300,
        y_pos: null,
        type: 'SMOKIE',
        score: 10,
        lives: 10,
        direction: 'LEFT',
        range: 400
      }
    ],
    kennel: {
      x_pos: 2500,
      y_pos: -10
    }
  }
]
