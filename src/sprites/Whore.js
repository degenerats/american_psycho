import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.velocityX = 0;
  }

  update () {
    this.body.velocity.x = this.velocityX;
    if(this.body.onFloor()) {
      this.run();
    }
  }

  init () {
    this.game.add.existing(this);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 760;
    this.body.collideWorldBounds = true;
    this.body.onWorldBounds = new Phaser.Signal();
    this.body.onWorldBounds.add(this._handleExitSignal, this);
    return this;
  }

  run () {
    this.velocityX = -100;
  }

  exit () {
    this.destroy();
  }

  _handleExitSignal (sprite, up, down, left, right) {
    if (left) {
      this.exit();
    }
  }
}
