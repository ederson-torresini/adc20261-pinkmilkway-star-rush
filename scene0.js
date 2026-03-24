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
    this.load.spritesheet("sample", "sample.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("spaceship", "rocket-spaceship.png");
    this.load.spritesheet("fundo", "fundo.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("decorative", "decorative.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("terrain", "terrain.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("withfloor", "withfloor.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("floor", "PurpleDungeonTilesNoFloor.png", {
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
    this.tilesetTerrain = this.tilemap.addTilesetImage("terrain", "terrain");
    this.tilesetWithFloor = this.tilemap.addTilesetImage(
      "withfloor",
      "withfloor",
    );
    this.tilesetFloor = this.tilemap.addTilesetImage("floor", "floor");

    this.layerFundo = this.tilemap.createLayer("FUNDO", [
      this.tilesetFundo,
      this.tilesetDecorative,
      this.tilesetTerrain,
      this.tilesetWithFloor,
      this.tilesetFloor,
    ]);

    this.layerParede = this.tilemap.createLayer("PAREDE", [
      this.tilesetFundo,
      this.tilesetDecorative,
      this.tilesetTerrain,
      this.tilesetWithFloor,
      this.tilesetFloor,
    ]);
    this.layerParede.setCollisionByProperty({ collides: true });

    this.layerFoguete = this.tilemap.createLayer("FOGUETE", [
      this.tilesetFundo,
      this.tilesetDecorative,
      this.tilesetTerrain,
      this.tilesetWithFloor,
      this.tilesetFloor,
    ]);

    this.layerPlanta2 = this.tilemap.createLayer("PLANTA 2", [
      this.tilesetFundo,
      this.tilesetDecorative,
      this.tilesetTerrain,
      this.tilesetWithFloor,
      this.tilesetFloor,
    ]);

    this.layerPlanta3 = this.tilemap.createLayer("PLANTA 3", [
      this.tilesetFundo,
      this.tilesetDecorative,
      this.tilesetTerrain,
      this.tilesetWithFloor,
      this.tilesetFloor,
    ]);

    this.layerMinerio1 = this.tilemap.createLayer("MINERIO 1", [
      this.tilesetFundo,
      this.tilesetDecorative,
      this.tilesetTerrain,
      this.tilesetWithFloor,
      this.tilesetFloor,
    ]);

    this.layerMatocomolhos = this.tilemap.createLayer("MATO COM OLHOS", [
      this.tilesetFundo,
      this.tilesetDecorative,
      this.tilesetTerrain,
      this.tilesetWithFloor,
      this.tilesetFloor,
    ]);

    this.layerPlanta1 = this.tilemap.createLayer("PLANTA 1", [
      this.tilesetFundo,
      this.tilesetDecorative,
      this.tilesetTerrain,
      this.tilesetWithFloor,
      this.tilesetFloor,
    ]);

    this.player = this.physics.add.sprite(150, 600, "personagem", 0);

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

    /*
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
    */
    this.cameras.main.startFollow(this.player);

    this.player.setCollideWorldBounds(true);

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
        this.player.setVelocityX(0);
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
