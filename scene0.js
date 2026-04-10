class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 200;
    this.direction = new Phaser.Math.Vector2(0, 0);
  }

  preload() {
    this.load.setPath("assets/");
    this.load.tilemapTiledJSON("map", "map.json");
    this.load.spritesheet("personagem", "parado.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("andandobaixo", "andandobaixo.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("andandocima", "andandocima.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("andandodireita", "andandodireita.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("andandoesquerda", "andandoesquerda.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("alien", "alien.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("objects", "objects.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("water", "water_detilazation_v2.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("spaceship", "foguete4.png");
    this.load.spritesheet("fundo", "fundo.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("decorative", "decorative.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("withfloor", "withfloor.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio("music", "music.mp3");
    this.load.audio("laser", "laser.mp3");
    this.load.audio("passos", "passos.mp3");

    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );
  }

  create() {
    this.tilemap = this.make.tilemap({ key: "map" });

    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("andandobaixo", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("andandocima", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("andandodireita", {
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

    this.player = this.physics.add.sprite(
      2489.018404687718,
      2432,
      "andandobaixo",
      0,
    );

    this.layerFoguete = this.tilemap.createLayer("FOGUETE", [
      this.tilesetFoguete,
    ]);
    this.layerFoguete.setCollisionByProperty({ foguete: true });

    this.layerPlanta2 = this.tilemap.createLayer("PLANTA 2", [
      this.tilesetDecorative,
    ]);
    this.layerPlanta2.setCollisionByProperty({ planta: true });

    this.layerPlanta3 = this.tilemap.createLayer("PLANTA 3", [
      this.tilesetDecorative,
    ]);
    this.layerPlanta3.setCollisionByProperty({ planta: true });

    this.layerIluminacao = this.tilemap.createLayer("ILUMINACAO", [
      this.tilesetWithFloor,
    ]);
    this.layerIluminacao.setCollisionByProperty({ collide: true });

    this.layerMatocomolhos = this.tilemap.createLayer("MATO COM OLHOS", [
      this.tilesetObjects,
    ]);
    this.layerMatocomolhos.setCollisionByProperty({ planta: true });

    this.layerPlanta1 = this.tilemap.createLayer("PLANTA 1", [
      this.tilesetDecorative,
    ]);
    this.layerPlanta1.setCollisionByProperty({ pedra: true });

    this.layerGosma = this.tilemap.createLayer("GOSMA", [this.tilesetWater]);

    this.anims.create({
      key: "standing-still",
      frames: this.anims.generateFrameNumbers("personagem", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "running",
      frames: this.anims.generateFrameNumbers("personagem", {
        start: 8,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jumping",
      frames: this.anims.generateFrameNumbers("personagem", {
        start: 40,
        end: 47,
      }),
      frameRate: 10,
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

    this.music = this.sound.add("music", { loop: true }).play();
    this.laser = this.sound.add("laser");
    this.passos = this.sound.add("passos");

    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: 100,
      y: 350,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0xcccccc),
      thumb: this.add.circle(0, 0, 25, 0x666666),
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
          if (this.direction.x > 0) this.player.anims.play("walk-right", true);
          else this.player.anims.play("walk-left", true);
        } else {
          if (this.direction.y > 0) this.player.anims.play("walk-down", true);
          else this.player.anims.play("walk-up", true);
        }

        this.passos.play({ loop: true });
      } else {
        this.direction.set(0, 0);
        this.player.setVelocity(0, 0);
        this.passos.stop();
      }
    });
  }

  update() {
    if (
      this.player.body.velocity.x === 0 &&
      this.player.body.velocity.y === 0
    ) {
      this.player.anims.play("standing-still", true);
      return;
    }

    if (Math.abs(this.direction.x) > Math.abs(this.direction.y)) {
      if (this.direction.x > 0) this.player.anims.play("walk-right", true);
      else this.player.anims.play("walk-left", true);
    } else {
      if (this.direction.y > 0) this.player.anims.play("walk-down", true);
      else this.player.anims.play("walk-up", true);
    }
  }
}

export default scene0;
