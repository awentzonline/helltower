'use strict';

var Actor = require('./actor').Actor;

function Climber(game, x, y, key, frame) {
  Actor.call(this, game, x, y, key, frame);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.lateralSpeed = 200;
  this.upSpeed = 200;
  this.downSpeed = 400;
  this.upAnimationFps = 20;
  this.downAnimationFps = 30;
  this.lateralAnimationFps = 15;
}

Climber.prototype = Object.create(Actor.prototype);
Climber.prototype.constructor = Climber;

Climber.prototype.update = function () {
  Actor.prototype.update.call(this);
  // handle movement
  var controls = this.controls;
  var xDir = controls.moveLeft ? -1 : 0;
  xDir += controls.moveRight ? 1 : 0;
  var yDir = controls.moveUp ? -1 : 0;
  yDir += controls.moveDown ? 1 : 0;
  var ySpeed = yDir < 0 ? yDir * this.upSpeed : yDir * this.downSpeed;
  this.body.velocity.setTo(xDir * this.lateralSpeed, ySpeed);
  if (yDir > 0) { // going down
    this.animations.play('climbDown', this.downAnimationFps);
  } else if (yDir < 0) { // going up
    this.animations.play('climbUp', this.upAnimationFps);
  } else {
    if (xDir < 0) { // going left
      this.animations.play('climbLeft', this.lateralAnimationFps);
    } else if (xDir > 0) { // going right
      this.animations.play('climbRight', this.lateralAnimationFps);  
    }
  }
}

module.exports = Climber;
