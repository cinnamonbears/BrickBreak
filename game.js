'use strict';

let BrickBreak = (function(){
  let that = {};

  function getInput(){
    console.log('getInput');
  }

  function update(){
    console.log('update');
  }

  function render(){
    console.log('render');
  }

  function gameLoop(time){
    getInput();
    update();
    render();
    requestAnimationFrame(gameLoop);
  }

  function initialize(){
    Graphics.initialize();
    requestAnimationFrame(gameLoop)
  }
  return that;
}());
