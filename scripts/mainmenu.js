MyGame.screens['main-menu'] = (function(game) {
	'use strict';

	function initialize() {
		console.log('mainmenu init')
		document.getElementById('id-new-game').addEventListener(
			'click',
			function() {game.showScreen('game-play'); });

		document.getElementById('id-high-scores').addEventListener(
			'click',
			function() { game.showScreen('high-scores'); });

		document.getElementById('id-help').addEventListener(
			'click',
			function() { game.showScreen('help'); });

		document.getElementById('id-about').addEventListener(
			'click',
			function() { game.showScreen('about'); });
	}

	function run() {
    console.log('main menu')
	}

	return {
		initialize : initialize,
		run : run
	};
}(MyGame.game));
