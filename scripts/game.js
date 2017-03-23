var MyGame = {
  screens :{},
  persistance : (function() {
    var bbHighScores = {},
        previousScores = localStorage.getItem('MyGame.bbHighScores'),
        curHighScores = [];
    if(previousScores !== null){
      bbHighScores = JSON.parse(previousScores);
    }
    function add(key, value) {
  		bbHighScores[key] = value;
  		localStorage['MyGame.bbHighScores'] = JSON.stringify(bbHighScores);
  	}

  	function remove(key) {
  		delete bbHighScores[key];
  		localStorage['MyGame.bbHighScores'] = JSON.stringify(bbHighScores);
  	}

    function sortByHighScore(){
      curHighScores.length = 0;
      for(key in bbHighScores){
        curHighScores.push(bbHighScores[key]);
      }
      curHighScores.sort(sortNumber);
      if(curHighScores.length > 5){
        while(curHighScores.length > 5){
          curHighScores.splice(curHighScores.length-1,1);
        }
      }
    }

    function sortNumber(a, b){
      return b - a;
    }

  	function report() {
      sortByHighScore()
  		var htmlNode = document.getElementById('bbHighScores'),
  			key;
  		htmlNode.innerHTML = '';
  		for (key in curHighScores) {
  			htmlNode.innerHTML += (' Score: ' + curHighScores[key] + '<br/>');
  		}
  		htmlNode.scrollTop = htmlNode.scrollHeight;
  	}


    return {
      add: add,
      remove : remove,
      report : report,
      sortByHighScore : sortByHighScore
    }
  }())
}

MyGame.game = (function(screens) {
  'use strict';

  function showScreen(id){
    var screen = 0,
        active = null;

        active = document.getElementsByClassName('active');
        for(screen = 0; screen < active.length; screen++){
          active[screen].classList.remove('active');
        }
        screens[id].run();
        document.getElementById(id).classList.add('active');
  }

  function initialize() {
    var screen = null;
    for(screen in screens){
      if(screens.hasOwnProperty(screen)) {
        screens[screen].initialize();
      }
    }
    showScreen('main-menu');
  }
  return{
    initialize : initialize,
    showScreen: showScreen
  }
}(MyGame.screens));
