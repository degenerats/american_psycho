import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.isReleased = false

    this.anchor.setTo(0.5)
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 0
    this.angle = 20  // Angle for test drop
    this.body.collideWorldBounds = true;
    this.body.bounce.y = 0.3;
    this.body.bounce.x = 0.5;

  }

  release (direction) {
    this.isReleased = true
    if (direction === "left") {
      this.body.velocity.setTo(-300, 100)
    }
    if (direction === "right") {
      this.body.velocity.setTo(300, 100)
    }
  }
  update() {
    if (this.isReleased) {
      this.body.gravity.y = 150
    }
  }
}
