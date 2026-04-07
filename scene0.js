class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 200;
    this.direction = undefined;
  }

  preload() {
    this.load.setPath("assets/");
    this.load.tilemapTiledJSON("map", "map.json");
    this.load.spritesheet("personagem", "personagem.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("alien", "alien.png", {
      frameWidth: 32,
      frameHeight: 32,
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

    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );
  }

  create() {
    this.tilemap = this.make.tilemap({ key: "map" });

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
      "personagem",
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

    this.layerMinerio1 = this.tilemap.createLayer("MINERIO 1", [
      this.tilesetDecorative,
    ]);
    this.layerMinerio1.setCollisionByProperty({ pedra: true });

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
    this.physics.add.collider(this.player, this.layerMinerio1);
    this.physics.add.collider(this.player, this.layerPlanta1);
    this.physics.add.collider(this.player, this.layerPlanta2);
    this.physics.add.collider(this.player, this.layerPlanta3);
    this.physics.add.collider(this.player, this.layerMatocomolhos);

    this.music = this.sound.add("music", { loop: true }).play();
    this.laser = this.sound.add("laser");

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
      }

      if (this.joystick.force > 0) {
        this.player.setVelocity(
          this.direction.x * this.speed,
          this.direction.y * this.speed,
        );
      } else {
        this.player.setVelocity(0, 0);
      }
    });
  }

  update() {
    if (
      this.player.body.velocity.x === 0 &&
      this.player.body.velocity.y === 0 &&
      this.player.body.blocked.down
    ) {
      this.player.anims.play("standing-still", true);
    }
  }
}

export default scene0;
