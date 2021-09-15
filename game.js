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

   //  play("explosion")

    // const explosion = add([
    //   sprite("explosion"),
    //   pos(missile.pos),
    //   origin("center")
    // ])
    // explosion.play("boom")

    // wait(1, () => {
    //   destroy(explosion)
    // });

    // const explosion2 = add([
    //   sprite("explosion"),
    //   pos(tank.pos),
    //   origin("center"),
    //   scale(5)
    // ])
    // explosion2.play("boom")

    // wait(1, () => {
    //   destroy(explosion2)
    //   go("start")
    // });
  })

  collides("sr", "meteor", (sr, meteor) => {
    destroy(meteor)
    destroy(sr)

   //  play("explosion")

    // const explosion = add([
    //   sprite("explosion"),
    //   pos(missile.pos),
    //   origin("center")
    // ])
    // explosion.play("boom")

    // wait(1, () => {
    //   destroy(explosion)
    // });

    // const explosion2 = add([
    //   sprite("explosion"),
    //   pos(tank.pos),
    //   origin("center"),
    //   scale(5)
    // ])
    // explosion2.play("boom")

    // wait(1, () => {
    //   destroy(explosion2)
    //   go("start")
    // });
  })


  // keyDown("4", () => {
  //   blue.angle += dt() * 3
  // })

  // keyDown("6", () => {
  //   blue.angle -= dt() * 3
  // })

  // keyDown("5", () => {
  //   blue.move(100 * Math.cos(blue.angle), -100 * Math.sin(blue.angle))
  // })

  // keyDown("2", () => {
  //   blue.move(-100 * Math.cos(blue.angle), +100 * Math.sin(blue.angle))
  // })

  // keyPress("8", () => {
  //   if (blue.exists()) {
  //     add([
  //       sprite("missile"),
  //       pos(blue.pos),
  //       scale(0.1),
  //       rotate(blue.angle),
  //       origin("center"),
  //       color(0.5, 0.5, 1),
  //       "missile",
  //       "missileblue"
  //     ])
  //     play("launch", { volume: 0.1 })
  //   }
  // })

  // action("missile", (obj) => {
  //   obj.move(200 * Math.cos(obj.angle), -200 * Math.sin(obj.angle));
  // });

  // keyPress("w", () => {
  //   if (red.exists()) {
  //     add([
  //       sprite("missile"),
  //       pos(red.pos),
  //       scale(0.1),
  //       rotate(red.angle),
  //       origin("center"),
  //       color(1, 0.3, 0.3),
  //       "missile",
  //       "missilered",
  //     ])
  //     play("launch", { volume: 0.1 })
  //   }
  // })

  // collides("missilered", "tankblue", (missile, tank) => {
  //   destroy(missile)
  //   destroy(tank)

  //   play("explosion")

  //   const explosion = add([
  //     sprite("explosion"),
  //     pos(missile.pos),
  //     origin("center")
  //   ])
  //   explosion.play("boom")

  //   wait(1, () => {
  //     destroy(explosion)
  //   });

  //   const explosion2 = add([
  //     sprite("explosion"),
  //     pos(tank.pos),
  //     origin("center"),
  //     scale(5)
  //   ])
  //   explosion2.play("boom")

  //   wait(1, () => {
  //     destroy(explosion2)
  //     go("start")
  //   });

  // });

  // collides("missileblue", "tankred", (missile, tank) => {
  //   destroy(missile)
  //   destroy(tank)

  //   play("explosion")

  //   const explosion = add([
  //     sprite("explosion"),
  //     pos(missile.pos),
  //     origin("center")
  //   ])
  //   explosion.play("boom")

  //   wait(1, () => {
  //     destroy(explosion)
  //   });

  //   const explosion2 = add([
  //     sprite("explosion"),
  //     pos(tank.pos),
  //     origin("center"),
  //     scale(5)
  //   ])
  //   explosion2.play("boom")

  //   wait(1, () => {
  //     destroy(explosion2)
  //     go("start")
  //   });
  // });

  // collides("missile", "wall", (missile, wall) => {
  //   destroy(missile)
  //   play("explosion", { 
  //     volume: 0.1
  //   })

  //   const explosion = add([
  //     sprite("explosion"),
  //     pos(missile.pos),
  //     origin("center")
  //   ])
  //   explosion.play("boom")

  //   wait(1, () => {
  //     destroy(explosion)
  //   });

  // });

  // collides("missile", "missile", (missile1, missile2) => {
  //   return

  //   // remove both the bullet and the thing bullet hit with tag "killable" from scene
  //   destroy(missile1)
  //   destroy(missile2)
  //   const explosion = add([
  //     sprite("explosion"),
  //     pos(missile1.pos),
  //     origin("center")
  //   ])
  //   explosion.play("boom")

  //   wait(1, () => {
  //     destroy(explosion)
  //   });

  // });

})


// start the game
go("main");