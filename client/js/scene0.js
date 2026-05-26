class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 200;
    this.direction = new Phaser.Math.Vector2(0, 0);
    this.remotePlayers = [];
    this.gearCount = 0;
    this.hasBomb = false;
    this.bombTimer = 0;
    this.bombDuration = 30000; // 30 segundos em ms
  }

  init() {
    // Resetar contador quando volta da gameover
    this.gearCount = 0;
  }

  create() {
    this.tilemap = this.make.tilemap({ key: "map" });

    this.anims.create({
      key: "android-andandobaixo",
      frames: this.anims.generateFrameNumbers("android-andandobaixo", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "android-andandocima",
      frames: this.anims.generateFrameNumbers("android-andandocima", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "android-andandodireita",
      frames: this.anims.generateFrameNumbers("android-andandodireita", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "android-andandoesquerda",
      frames: this.anims.generateFrameNumbers("android-andandoesquerda", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "character-andandobaixo",
      frames: this.anims.generateFrameNumbers("character-andandobaixo", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "character-andandocima",
      frames: this.anims.generateFrameNumbers("character-andandocima", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "character-andandodireita",
      frames: this.anims.generateFrameNumbers("character-andandodireita", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "character-andandoesquerda",
      frames: this.anims.generateFrameNumbers("character-andandoesquerda", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("andandoesquerda", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.tilesetFundo = this.tilemap.addTilesetImage("main_level", "fundo");
    this.tilesetDecorative = this.tilemap.addTilesetImage(
      "decorative",
      "decorative",
    );
    this.tilesetWithFloor = this.tilemap.addTilesetImage(
      "withfloor",
      "withfloor",
    );
    this.tilesetObjects = this.tilemap.addTilesetImage("objects", "objects");
    this.tilesetFoguete = this.tilemap.addTilesetImage("foguete4", "spaceship");
    this.tilesetWater = this.tilemap.addTilesetImage(
      "water_detilazation_v2",
      "water",
    );

    this.layerFundo = this.tilemap.createLayer("FUNDO", [this.tilesetFundo]);

    this.layerParede = this.tilemap.createLayer("PAREDE", [
      this.tilesetWithFloor,
    ]);
    this.layerParede.setCollisionByProperty({ collides: true });

    this.layerPlanta1 = this.tilemap.createLayer("PLANTA 1", [
      this.tilesetDecorative,
    ]);
    this.layerPlanta1.setCollisionByProperty({ pedra: true });

    this.layerPlanta2 = this.tilemap.createLayer("PLANTA 2", [
      this.tilesetDecorative,
    ]);

    this.layerPlanta3 = this.tilemap.createLayer("PLANTA 3", [
      this.tilesetDecorative,
    ]);

    this.player = this.physics.add.sprite(
      150,
      this.game.localPlayer === "character" ? 656 : 320,
      this.game.localPlayer,
      0,
    );

    this.anims.create({
      key: "android-andandocima",
      frames: this.anims.generateFrameNumbers("android", {
        start: 7,
        end: 10,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "android-andandobaixo",
      frames: this.anims.generateFrameNumbers("android", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "android-andandodireita",
      frames: this.anims.generateFrameNumbers("android", {
        start: 14,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "android-andandoesquerda",
      frames: this.anims.generateFrameNumbers("android", {
        start: 21,
        end: 26,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "character-andandocima",
      frames: this.anims.generateFrameNumbers("character", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "character-andandoesquerda",
      frames: this.anims.generateFrameNumbers("character", {
        start: 8,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "character-andandodireita",
      frames: this.anims.generateFrameNumbers("character", {
        start: 40,
        end: 47,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "character-parado",
      frames: this.anims.generateFrameNumbers("character", {
        start: 0,
        end: 0,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "android-parado",
      frames: this.anims.generateFrameNumbers("android", {
        start: 0,
        end: 0,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "character-andandobaixo",
      frames: this.anims.generateFrameNumbers("character", {
        start: 24,
        end: 31,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animações com bomba
    //this.anims.create({
     // key: "astronauta-armabaixo",
     // frames: this.anims.generateFrameNumbers("astronautaarmabaixo", {
      //  start: 0,
       // end: 0,
      //}),
      //frameRate: 1,
    //});

   // this.anims.create({
     // key: "astronauta-armaesquerda",
     // frames: this.anims.generateFrameNumbers("astronautaarmaesquerda", {
       // start: 0,
       // end: 0,
      //}),
     // frameRate: 1,
   // });

    //this.anims.create({
     // key: "astronauta-armadireita",
     // frames: this.anims.generateFrameNumbers("astronautadisparodireita", {
       // start: 0,
       // end: 0,
     // }),
      //frameRate: 1,
    //});

    this.player.body.setSize(60, 95).setOffset(32, 32);

    this.aliens = this.physics.add.group();
    this.aliens.createMultiple({
      key: "alien-down",
      frameQuantity: 50,
    });

    this.aliens.children.iterate((alien) => {
      alien.x = Math.random() * this.tilemap.widthInPixels;
      if (Math.abs(alien.x - this.player.x) < 200) {
        alien.x += 200;
      }

      alien.y = Math.random() * this.tilemap.heightInPixels;
      if (Math.abs(alien.y - this.player.y) < 200) {
        alien.y += 200;
      }

      alien.body.setSize(48, 48).setOffset(8, 16);
    });
    this.physics.add.overlap(
      this.player,
      this.aliens,
      () => {
        this.scene.stop();
        this.scene.start("gameover");
      },
      null,
      this,
    );

    this.layerFoguete = this.tilemap.createLayer("FOGUETE", [
      this.tilesetFoguete,
    ]);
    this.layerFoguete.setCollisionByProperty({ foguete: true });

    this.layerIluminacao = this.tilemap.createLayer("ILUMINACAO", [
      this.tilesetWithFloor,
    ]);
    this.layerIluminacao.setCollisionByProperty({ collides: true });

    this.layerMatocomolhos = this.tilemap.createLayer("MATO COM OLHOS", [
      this.tilesetObjects,
    ]);
    this.layerMatocomolhos.setCollisionByProperty({ planta: true });

    this.layerGosma = this.tilemap.createLayer("GOSMA", [this.tilesetWater]);

    this.gears = this.physics.add.group();
    this.gears.createMultiple({
      key: "engrenagem",
      frameQuantity: 1000,
    });

    this.bombs = this.physics.add.group();
    this.bombs.createMultiple({
      key: "bomba",
      frameQuantity: 100,
    });

    const isOnWithFloor = (x, y) =>
      this.layerParede.hasTileAtWorldXY(x, y) ||
      this.layerIluminacao.hasTileAtWorldXY(x, y);

    // Gerar posições bem afastadas para as bombas
    const bombPositions = [];
    const minDistance = 150; // Distância mínima entre bombas
    let positionIndex = 0;

    while (positionIndex < 500) {
      let x = Math.random() * this.tilemap.widthInPixels;
      let y = Math.random() * this.tilemap.heightInPixels;
      let attempts = 0;

      // Evitar posições com colisão de mapa
      while (isOnWithFloor(x, y) && attempts < 20) {
        x = Math.random() * this.tilemap.widthInPixels;
        y = Math.random() * this.tilemap.heightInPixels;
        attempts += 1;
      }

      // Verificar se está longe de outras bombas
      let tooClose = false;
      for (let pos of bombPositions) {
        const distance = Phaser.Math.Distance.Between(x, y, pos.x, pos.y);
        if (distance < minDistance) {
          tooClose = true;
          break;
        }
      }

      if (!tooClose) {
        bombPositions.push({ x, y });
        positionIndex++;
      }
    }

    this.bombs.children.iterate((bomb, index) => {
      if (index < bombPositions.length) {
        bomb.x = bombPositions[index].x;
        bomb.y = bombPositions[index].y;
        bomb.body.reset(bomb.x, bomb.y);
        bomb.body.setImmovable(true);
        bomb.body.setSize(64, 64);
        bomb.setActive(true);
        bomb.setVisible(true);
        bomb.setDisplaySize(64, 64);
      } else {
        bomb.setActive(false);
        bomb.setVisible(false);
      }
    });

    this.gears.children.iterate((gear, index) => {
      let x;
      let y;
      let attempts = 0;
      if (index < 5) {
        x = this.player.x + index * 100 - 200;
        y = this.player.y + 100;
      } else {
        x = Math.random() * this.tilemap.widthInPixels;
        y = Math.random() * this.tilemap.heightInPixels;
      }

      while (isOnWithFloor(x, y) && attempts < 20) {
        x = Math.random() * this.tilemap.widthInPixels;
        y = Math.random() * this.tilemap.heightInPixels;
        attempts += 1;
      }

      gear.x = x;
      gear.y = y;
      gear.body.setImmovable(true);
      gear.anims.play("gear-spin", true);
    });
    this.physics.add.overlap(
      this.player,
      this.gears,
      (player, gear) => {
        gear.destroy();
        this.gearCount++;
        this.gearCounterValue.setText(`${this.gearCount}/100`);
        console.log(`Engrenagem coletada! Total: ${this.gearCount}`);
        console.log(`Engrenagem coletada! Total: ${this.gearCount}`);

        // Verificar se ganhou o jogo
        if (this.gearCount >= 100) {
          this.scene.stop();
          this.scene.start("victory"); // Criar cena de vitória depois
        }
      },
      null,
      this,
    );

    this.physics.add.overlap(
      this.player,
      this.bombs,
      (player, bomb) => {
        bomb.destroy();
        this.hasBomb = true;
        this.bombTimer = this.bombDuration;
        console.log("Bomba coletada!");
      },
      null,
      this,
    );

    this.anims.create({
      key: "alien-walk-down",
      frames: this.anims.generateFrameNumbers("alien-down", {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "alien-walk-up",
      frames: this.anims.generateFrameNumbers("alien-up", {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "alien-walk-right",
      frames: this.anims.generateFrameNumbers("alien-right", {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "alien-walk-left",
      frames: this.anims.generateFrameNumbers("alien-left", {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "gear-spin",
      frames: this.anims.generateFrameNumbers("engrenagem", {
        start: 0,
        end: 11,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.physics.world.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );
    this.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );
    this.cameras.main.startFollow(this.player);

    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.layerParede);
    this.physics.add.collider(this.player, this.layerFoguete);
    this.physics.add.collider(this.player, this.layerIluminacao);
    this.physics.add.collider(this.player, this.layerPlanta1);
    this.physics.add.collider(this.player, this.layerPlanta2);
    this.physics.add.collider(this.player, this.layerPlanta3);
    this.physics.add.collider(this.player, this.layerMatocomolhos);

    this.physics.add.collider(this.aliens, this.layerParede);
    this.physics.add.collider(this.aliens, this.layerFoguete);
    this.physics.add.collider(this.aliens, this.layerIluminacao);
    this.physics.add.collider(this.aliens, this.layerPlanta1);
    this.physics.add.collider(this.aliens, this.layerPlanta2);
    this.physics.add.collider(this.aliens, this.layerPlanta3);
    this.physics.add.collider(this.aliens, this.layerMatocomolhos);

    this.physics.add.collider(this.gears, this.layerParede);
    this.physics.add.collider(this.gears, this.layerFoguete);
    this.physics.add.collider(this.gears, this.layerIluminacao);
    this.physics.add.collider(this.gears, this.layerPlanta1);
    this.physics.add.collider(this.gears, this.layerPlanta2);
    this.physics.add.collider(this.gears, this.layerPlanta3);
    this.physics.add.collider(this.gears, this.layerMatocomolhos);

    this.physics.add.collider(this.bombs, this.layerParede);
    this.physics.add.collider(this.bombs, this.layerFoguete);
    this.physics.add.collider(this.bombs, this.layerIluminacao);
    this.physics.add.collider(this.bombs, this.layerPlanta1);
    this.physics.add.collider(this.bombs, this.layerPlanta2);
    this.physics.add.collider(this.bombs, this.layerPlanta3);
    this.physics.add.collider(this.bombs, this.layerMatocomolhos);

    this.music = this.sound.add("music", { loop: true }).play();
    this.laser = this.sound.add("laser");
    this.passos = this.sound.add("passos");

    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: 100,
      y: 350,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0x10002b),
      thumb: this.add.circle(0, 0, 25, 0xe0aaff),
    });

    this.joystick.on("update", () => {
      const angle = Phaser.Math.DegToRad(this.joystick.angle);
      const force = this.joystick.force;

      if (force > this.threshold) {
        this.direction = new Phaser.Math.Vector2(
          Math.cos(angle),
          Math.sin(angle),
        ).normalize();

        this.player.setVelocity(
          this.direction.x * this.speed,
          this.direction.y * this.speed,
        );

        if (Math.abs(this.direction.x) > Math.abs(this.direction.y)) {
          if (this.direction.x > 0)
            this.player.anims.play(
              this.game.localPlayer + "-andandodireita",
              true,
            );
          else
            this.player.anims.play(
              this.game.localPlayer + "-andandoesquerda",
              true,
            );
        } else {
          if (this.direction.y > 0)
            this.player.anims.play(
              this.game.localPlayer + "-andandobaixo",
              true,
            );
          else
            this.player.anims.play(
              this.game.localPlayer + "-andandocima",
              true,
            );
        }

        if (!this.passos.isPlaying) {
          this.passos.play({ loop: true });
        }
      } else {
        this.direction.set(0, 0);
        this.player.setVelocity(0, 0);
        if (this.passos.isPlaying) {
          this.passos.stop();
        }
      }
    });

    this.game.socket.on("scene0", (state) => {
      if (!state.player || state.player.id === this.game.socket.id) return;

      let remotePlayer = this.remotePlayers.find(
        (p) => p.id === state.player.id,
      );

      if (remotePlayer) {
        remotePlayer.sprite.setPosition(state.player.x, state.player.y);
        remotePlayer.sprite.setTexture(
          state.player.texture,
          state.player.frame || 0,
        );
      } else {
        remotePlayer = this.add.sprite(
          state.player.x,
          state.player.y,
          this.game.remotePlayer === "character" ? "character" : "android",
          0,
        );
        this.remotePlayers.push({
          id: state.player.id,
          sprite: remotePlayer,
        });
        remotePlayer.setPosition(state.player.x, state.player.y);
        remotePlayer.setTexture(state.player.texture, state.player.frame || 0);
      }
    });

    // Criar contador de engrenagens no canto superior esquerdo
    const counterX = 12;
    const counterY = 12;
    const counterWidth = 226;
    const counterHeight = 56;

    this.counterBg = this.add
      .image(counterX, counterY, "contadorBg")
      .setOrigin(0)
      .setDisplaySize(counterWidth, counterHeight)
      .setScrollFactor(0)
      .setDepth(995);

    this.gearCounterValue = this.add
      .text(
        counterX + 82,
        counterY + counterHeight / 2 + 2,
        `${this.gearCount}/100`,
        {
          fontFamily: "Rye",
          fontSize: "25px",
          color: "#f9d750",
          stroke: "#2b1e4f",
          strokeThickness: 2,
          shadow: {
            offsetX: 0,
            offsetY: 1,
            color: "#000000",
            blur: 3,
            stroke: true,
            fill: true,
          },
        },
      )
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(1000);
  }

  update() {
    // Atualizar temporizador de bomba
    if (this.hasBomb) {
      this.bombTimer -= 1000 / 60; // Reduzir pelo deltaTime aproximado
      if (this.bombTimer <= 0) {
        this.hasBomb = false;
        this.bombTimer = 0;
        console.log("Bomba expirou!");
      }
    }

    try {
      const frame = this.player.anims.currentFrame
        ? this.player.anims.currentFrame.index
        : 0;
      if (this.player.anims.currentAnim) this.player.anims.currentAnim.key;

      this.game.socket.emit("scene0", this.game.room, {
        player: {
          id: this.game.socket.id,
          x: this.player.x,
          y: this.player.y,
          texture:
            this.game.localPlayer === "character" ? "character" : "android",
          animation: this.player.anims.currentAnim
            ? this.player.anims.currentAnim.key
            : null,
          frame,
        },
      });
    } catch (e) {
      console.error("Error emitting scene0 state:", e);
    }

    if (
      this.player.body.velocity.x === 0 &&
      this.player.body.velocity.y === 0
    ) {
      //this.player.anims.play(this.game.localPlayer + "-parado", true);
    } else if (Math.abs(this.direction.x) > Math.abs(this.direction.y)) {
      if (this.direction.x > 0) {
        if (this.hasBomb) {
          this.player.setTexture("astronautadisparodireita");
         // this.player.anims.play("astronauta-armadireita", true);
        //} else {
          this.player.anims.play(
            this.game.localPlayer + "-andandodireita",
            true,
          );
        }
      } else {
        if (this.hasBomb) {
          this.player.setTexture("astronautaarmaesquerda");
          //this.player.anims.play("astronauta-armaesquerda", true);
        //} else {
          this.player.anims.play(
            this.game.localPlayer + "-andandoesquerda",
            true,
          );
        }
      }
    } else {
      if (this.direction.y > 0) {
        if (this.hasBomb) {
          this.player.setTexture("astronautaarmabaixo");
          //this.player.anims.play("astronauta-armabaixo", true);
        } else {
          this.player.anims.play(this.game.localPlayer + "-andandobaixo", true);
        }
      } else {
        if (this.hasBomb) {
          this.player.setTexture("astronautaarmabaixo");
          //this.player.anims.play("astronauta-armabaixo", true);
        } else {
          this.player.anims.play(this.game.localPlayer + "-andandocima", true);
        }
      }
    }

    this.aliens.children.iterate((alien) => {
      if (
        Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          alien.x,
          alien.y,
        ) < 400
      ) {
        if (this.player.x > alien.x) {
          alien.setVelocityX(50);
        } else if (this.player.x < alien.x) {
          alien.setVelocityX(-50);
        }
        if (this.player.y > alien.y) {
          alien.setVelocityY(50);
        } else if (this.player.y < alien.y) {
          alien.setVelocityY(-50);
        }
      } else {
        alien.setVelocity(0, 0);
      }

      if (alien.body.velocity.x > 0) {
        alien.anims.play("alien-walk-right", true);
      } else if (alien.body.velocity.x < 0) {
        alien.anims.play("alien-walk-left", true);
      } else if (alien.body.velocity.y > 0) {
        alien.anims.play("alien-walk-down", true);
      } else if (alien.body.velocity.y < 0) {
        alien.anims.play("alien-walk-up", true);
      } else {
        alien.anims.stop();
      }
    });
  }
}

export default scene0;
