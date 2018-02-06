import Phaser from 'phaser'

const MOVEMENT_SPEED = 3
const BOUNDS = 30  // paddings from left and right

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)

    // this.anchor.setTo(0.5)
    this.chainsaw = null
    this.direction = "right"
  }

  _isInBounds () {
    console.warn(((this.position.x >= BOUNDS) && (this.position.x <= game.width - this.width - BOUNDS)));
    return ((this.position.x >= BOUNDS) && (this.position.x <= game.width - this.width - BOUNDS))
  }

  takeChainsaw (chainsaw) {
    this.chainsaw = chainsaw
  }
  releaseChainsaw () {
    this.chainsaw.release(this.direction)
    this.chainsaw = null
  }

  moveLeft () {
    if (this._isInBounds()) {
      this.direction = "left"
      this.position.x -= MOVEMENT_SPEED
      if (this.chainsaw !== null) {
        this.chainsaw.position.x -= MOVEMENT_SPEED
      }
    }
  }
  moveRight () {
    if (this._isInBounds()) {
      this.direction = "right"
      this.position.x += MOVEMENT_SPEED
      if (this.chainsaw !== null) {
        this.chainsaw.position.x += MOVEMENT_SPEED
      }
    }
  }

  update() {
    
  }
}
