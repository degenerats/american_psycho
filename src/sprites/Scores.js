import Phaser from 'phaser'

export default class extends Phaser.Text {
  constructor({ game, x, y }) {
    super(game, x, y)

    // this.style.font = "22px Press Start 2P"
    // this._fontComponents.font = "22px Press Start 2P"
    // this._fontComponents.fontFamily = "Press Start 2P"
    // this._fontComponents.fontSize = "22px"
    // this._fontComponents.fontWeight = "normal"
    this.style.fill = "#555"
    this.setText("0")
    this.anchor.x = 1
  }

  addScore (num) {
    var currentScores = parseInt(this._text, 10)
    currentScores += num
    this.setText(""+currentScores)
  }

  reset () {
    this.setText("0")
  }

  update() {
    
  }
}
