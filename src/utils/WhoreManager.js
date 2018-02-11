import Whore from '../sprites/Whore';
import { reject } from 'lodash';
import { randomItem } from '../utils';

export default class WhoreManager {
  constructor (game, opt) {
  	this.game = game.game;
  	this.floor = opt.floor;
  	this.ladders = opt.ladders;
  	this.positions = opt.positions || [0, 0];
  	this.stats = {
  		killed: 0,
  		away: 0 
  	}
  }

  start () {
  	this.addWhore();
  }

  getWhores () {
  	return this.currentWhore;
  }

  getKilled () {
  	return this.stats.killed;
  }

  getAway () {
  	return this.stats.away;
  }

  addWhore () {
  	const randomLadder = randomItem(this.ladders);
  	const floor = randomLadder.floor;
  	const position = randomLadder.getRespawnPosition();
  	const direction = randomLadder.direction;
  	const laddersGroup = game.physics.p2.createCollisionGroup();
  	const whoreGroup = game.physics.p2.createCollisionGroup();
  	const whore = new Whore({
      game: this.game,
      asset: 'whore',
      x: position.x,
      y: position.y,
      direction: direction
    });

    whore.init()

    game.physics.p2.setImpactEvents(true);

    game.physics.p2.restitution = 0;

    const laddersNext = reject(this.ladders, (ladder) => ladder.floor < floor)
    
    whore.body.setCollisionGroup(whoreGroup);

    laddersNext.push(this.floor)
    laddersNext.forEach( (ladder) => {
    	ladder.body.setCollisionGroup(laddersGroup);
    	ladder.body.collides(whoreGroup);
    });

    whore.checkWorldBounds = true;

    whore.body.collides(laddersGroup);

    whore.events.onOutOfBounds.add( () => whore.destroy(), this);

		let updaterGroup = null;

    const updater = (body) => {
    	if(body.sprite.floor > laddersNext[0].floor) {
    		whore.reverse();
    		laddersNext.shift();
    		whore.body.removeCollisionGroup(laddersGroup);
    		whore.body.removeCollisionGroup(updaterGroup);
    		updaterGroup = game.physics.p2.createCollisionGroup();
    		laddersNext.forEach( (ladder) => ladder.body.setCollisionGroup(updaterGroup) );
    		whore.body.collides([updaterGroup]);
    	}
    }

    whore.body.onBeginContact.add(updater, this);

    whore.events.onKilled.add(() => {
    	this.addWhore();
    	this.stats.killed += 1
    });

    whore.events.onDestroy.add(() => {
    	this.addWhore();
    	this.stats.away += 1;
    });

    this.currentWhore = whore;
  }
}