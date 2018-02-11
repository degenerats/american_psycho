import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, floor, ladderHeight, platformHeight, platformWidth }) {
    super(game, x, y, asset);
    this.direction = floor % 2 === 0 ? "left" : "right";
    this.ladderHeight = ladderHeight;
    this.floor = floor;
    this.platformWidth = platformWidth;
    this.platformHeight = platformHeight;
    this.respawn = {
      "right": {
        x: x + -this.game.width/2 + this.platformWidth/2,
        y: y + -this.ladderHeight/2 - 36
      },
      "left": {
        x: x + this.game.width/2 - this.platformWidth/2,
        y: y + -this.ladderHeight/2 - 36
      }
    }
    this.init();
  }

  getRespawnPosition () {
    return this.respawn[this.direction]
  }

  update () {
  }

  init () {
    this.game.add.existing(this);
    this.game.physics.enable(this, Phaser.Physics.P2JS, true);
    this.body.dynamic = false;
    this.body.clearShapes()
    this.body.addPolygon(null, ...this.generatePolygonPoints());
    this.body.collideWorldBounds = true;
  }

  generatePolygonPoints () {
    switch(this.direction) {
      case 'right':
        return [
          -this.game.width/2, -this.ladderHeight/2,
          -this.game.width/2 + this.platformWidth,  -this.ladderHeight/2,
          this.game.width/2 - this.platformWidth, this.ladderHeight/2 - this.platformHeight,
          this.game.width/2, this.ladderHeight/2 - this.platformHeight,
          this.game.width/2, this.ladderHeight/2,
          -this.game.width/2, this.ladderHeight/2
        ]
      case 'left':
        return [
          this.game.width/2, -this.ladderHeight/2,
          this.game.width/2 - this.platformWidth,  -this.ladderHeight/2,
          -this.game.width/2 + this.platformWidth, this.ladderHeight/2 - this.platformHeight,
          -this.game.width/2, this.ladderHeight/2 - this.platformHeight,
          -this.game.width/2, this.ladderHeight/2,
          this.game.width/2, this.ladderHeight/2
        ]
    }
  }
}
