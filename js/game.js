(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./actor":1}],3:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'helltower');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":4,"./states/gameover":5,"./states/menu":6,"./states/play":7,"./states/preload":8}],4:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],5:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],6:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX, 300, 'Hell Tower: The Game', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],7:[function(require,module,exports){
'use strict';

var Climber = require('../elements/climber');

function Play() {}

Play.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.wall = this.game.add.sprite(0, 0, 'wall0');

    this.player = new Climber(this.game, 200, 200, 'climber');   
    this.player.animations.add('climbUp', [0,1,2,3,4,5,6,7,8,9,10,11]); 
    this.player.animations.add('climbDown', [11,10,9,8,7,6,5,4,3,2,1,0]); 
    this.player.animations.add('climbRight', [0,1,2,1]); 
    this.player.animations.add('climbLeft', [0,11,10,11]); 
    this.game.add.existing(this.player);
  },
  update: function() {
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

},{"../elements/climber":2}],8:[function(require,module,exports){

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

},{}]},{},[3])