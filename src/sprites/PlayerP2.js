import Phaser from 'phaser'

const MOVEMENT_SPEED = 300

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)

    // this.anchor.setTo(0.5)
    game.physics.p2.enable(this, false)
    var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    this.body.setCollisionGroup(playerCollisionGroup)
    game.physics.p2.updateBoundsCollisionGroup()
    this.body.data.gravityScale = 0;
    this.body.setZeroDamping();
    this.body.setZeroVelocity();
    this.body.fixedRotation = true;
    this.chainsaw = null
    this.direction = "right"
  }

  takeChainsaw (chainsaw) {
    this.chainsaw = chainsaw
  }
  releaseChainsaw () {
    if (this.chainsaw !== null) {
      let velocity = -this.body.data.velocity[0]*50
      console.warn(velocity);
      game.physics.p2.removeConstraint(this.constraint)
      this.chainsaw.release(this.direction, velocity)
      this.chainsaw = null
    }
  }

  moveLeft () {
    this.direction = "left"
    this.body.thrustLeft(MOVEMENT_SPEED)
    // if (this.chainsaw !== null) {
    //   this.chainsaw.body.thrustLeft(MOVEMENT_SPEED)
    // }
  }
  moveRight () {
    this.direction = "right"
    this.body.thrustRight(MOVEMENT_SPEED)
    // if (this.chainsaw !== null) {
    //   this.chainsaw.body.thrustRight(MOVEMENT_SPEED)
    // }
  }

  update() {
    
  }
}
