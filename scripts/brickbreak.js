'use strict';

let BrickBreak = (function(){
  let that = {};
  let lives;
  let pause;
  let restart;
  let res;
  let paddle;
  let ball;
  let bricks;
  let myKeyboard;
  var lastTimeStamp;
  var curTime;
  let seconds;
  let gameOver;
  let columns;
  let rows;
  let score;
  let startHeight = 20;
  let rowBounds = [];
  let heights = 20;
  let images = ['Images/yellow.png', 'Images/orange.png', 'Images/blue.png', 'Images/green.png'];
  let ballPath = 'Images/hammer.png'


  function getInput(elapsedTime){
    myKeyboard.update(elapsedTime);
  }

  function startGame(){
    pause = false;
  }

  function stopGame(){
    pause = true;
  }

  function update(elapsedTime){
    gameOver = checkBounds(ball);
    if(gameOver){
      softReset();
    }
    if(pause){
      ball.updateStartLocation(paddle.getDimensions());
      if(seconds > 2){
        startGame();
      }
    }else{
      ball.updateBallLoacation(elapsedTime);
      checkPaddle(ball, paddle);
      checkBricks(ball, bricks, rowBounds, heights, columns);
    }
  }

  function softReset(){
    stopGame();
    lives-=1;
    gameOver = false;
    lastTimeStamp = performance.now();
    curTime = 0;
    seconds = 0;
    if(lives > 0){
      paddle = generatePaddle();
      ball = generateBall(paddle.getDimensions());
    }
  }

  that.quitGame = function(){
    restart = true;
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
    if(lives > 0){
      var elapsedTime = time - lastTimeStamp;
      curTime += elapsedTime;
      if(curTime > 1000){
        curTime -= 1000;
        seconds += 1;
        // console.log('seconds: ', seconds);
      }
      lastTimeStamp = time;
      getInput(elapsedTime);
      update(elapsedTime);
      render();
      if(!restart){
        requestAnimationFrame(gameLoop);
      }
    }
  }

  function generatePaddle(){
    paddle = Objects.Paddle({
      x: 450,
      y: 970,
      width: 250,
      height: 15,
      speed: 300
    });
    myKeyboard.registerCommand(KeyEvent.DOM_VK_A, paddle.moveLeft);
    myKeyboard.registerCommand(KeyEvent.DOM_VK_LEFT, paddle.moveLeft);
  	myKeyboard.registerCommand(KeyEvent.DOM_VK_D, paddle.moveRight);
  	myKeyboard.registerCommand(KeyEvent.DOM_VK_RIGHT, paddle.moveRight);
  	myKeyboard.registerCommand(KeyEvent.DOM_VK_SPACE, startGame);
    return paddle;
  }

  function generateBall(paddle){
    let ballImage = new Image();
    ballImage.isReady = false;
    ballImage.onload = function(){
      this.isReady = true;
    }
    ballImage.src = ballPath;
    ball = Objects.Ball({
      // x: 490,
      x: paddle.x+paddle.width/2,
      y: 950,
      xSpeed: 1,
      ySpeed: 1,
      width: 10,
      height: 10,
      velocity: 300,
      image: ballImage
    });
    return ball;
  }

  function generateBricks(r, c){
    bricks.length = 0;
    for(let row = 0; row < r; row++){
      bricks[row] = [];
      rowBounds[row] = startHeight+(row*heights);

      let brickImage = new Image();
      brickImage.isReady = false;
      brickImage.onload = function(){
        this.isReady = true;
      }
      if(row === 0 || row === 1){
        brickImage.src = images[0];
      }
      if(row === 2 || row === 3){
        brickImage.src = images[1];
      }
      if(row === 4 || row === 5){
        brickImage.src = images[2];
      }
      if(row === 6 || row === 7){
        brickImage.src = images[3];
      }

      for(let col  = 0; col < c; ++ col){
        bricks[row][col] = Objects.Brick({
          x: 5 + col*(res/c),
          y: startHeight+(row*heights),
          width: res/c - 5,
          height: heights - 5,
          visible: true,
          image: brickImage
        })
      }
    }
    console.log('row: ',rowBounds)
  }

  that.initialize = function(){
    Graphics.initialize();
    rows = 8;
    columns = 14;
    lives = 4;
    pause = true;
    restart = false;
    res = 1000;
    myKeyboard = MyInput.Keyboard();
    lastTimeStamp = performance.now();
    bricks = [];
    curTime = 0;
    seconds = 0;
    score = 0;
    gameOver = false;
    paddle =generatePaddle();
    ball = generateBall(paddle.getDimensions());
    generateBricks(rows, columns)
    requestAnimationFrame(gameLoop)
  }

  return that;
}());
