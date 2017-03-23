MyGame.screens['high-scores'] = (function(game) {
	'use strict';

	function initialize() {
		document.getElementById('id-high-scores-back').addEventListener(
			'click',
			function() { game.showScreen('main-menu'); });
			MyGame.persistance.report();
	}

	function run() {
		MyGame.persistance.report();
    console.log('high scores Screen');
	}

	return {
		initialize : initialize,
		run : run
	};
}(MyGame.game));
