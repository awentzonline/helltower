'use strict';

function FallingDebris(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.anchor.setTo(0.5, 0.5);
  this.rotation = Math.random() * 2 * Math.PI;
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.velocity.y = (1 + Math.random()) * 200;
  this.body.angularVelocity = 360 * 0.5; // degrees per second?
  this.body.acceleration.y = 800;
}

FallingDebris.prototype = Object.create(Phaser.Sprite.prototype);
FallingDebris.prototype.constructor = FallingDebris;

module.exports = FallingDebris;
