import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.isReleased = false

    this.anchor.setTo(0.5)
    // game.physics.enable(this, Phaser.Physics.ARCADE);
    game.physics.p2.enable(this, false)
    // this.body.angle = 30  // Angle for test drop
    // ! maybe will be needed to loads the polygon data (in future)
    // contra.body.clearShapes();
    // contra.body.loadPolygon('physicsData', 'contra2');

  }

  release (direction, velocity) {
    this.isReleased = true
    if (direction === "left") {
      this.body.velocity.x = velocity
      this.body.velocity.y = 100
    }
    if (direction === "right") {
      this.body.velocity.x = velocity
      this.body.velocity.y = 100
    }
  }
  update() {
    if (this.isReleased) {
      game.physics.p2.gravity.y = 150
    }
  }
}
