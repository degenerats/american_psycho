import Phaser from 'phaser'

const MOVEMENT_SPEED = 3

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.chainsaw = null
    this.direction = "right"
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true
  }

  takeChainsaw(chainsaw) {
    this.chainsaw = chainsaw
  }
  releaseChainsaw() {
    if (this.chainsaw !== null) {
      this.chainsaw.release(this.direction)
      this.chainsaw = null
    }
  }

  moveLeft() {
    this.direction = "left"
    this.position.x -= MOVEMENT_SPEED
    // this.body.velocity.x = -MOVEMENT_SPEED
    // this.body.acceleration.x = -2000
    if (this.chainsaw !== null) {
      this.chainsaw.position.x -= MOVEMENT_SPEED
    }
  }
  moveRight() {
    this.direction = "right"
    this.position.x += MOVEMENT_SPEED
    // this.body.velocity.x = MOVEMENT_SPEED
    // this.body.acceleration.x = 2000
    if (this.chainsaw !== null) {
      this.chainsaw.position.x += MOVEMENT_SPEED
    }
  }

  update() {

  }
}