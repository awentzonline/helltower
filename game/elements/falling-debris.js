'use strict';

function FallingDebris(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);
  game.physics.enable(this, Phaser.Physics.ARCADE);
}

FallingDebris.prototype = Object.create(Phaser.Sprite.prototype);
FallingDebris.prototype.constructor = FallingDebris;

module.exports = FallingDebris;
