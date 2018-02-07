import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom',      'assets/images/mushroom2.png')
    this.load.image('player',        'assets/images/player.png')
    this.load.image('chainsaw',      'assets/images/chainsaw.png')
    this.load.image('saw_particle',  'assets/images/cube.png')
    this.load.image('grip_particle', 'assets/images/chainsaw.png')
  }

  create () {
    this.state.start('Game')
  }
}
