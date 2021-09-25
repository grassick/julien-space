// init kaboom context
kaboom({ 
  fullscreen: true, 
  global: true, 
  clearColor: [0, 0, 0],
});

loadSprite("spacecraft", "spacecraft.png")
loadSprite('meteor', "meteor.png")
loadSprite("laser", "laser.png", {
  sliceX: 11,
  sliceY: 1,
  anims: {
    go: { from: 0, to: 10 }
  }
})

loadSprite("explosion", "exp2_0.png", {
  sliceX: 4,
  sliceY: 4,
  anims: {
    boom: {from: 0, to: 15}
  }
})
loadSound("explosion", "explosion.wav")

// define a scene
scene("main", () => {
  const sr = add([
    "sr",
    sprite("spacecraft"),
    pos(width() / 2, height() / 2),
    scale(0.2),
    rotate(0),
    origin("center"),
    {
      temp: 0
    }
  ])

  loop(0.1, () => {
    sr.temp = sr.temp - 1
  })

  loop(2.0, () => {
    const angle = rand(0, 100)
    const radius = Math.sqrt(width()*width() + height()*height())/2

    add([
      "meteor",
      sprite('meteor'),
      pos(Math.cos(angle)*radius + width() /2, Math.sin(angle)*radius + height() /2),
      scale(0.2), 
      {
        angle: angle
      },
      origin("center"),
      area()
    ])
  })

  action("meteor", (obj) => {
    obj.move(100 * -Math.cos(obj.angle), -100 * Math.sin(obj.angle));
  });

  keyDown("a", () => {
    sr.angle += dt() * 3
  })

  keyDown("d", () => {
    sr.angle -= dt() * 3
  })

  keyDown("s", () => {
    if (sr.temp <= 0) {
      sr.temp = 10
      const laser = add([
        "laser",
        sprite("laser", { anim: "go" }),
        pos(sr.pos),
        rotate(sr.angle),
        scale(0.1),
        origin("center"),
        area()
      ])
    }
  })

  action("laser", (obj) => {
    obj.move(-600* Math.sin(obj.angle), -600 * Math.cos(obj.angle));
  });

  collides("laser", "meteor", (laser, meteor) => {
    destroy(meteor)
    destroy(laser)

    const explosion = add([
      scale(3),
      sprite("explosion"),
      pos(meteor.pos),
      origin("center")
    ])
    explosion.play("boom")

    wait(1, () => {
      destroy(explosion)
    });
    play("explosion")
  })

  collides("sr", "meteor", (sr, meteor) => {
    destroy(meteor)
    destroy(sr)

    const explosion = add([
      scale(4),
      sprite("explosion"),
      pos(sr.pos),
      origin("center")
    ])
    explosion.play("boom")

    wait(1, () => {
      destroy(explosion)
      go("end")
    });
    play("explosion")
  })
})


scene("end", () => {
  add([
    pos(width()/2, 100),
    origin("center"),
    color(0, 0, 1),
    text(`game over!!!`, 40),
  ])

  keyPress("enter", () => {
    go("main")
  })
})

// start the game
go("main");