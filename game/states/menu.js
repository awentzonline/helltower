
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var img = this.game.add.sprite(0, 0, 'title');
    // var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    // this.titleText = this.game.add.text(this.game.world.centerX, 300, 'Hell Tower: The Game', style);
    // this.titleText.anchor.setTo(0.5, 0.5);

    // this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    // this.instructionsText.anchor.setTo(0.5, 0.5);
    this.game.input.keyboard.onDownCallback = function () {
      this.game.state.start('play');
    };
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;
