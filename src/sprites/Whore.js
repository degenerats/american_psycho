import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.velocityX = 300;
  }

  update () {
    if(this.body.onWall()) {
      this.velocityX = -this.velocityX;
    }
    this.body.velocity.x = this.velocityX;
  }

  init () {
    this.game.add.existing(this);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
  }
}
