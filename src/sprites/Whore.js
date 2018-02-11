import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, direction }) {
    super(game, x, y, asset);
    this.velocityX = direction === 'right' ? 300 : -300;
  }

  update () {
    this.body.velocity.x = this.velocityX;
  }

  init () {
    this.game.add.existing(this);
    this.game.physics.enable(this, Phaser.Physics.P2JS, true);
    this.body.fixedRotation = true;
    this.body.collideWorldBounds = true;
    this.body.clearShapes();
    this.body.setCircle(32);
    return this;
  }

  reverse () {
    this.velocityX = -this.velocityX;
  }

  run () {
    this.velocityX = -100;
  }

  exit () {
    this.destroy();
  }

  _handleExitSignal (sprite, up, down, left, right) {
    console.log(up, down, left, right)
    if (left) {
      this.exit();
    }
    if (left) {
      this.run();
    }
  }
}
