class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");
  }
  preload() {
    this.load.spritesheet("alien", "assets/alien.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    this.anims.create({
      key: "stand-still",
      frames: this.anims.generateFrameNumbers("alien", { start: 20, end: 20 }),
      frameRate: 1
    });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("alien", { start: 87, end: 95 }),
      frameRate: 10,
      repeat: -1,
    });

    this.alien = this.physics.add
      .sprite(400, 225, "alien", 20)
      .setInteractive()
      .on("pointerdown", () => {
        if (this.alien.body.velocity.x === 0) {
          this.alien.play("walk-right");
          this.alien.setVelocityX(100);
        } else {
          this.alien.play("stand-still");
          this.alien.setVelocityX(0);
        }
      });
  }
}

export default scene0;
