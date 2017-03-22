MyGame.screens['high-scores'] = (function(game) {
	'use strict';

	function initialize() {
		document.getElementById('id-high-scores-back').addEventListener(
			'click',
			function() { game.showScreen('main-menu'); });
	}

	function run() {
    console.log('high scores');
	}

	return {
		initialize : initialize,
		run : run
	};
}(MyGame.game));
