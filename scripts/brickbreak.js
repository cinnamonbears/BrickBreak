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
  let halfPaddle;
  let myKeyboard;
  var lastTimeStamp;
  var curTime;
  let seconds;
  let gameOver;
  let columns;
  let rows;
  let score = 0;
  let curScore = 0;
  let brickCount = 0;
  let curBalls = [];
  let startHeight = 200;
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

  function checkCurScore(){
    if(curScore >= 100){
      console.log('over 100')
      curScore -=100;
      ball = generateBall(paddle.getDimensions());
      curBalls.push(ball);
    }
  }

  function increaseSpeed(b){
    if(brickCount === 4 && b.getMultipler === 0.5){
      console.log('increaseSpeed');
    }
  }

  function setScore(){
    console.log('doing something')
  }

  function update(elapsedTime){
    for(let i = 0; i < curBalls.length; ++i){
        gameOver = checkBounds(curBalls[i]);
        if(gameOver){
          curBalls.splice(i, 1);
        }
        gameOver = false;
    }
    if(curBalls.length < 1){
      softReset();
    }
    if(pause){
      ball.updateStartLocation(paddle.getDimensions());
      if(seconds > 2){
        startGame();
      }
    }else{
      for(let i = 0; i < curBalls.length; ++i){
        curBalls[i].updateBallLoacation(elapsedTime);
        checkPaddle(curBalls[i], paddle);
        let info = checkBricks(curBalls[i], bricks, rowBounds, heights, columns);
        score += info.score;
        curScore += info.score;
        if(info.score != 0){
          brickCount += 1;
        }
        checkCurScore(curBalls[i]);
        if(halfPaddle === false){
          if(info.row === 5){
            paddle.shrinkPaddle();
            halfPaddle = true;
          }
        }
      }
    }
  }

  function softReset(){
    stopGame();
    lives-=1;
    gameOver = false;
    lastTimeStamp = performance.now();
    curTime = 0;
    seconds = 0;
    curScore = 0;
    brickCount = 0;
    curBalls.length = 0;
    if(lives > 0){
      paddle = generatePaddle();
      if(halfPaddle){
        paddle.shrinkPaddle();
      }
      ball = generateBall(paddle.getDimensions());
      curBalls[0] = ball;
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
    for(let i = 0; i < curBalls.length; ++i){
      Graphics.drawBall(curBalls[i].getDimensions());
    }
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
      speed: 400
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
    console.log(paddle.x);
    console.log(paddle.width);
    console.log(2);
    ball = Objects.Ball({
      x: paddle.x+paddle.width/2,
      y: 950,
      xSpeed: 1,
      ySpeed: 1,
      width: 10,
      height: 10,
      velocity: 300,
      multiplier: 0.5,
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
      let value;
      if(row === 0 || row === 1){
        brickImage.src = images[0];
        value = 5;
      }
      if(row === 2 || row === 3){
        brickImage.src = images[1];
        value = 3;
      }
      if(row === 4 || row === 5){
        brickImage.src = images[2];
        value = 2;
      }
      if(row === 6 || row === 7){
        brickImage.src = images[3];
        value = 25;
      }

      for(let col  = 0; col < c; ++ col){
        bricks[row][col] = Objects.Brick({
          x: 5 + col*(res/c),
          y: startHeight+(row*heights),
          width: res/c - 5,
          height: heights - 5,
          visible: true,
          image: brickImage,
          value: value
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
    curScore = 0;
    gameOver = false;
    halfPaddle = false;
    brickCount = 0;
    paddle =generatePaddle();
    ball = generateBall(paddle.getDimensions());
    curBalls[0] = ball;
    generateBricks(rows, columns)
    requestAnimationFrame(gameLoop)
  }

  return that;
}());
