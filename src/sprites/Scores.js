import Phaser from 'phaser'

export default class extends Phaser.Text {
  constructor({ game, x, y, text, style }) {
    super(game, x, y, text, style)

    this.setText("0")
    this.anchor.x = 1

    game.add.existing(this)
  }

  addScore (num) {
    var currentScores = parseInt(this._text, 10)
    currentScores += parseInt(num, 10)
    this.setText(""+currentScores)
  }

  createScoresHint (x, y, num) {
    this.hint = this.game.add.text(x, y, `+${num}`, {
      font: '18px Press Start 2P',
      fill: '#333',
      smoothed: false
    })
  }

  reset () {
    this.setText("0")
  }

  update() {
    if (this.hint) {
      this.hint.position.y -= 1
      if ((this.hint.alpha - 0.02) <= 0) {
        this.hint.alpha = 0
        this.hint.destroy()
        this.hint = undefined
      } else {
        this.hint.alpha -= 0.02
      }
    }
  }
}
