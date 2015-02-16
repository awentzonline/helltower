'use strict';

var Climber = require('../elements/climber');
var FallingDebris = require('../elements/falling-debris');

function Play() {}

Play.prototype = {
  create: function() {
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN
    ]);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    var gameHeight = 10000;
    this.wall = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'wall0');
    this.wall.fixedToCamera = true;
    this.game.world.setBounds(0, 0, 800, gameHeight);
    
    this.player = new Climber(this.game, 200, 300, 'climber');   
    this.player.animations.add('climbUp', [0,1,2,3,4,5,6,7,8,9,10,11]); 
    this.player.animations.add('climbDown', [11,10,9,8,7,6,5,4,3,2,1,0]); 
    this.player.animations.add('climbRight', [0,1,2,1]); 
    this.player.animations.add('climbLeft', [0,11,10,11]); 
    this.game.add.existing(this.player);
    this.game.camera.follow(this.player);

    this.debrisGroup = this.game.add.group();
    this.debrisMinDelay = 500;
    this.debrisMaxDelay = 1000;
    this.debrisCountdown = this.debrisMaxDelay;
  },
  update: function() {
    this.wall.tilePosition.y = -this.game.camera.view.top;
    // if (this.game.device.desktop && false) {
    //   this.updateKeyControls();
    // } else {
      this.updateTouchControls();
    // }
    this.updateDebris();
  },
  updateKeyControls: function () {
    var controls = this.player.controls;
    var keyboard = this.game.input.keyboard;
    controls.moveLeft = controls.moveRight = false;
    controls.moveLeft = keyboard.isDown(Phaser.Keyboard.LEFT);
    controls.moveRight = keyboard.isDown(Phaser.Keyboard.RIGHT);
    controls.moveUp = keyboard.isDown(Phaser.Keyboard.UP);
    controls.moveDown = keyboard.isDown(Phaser.Keyboard.DOWN);
  },
  updateTouchControls: function () {
    var controls = this.player.controls;
    var pointer = this.game.input.activePointer;
    if (pointer) {
      var epsilon = this.player.width * 0.25;
      controls.moveLeft = controls.moveRight = false;
      controls.moveLeft = pointer.worldX < this.player.x - epsilon;
      controls.moveRight = pointer.worldX > this.player.x + epsilon;
      controls.moveUp = pointer.worldY < this.player.y - epsilon;
      controls.moveDown = pointer.worldY > this.player.y + epsilon;
    }
  },
  updateDebris: function () {
    var dt = this.game.time.elapsed;
    this.debrisGroup.forEachAlive(function (debris) {
      // far below the camera?
      var camera = this.game.camera;
      if (debris.y > camera.view.bottom + camera.view.height) {
        debris.kill();
      }
    }, this);
    this.debrisCountdown -= dt;
    if (this.debrisCountdown <= 0) {
      var x = Math.random() * this.game.camera.view.width;
      var y = this.game.camera.view.top;
      var debris = this.debrisGroup.getFirstDead();
      if (!debris) {
        var types = ['chair0', 'banker_falling'];
        var frame;
        if (this.debrisGroup.total < 2) {  // make sure we get some variety
          frame = types[this.debrisGroup.total];
        } else {
          frame = types[Math.floor(Math.random() * types.length)];
        }
        var debris = new FallingDebris(this.game, x, y, frame);
        this.debrisGroup.add(debris);
      }
      debris.reset(x, y);
      this.debrisCountdown = this.debrisMinDelay + Math.random() * (this.debrisMaxDelay - this.debrisMinDelay);
    }
    this.game.physics.arcade.overlap(this.player, this.debrisGroup, function (player, debris) {
      this.game.state.start('gameover');
    }.bind(this));
  }
};

module.exports = Play;
