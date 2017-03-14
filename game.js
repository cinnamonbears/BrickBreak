'use strict';

let BrickBreak = (function(){
  let that = {};
  let res = 1000;
  let paddle;
  let myKeyboard = MyInput.Keyboard();
  var lastTimeStamp = performance.now();

  function getInput(elapsedTime){
    console.log('getInput');
    myKeyboard.update(elapsedTime);

  }

  function update(){
    console.log('update');
  }

  function render(){
    Graphics.clear();
    Graphics.drawPaddle(paddle.getDimensions());
    Graphics.drawOutline(res);
    console.log('render');
  }

  function gameLoop(time){
    var elapsedTime = time - lastTimeStamp;
    lastTimeStamp = time;
    getInput(elapsedTime);
    update();
    render();
    requestAnimationFrame(gameLoop);
  }

  that.initialize = function(){
    Graphics.initialize();
    paddle = Objects.Paddle({
      x: 450,
      y: 970,
      width: 80,
      height: 10
    });
    myKeyboard.registerCommand(KeyEvent.DOM_VK_A, paddle.moveLeft);
  	myKeyboard.registerCommand(KeyEvent.DOM_VK_D, paddle.moveRight);
    console.log(paddle)
    requestAnimationFrame(gameLoop)
  }

  return that;
}());
