import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.isReleased = false

    this.anchor.setTo(0.5)
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 0
    // this.angle = 20  // Angle for test drop
    this.body.collideWorldBounds = true;
    this.body.bounce.x = 0.5;
  }

  release (direction) {
    this.isReleased = true
    if (direction === "left") {
      this.body.velocity.setTo(-300, 100)
    }
    if (direction === "right") {
      this.body.velocity.setTo(300, 100)
    }
  }

  crush () {
    console.warn("chainsaw destroyed");
    const PARTICLES_LIFETIME = 1000

    let crushPosition = {
      x: this.body.position.x,
      y: this.body.position.y
    }
    this.destroy()

    // Create crush particles; saw part
    var emitterSaw = game.add.emitter(crushPosition.x, crushPosition.y+35, 100);
    emitterSaw.makeParticles('saw_particle');
    emitterSaw.minParticleScale = 0.1;
    emitterSaw.maxParticleScale = 0.3;
    emitterSaw.start(true, PARTICLES_LIFETIME, null, 20);
    // Create crush particles; grip part
    var emitterGrip = game.add.emitter(crushPosition.x, crushPosition.y, 100);
    emitterGrip.makeParticles('grip_particle');
    emitterGrip.minParticleScale = 0.1;
    emitterGrip.maxParticleScale = 0.5;
    emitterGrip.start(true, PARTICLES_LIFETIME, null, 7);

    if (this.onCrush) {
      this.onCrush()
    }
  }

  update() {
    if (this.isReleased) {
      this.body.gravity.y = 150
    }
    if (this.body.onFloor()) {
      this.body.enable = false
      this.crush()
    }
  }
}
