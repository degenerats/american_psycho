import { randomItem } from '../utils';

export default class WhoreManager {
  constructor (game, opt) {
  	this.game = game.game;
  	this.positions = opt.positions || [0, 0];
  	this.whoreClass = opt.whoreClass;
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
  	const position = randomItem(this.positions);
  	const whore = new this.whoreClass({
       game: this.game,
       asset: 'whore',
       x: position.x,
       y: position.y
    });

    whore
    	.init()
    	.run()

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