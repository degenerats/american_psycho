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
  	this.laddersGroups = this.createLadderGroups();
  	this.floorGroup = this.createFloorGroup();
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

  createLadderGroups () {
  	return this.ladders.map( (ladder) => {
  		const group = game.physics.p2.createCollisionGroup();
  		ladder.body.setCollisionGroup(group);
  		group.floor = ladder.floor;
  		return group;
  	})
  }

  createFloorGroup () {
  	const group = game.physics.p2.createCollisionGroup();
  	this.floor.body.setCollisionGroup(group)
  	return group;
  }

  addWhore () {
  	const randomLadder = randomItem(this.ladders);
  	const floor = randomLadder.floor;
  	const position = randomLadder.getRespawnPosition();
  	const direction = randomLadder.direction;
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

    const laddersNext = reject(this.laddersGroups, (ladderGroup) => ladderGroup.floor < floor)
    
    whore.body.setCollisionGroup(whoreGroup);

    laddersNext.push(this.floor);
    this.ladders.forEach( (ladder) => {
    	ladder.body.collides(whoreGroup);
    });

    whore.checkWorldBounds = true;

    whore.body.collides(this.laddersGroups.slice(floor - 1));

    // console.log(game.physics.p2.collisionGroups)

    whore.events.onOutOfBounds.add( () => {
      // game.physics.p2.reset()
      game.physics.p2.collisionGroups = reject(game.physics.p2.collisionGroups, (group) => group.mask === whoreGroup.mask)
    	whore.destroy();
      game.physics.p2._collisionGroupID = 16;
    }, this);

    let currentFloor = floor;

    const updater = (body) => {
    	if(body === null) return;
      console.log(body)
    	if(body.sprite.floor > currentFloor) {
    		whore.reverse();
        currentFloor = body.sprite.floor;
    		whore.body.removeCollisionGroup(this.laddersGroups);
    		whore.body.collides(this.laddersGroups.slice(body.sprite.floor - 1));
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