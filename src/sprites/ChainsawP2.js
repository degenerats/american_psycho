import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.isReleased = false

    this.anchor.setTo(0.5)
    game.physics.p2.enable(this, false)
    game.physics.p2.updateBoundsCollisionGroup()
    this.body.angle = 70  // Angle for test drop
    // ! maybe will be needed to loads the polygon data (in future)
    // contra.body.clearShapes();
    // contra.body.loadPolygon('physicsData', 'contra2');
    game.add.existing(this)
    this.body.data.gravityScale = 0

    // this.body.onBeginContact.add(() => {
    //   this.enable = false
    //   this.crush()
    // }, this)
  }

  release (direction, velocity) {
    this.isReleased = true
    if (direction === "left") {
      this.body.velocity.x = velocity
      this.body.velocity.y = 100
    }
    if (direction === "right") {
      this.body.velocity.x = velocity
      this.body.velocity.y = 100
    }
  }

  crush() {
    console.warn("chainsaw destroyed")
    const PARTICLES_LIFETIME = 1000

    let crushPosition = {
      x: this.position.x,
      y: this.position.y
    }
    this.destroy()

    // Create crush particles; saw part
    var emitterSaw = game.add.emitter(crushPosition.x, crushPosition.y + 35, 100);
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
      this.body.data.gravityScale = 0.25
    }
    // if (this.body.onFloor()) {
    //   this.body.enable = false
    //   this.crush()
    // }
  }
}
