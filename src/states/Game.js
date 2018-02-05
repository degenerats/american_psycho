/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Whore from '../sprites/Whore'

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

    // this.mushroom = new Mushroom({
    //   game: this.game,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // })
    // this.game.add.existing(this.mushroom)

    this.chainsawReleased = false

    game.physics.startSystem(Phaser.Physics.ARCADE)

    // Player platform
    let platform = game.add.tileSprite(0, 100, this.game.width, 35, "mushroom");

    let playerOpt = {
      width: 50,
      height: 70
    }
    let player = game.add.tileSprite(
      this.world.centerX - playerOpt.width / 2,
      100 - playerOpt.height,
      playerOpt.width,
      playerOpt.height,
      "player"
    )
    this.player = player

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

    let chainsawOpt = {
      width: 27,
      height: 55,
      angle: 20
    }
    this.o = chainsawOpt
    let chainsaw = game.add.tileSprite(
      this.world.centerX - chainsawOpt.width / 2,
      100 - playerOpt.height + 40,
      chainsawOpt.width,
      chainsawOpt.height,
      "chainsaw"
    )
    game.physics.enable(chainsaw, Phaser.Physics.ARCADE);
    chainsaw.body.gravity.y = 0
    chainsaw.body.collideWorldBounds = true;
    chainsaw.body.bounce.y = 0.3;
    this.chainsaw = chainsaw



    // register 'space' key
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // // Waiting for player push 'space'
    this.spaceKey.onDown.add(this.releaseChainsaw, this);

    console.warn(this.leftKey);
  }

  update () {
    const MOVEMENT_SPEED = 3

    if (this.rightKey.isDown) {
      if (this.player.position.x <= this.game.width-50-50) {
        this.player.position.x += MOVEMENT_SPEED
        if (!this.chainsawReleased) {
          this.chainsaw.position.x += MOVEMENT_SPEED
        }
      }
    }
    if (this.leftKey.isDown) {
      if (this.player.position.x >= 50) {
        this.player.position.x -= MOVEMENT_SPEED
        if (!this.chainsawReleased) {
          this.chainsaw.position.x -= MOVEMENT_SPEED
        }
      }
    }

    game.physics.arcade.collide(this.chainsaw, this.christy, this.hitting, null, this);

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

  releaseChainsaw () {
    if (this.chainsawReleased !== true) {
      this.chainsawReleased = true
      this.chainsaw.body.gravity.y = 450
    }
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
