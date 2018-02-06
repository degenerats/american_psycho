/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Whore from '../sprites/Whore'
import Chainsaw from '../sprites/Chainsaw'
import ChainsawP2 from '../sprites/ChainsawP2'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'American Psycho'
    let banner = this.add.text(this.world.centerX, 20, bannerText, {
      font: '22px Press Start 2P',
      fill: '#333',
      smoothed: false
    })
    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)

    // Arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE)
    // ArcadeP2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 0;
    game.physics.p2.restitution = 0.5;  // what is fucking restitution?

    // Player platform
    let platform = game.add.tileSprite(0, 100, this.game.width, 35, "mushroom");

    // let playerOpt = { width: 50, height: 70 }
    this.player = new Player({
      game: this.game,
      x: this.world.centerX - 50 / 2,
      y: 100 - 70,
      asset: 'player'
    })
    // let chainsawOpt = { width: 27, height: 55, angle: 20 }
    // this.chainsaw = new Chainsaw({
    //   game: this.game,
    //   x: this.world.centerX,
    //   y: 100,
    //   asset: 'chainsaw'
    // })
    this.chainsaw = new ChainsawP2({
        game: this.game,
        x: this.world.centerX,
        y: 100,
        asset: 'chainsaw'
      })
    this.player.takeChainsaw(this.chainsaw)

    this.game.add.existing(this.player)
    this.game.add.existing(this.chainsaw)


    // Добавляем шлюху
    this.christy = new Whore({
       game: this.game,
       x: this.world.centerX,
       y: this.world.height,
       asset: 'player',
       width: 50,
       height: 70
    });
    this.christy.init()

    // register 'space' key
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // // Waiting for player push 'space'
    this.spaceKey.onDown.add(this.player.releaseChainsaw, this.player);

    console.warn(this.leftKey);
  }

  update () {
    if (this.rightKey.isDown) {
      this.player.moveRight()
    }
    if (this.leftKey.isDown) {
      this.player.moveLeft()
    }

    // game.physics.arcade.collide(this.chainsaw, this.christy, this.hitting, null, this);

    // if (this.chainsawReleased) {
    //   this.chainsaw.position.y += 5;
    // }

    // console.warn(this.chaisaw.angle);
    // // 0
    // // if (this.chaisaw.angle < this.o.angle) {
    // //   this.chaisaw.angle--
    // // } else if (this.chaisaw.angle > -this.o.angle) {
    // //   this.chaisaw.angle++
    // // }
    // if (this.chaisaw.angle <= this.o.angle) {
    //   this.chaisaw.angle++
    // } else if (this.chaisaw.angle >= -this.o.angle) {
    //   this.chaisaw.angle--
    // }
  }

  hitting () {
    console.warn("hit!");
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
