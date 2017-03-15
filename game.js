'use strict';

let BrickBreak = (function(){
  let that = {};
  let res = 1000;
  let paddle;
  let ball;
  let bricks = [];
  let myKeyboard = MyInput.Keyboard();
  var lastTimeStamp = performance.now();
  let gameOver = false;
  let columns = 0;
  let rows = 0;
  let startHeight = 200;
  let rowBounds = [];
  let heights = 20;

  function getInput(elapsedTime){
    myKeyboard.update(elapsedTime);
  }

  function update(elapsedTime){
    gameOver = checkBounds(ball);
    ball.updateBallLoacation(elapsedTime);
    checkPaddle(ball, paddle);
    checkBricks(ball, bricks, rowBounds, heights, columns);
    //console.log('update');
  }

  function render(){
    Graphics.clear();
    Graphics.drawPaddle(paddle.getDimensions());
    for(let row = 0; row< rows; row++){
      for(let col = 0; col < columns; col++){
        if(bricks[row][col].getVisible()){
          Graphics.drawBrick(bricks[row][col].getDimensions());
        }
      }
    }
    Graphics.drawBall(ball.getDimensions());
    Graphics.drawOutline(res);
  }

  function gameLoop(time){
    if(!gameOver){
      var elapsedTime = time - lastTimeStamp;
      lastTimeStamp = time;
      getInput(elapsedTime);
      update(elapsedTime);
      render();
      requestAnimationFrame(gameLoop);
    }
  }

  function generateBricks(r, c){
    bricks.length = 0;
    for(let row = 0; row < r; row++){
      bricks[row] = [];
      rowBounds[row] = startHeight+(row*heights);
      for(let col  = 0; col < c; ++ col){
        bricks[row][col] = Objects.Brick({
          x: col*(res/c),
          y: startHeight+(row*heights),
          width: res/c,
          height: heights,
          visible: true
        })
      }
    }
    console.log('row: ',rowBounds)
  }

  that.initialize = function(){
    Graphics.initialize();
    paddle = Objects.Paddle({
      x: 450,
      y: 970,
      width: 100,
      height: 10
    });
    ball = Objects.Ball({
      x: 490,
      y: 950,
      width: 10,
      height: 10,
      velocity: 300
    });
    rows = 6;
    columns = 14;
    generateBricks(rows, columns)
    myKeyboard.registerCommand(KeyEvent.DOM_VK_A, paddle.moveLeft);
  	myKeyboard.registerCommand(KeyEvent.DOM_VK_D, paddle.moveRight);
    requestAnimationFrame(gameLoop)
  }

  return that;
}());
