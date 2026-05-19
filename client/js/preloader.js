class preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  init() {
    const bg = this.add.image(0, 0, "start").setOrigin(0);

    const scale = Math.min(
      this.cameras.main.width / bg.width,
      this.cameras.main.height / bg.height,
    );

    bg.setScale(scale);
    bg.postFX.addBlur(4);

    this.add.rectangle(400, 300, 468, 32).setStrokeStyle(1, 0xffffff);
    const bar = this.add.rectangle(400 - 230, 300, 4, 28, 0xffffff);

    this.load.on("progress", (progress) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.setPath("assets/");

    this.load.font("Rye-Regular", "Rye-Regular.ttf");
    this.load.image("start-background", "start-background.png");

    this.load.image("room-background", "room-background.png");

    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../js/rexvirtualjoystickplugin.min.js",
      true,
    );

    this.load.tilemapTiledJSON("map", "map.json");
    this.load.spritesheet("personagem", "parado.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("android-andandobaixo", "android-andandobaixo.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("android-andandocima", "android-andandocima.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("android-andandodireita", "android-andandodireita.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("android-andandoesquerda", "android-andandoesquerda.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("character-andandodireita", "character-andandodireita.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("character-andandoesquerda", "character-andandoesquerda.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("character-andandobaixo", "character-andandobaixo.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("character-andandocima", "character-andandocima.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("alien-down", "alienandandobaixo.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("alien-up", "alienandandocima.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("alien-right", "alienandandodireita.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("alien-left", "alienandandoesquerda.png", {
      frameWidth: 64,
      frameHeight: 64,
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
    this.load.spritesheet("engrenagem", "engrenagem.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("contadorBg", "contador.png");
    this.load.audio("music", "music.mp3");
    this.load.audio("laser", "laser.mp3");
    this.load.audio("passos", "passos.mp3");
  }

  create() {
    this.scene.stop("preloader");

    if (this.game.room) {
      this.scene.start("player");
    } else {
      this.scene.start("room");
    }
  }
}

export default preloader;
