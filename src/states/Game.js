/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Chainsaw from '../sprites/Chainsaw'
import ChainsawP2 from '../sprites/ChainsawP2'
import Player from '../sprites/Player'
import Scores from '../sprites/Scores'
import Ladder from '../sprites/Ladder'
import WhoreManager from '../utils/WhoreManager'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    // let banner = this.add.text(this.world.centerX, 20, bannerText, {
    //   font: '22px Press Start 2P',
    //   fill: '#333',
    //   smoothed: false
    // })

    this.bgMusic = game.add.audio('bg');
    // this.bgMusic.play()
    this.bgMusic.volume = 0.4
    
    this.sounds = {}
    this.sounds.exp = game.add.audio('exp2');
    this.sounds.exp.volume = 0.15

    this.scores = new Scores({
      game: this.game,
      x: this.game.width - 10,
      y: 10
    })
    this.game.add.existing(this.scores)
    this.scores.createScoresHint(150, 150, 200)

    // Arcade physics
    game.physics.startSystem(Phaser.Physics.P2JS)
    game.physics.p2.gravity.y = 760;
    // ArcadeP2 physics
    // game.physics.startSystem(Phaser.Physics.P2JS);
    // game.physics.p2.gravity.y = 0;
    // game.physics.p2.restitution = 0.5;  // what is fucking restitution?
    // game.physics.p2.updateBoundsCollisionGroup();

    // Player platform
    let platform = game.add.tileSprite(0, 100, this.game.width, 35, "mushroom");
    game.physics.enable(platform, Phaser.Physics.ARCADE);
    platform.body.immovable = true

    // Лестничные пролеты
    const ladderHeight = 132;
    const platformWidth = 70;
    const platformHeight = 5;
    this.ladders = [1, 2, 3].map( (floor) => {
      return new Ladder({
        game: this.game,
        x: this.game.width / 2,
        y: (floor * (ladderHeight - platformHeight)) + 190,
        ladderHeight: ladderHeight,
        floor: floor,
        platformWidth: platformWidth,
        platformHeight: platformHeight
      });
    });

    // let playerOpt = { width: 50, height: 70 }
    this.player = new Player({
      game: this.game,
      x: this.world.centerX - 50 / 2,
      y: 100 - 70,
      // x: this.world.centerX,
      // y: 100,
      asset: 'player'
    })
    this.game.add.existing(this.player)
    this.takeNewChainsaw()
    
    // this.chainsawP2 = new ChainsawP2({
    //   game: this.game,
    //   x: this.world.centerX,
    //   y: 100,
    //   asset: 'chainsaw'
    // })
    // var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    // this.chainsawP2.body.setCollisionGroup(playerCollisionGroup)
    // this.player.constraint = game.physics.p2.createRevoluteConstraint(this.player, [0, -10], this.chainsawP2, [0, 10]);
    // // game.physics.p2.createSpring(this.player, this.chainsawP2, 100, 0, 5);
    // // game.physics.p2.createRotationalSpring(this.player, this.chainsawP2, 20, 100, 5)
    // 
    //
    //

    // Шлюхин менеджер
    const whoreOptions = {
      ladders: this.ladders
    }
    this.whoreManager = new WhoreManager({ game }, whoreOptions);
    this.whoreManager.start()

    // this.whoreManager.getWhores().body.clearCollision(this.ladder.body)

    // this.polygon = new Phaser.Polygon(points);
    // this.game.add.existing(this.polygon);

    // register 'space' key
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // // Waiting for player push 'space'
    this.spaceKey.onDown.add(this.player.releaseChainsaw, this.player);
  }

  update () {
    // this.player.body.setZeroVelocity();

    if (this.rightKey.isDown) {
      this.player.moveRight()
    }
    if (this.leftKey.isDown) {
      this.player.moveLeft()
    }

    game.physics.arcade.collide(this.chainsaw, this.whoreManager.getWhores(), this.hitting, null, this);
  }

  takeNewChainsaw () {
    this.chainsaw = new Chainsaw({
      game: this.game,
      x: this.player.position.x+25,
      y: this.player.position.y+70,
      asset: 'chainsaw'
    })
    this.player.takeChainsaw(this.chainsaw)
    this.chainsaw.onCrush = () => {
      this.sounds.exp.play()
      this.takeNewChainsaw()
    }
  }

  hitting () {
    console.warn("hit!")
    this.whoreManager.getWhores().kill()
    this.scores.addScore(this.scoresToAdd())
    this.chainsaw.destroy()
    this.takeNewChainsaw()
  }

  scoresToAdd() {
    var scoresToAdd = 0
    scoresToAdd = this.chainsaw.body.position.y * 100 / (this.game.height - 100)

    return scoresToAdd
  }

  render () {
    if (__DEV__) {
      ;
    }
  }
}
