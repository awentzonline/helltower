'use strict';

var Climber = require('../elements/climber');

function Play() {}

Play.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    var gameHeight = 10000;
    this.wall = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'wall0');
    this.wall.fixedToCamera = true;
    this.game.world.setBounds(0, 0, 800, gameHeight);
    
    this.player = new Climber(this.game, 200, gameHeight * 0.5, 'climber');   
    this.player.animations.add('climbUp', [0,1,2,3,4,5,6,7,8,9,10,11]); 
    this.player.animations.add('climbDown', [11,10,9,8,7,6,5,4,3,2,1,0]); 
    this.player.animations.add('climbRight', [0,1,2,1]); 
    this.player.animations.add('climbLeft', [0,11,10,11]); 
    this.game.add.existing(this.player);
    this.game.camera.follow(this.player);
  },
  update: function() {
    this.wall.tilePosition.y = -this.game.camera.view.top;
    this.updateKeyControls();
  },
  updateKeyControls: function () {
    var controls = this.player.controls;
    var keyboard = this.game.input.keyboard;
    controls.moveLeft = controls.moveRight = false;
    controls.moveLeft = keyboard.isDown(Phaser.Keyboard.A);
    controls.moveRight = keyboard.isDown(Phaser.Keyboard.D);
    controls.moveUp = keyboard.isDown(Phaser.Keyboard.W);
    controls.moveDown = keyboard.isDown(Phaser.Keyboard.S);
  },
  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;
