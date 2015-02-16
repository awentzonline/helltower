'use strict';

function FallingDebris(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.anchor.setTo(0.5, 0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  var emitter = this.game.add.emitter(x, y, 100);
  emitter.makeParticles('smoke');
  emitter.setXSpeed(-50, 50);
  emitter.setYSpeed(0, -200);
  emitter.setRotation(0, 0);
  emitter.setAlpha(0.1, 1, 3000);
  emitter.setScale(0.4, 2, 0.4, 2, 6000, Phaser.Easing.Quintic.Out);
  emitter.gravity = -300;
  emitter.start(false, 250, 1);
  emitter.emitX = 0;
  emitter.emitY = 0;
  this.smokeEmitter = emitter;
}

FallingDebris.prototype = Object.create(Phaser.Sprite.prototype);
FallingDebris.prototype.constructor = FallingDebris;

FallingDebris.prototype.reset = function (x, y) {
  Phaser.Sprite.prototype.reset.call(this, x, y);
  this.rotation = Math.random() * 2 * Math.PI;
  this.body.velocity.y = (1 + Math.random()) * 200;
  this.body.angularVelocity = (2 * Math.random() - 1.0) * 360; // degrees per second?
  this.body.acceleration.y = 800;
}

  
FallingDebris.prototype.update = function () {
  Phaser.Sprite.prototype.update.call(this);
  this.smokeEmitter.on = this.alive;
  this.smokeEmitter.x = this.x;
  this.smokeEmitter.y = this.y;
}

module.exports = FallingDebris;
