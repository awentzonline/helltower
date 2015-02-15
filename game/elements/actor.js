'use strict';


function ActorControls() {
  this.moveUp = false;
  this.moveDown = false;
  this.moveLeft = false;
  this.moveRight = false;
  this.moveJump = false;
}

function Actor(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.controls = new ActorControls();
}

Actor.prototype = Object.create(Phaser.Sprite.prototype);
Actor.prototype.constructor = Actor;

module.exports = {
  Actor: Actor,
  ActorControls: ActorControls
};
