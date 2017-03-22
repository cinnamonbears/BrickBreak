MyGame.screens['game-play'] = (function(game) {
	'use strict';

	function initialize() {
		document.getElementById('id-game-play-back').addEventListener(
		'click',
		function() {
      BrickBreak.quitGame();
			game.showScreen('main-menu');
		});
	}

	function run() {
    let startGame = null;
    startGame = BrickBreak.initialize();
	}

	return {
		initialize : initialize,
		run : run
	};
}(MyGame.game));
