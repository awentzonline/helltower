
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.spritesheet('climber', 'assets/banker_climb.png', 61, 150, 12);
    this.load.image('wall0', 'assets/wall0.png');
    this.load.image('chair0', 'assets/chair0.png');
    this.load.image('banker_falling', 'assets/banker_falling.png');
    this.load.image('title', 'assets/intro.jpg');
    this.load.image('smoke', 'assets/smoke-puff.png');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
