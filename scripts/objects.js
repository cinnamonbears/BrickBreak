let Objects = (function(){
  let that = {};

  function Paddle(spec){
    console.log(spec)
    let that = {};
    let x = spec.x;
    let y = spec.y;
    let height = spec.height;
    let width = spec.width;
    let speed = spec.speed;

    that.getDimensions = function(){
      return {x, y, width, height};
    }

    that.shrinkPaddle = function(){
      width = width/2;
    }

    that.moveLeft = function(time){
      if(x >= 0){
        x -= speed*(time / 1000);
      }
    }

    that.moveRight = function(time){
      if(x <= 1000-width){
        x += speed*(time / 1000);
      }
    }

    that.updateSize = function(){
      console.log('size')
    }

    return that;
  }

  function Ball(spec){
    let that = {};
    let x = spec.x;
    let y = spec.y;
    let xSpeed = spec.xSpeed;
    let ySpeed = spec.ySpeed;
    let width = spec.width;
    let height = spec.height;
    let velocity = spec.velocity;
    let left = true;
    let up = true;
    let ballImage = spec.image;

    that.update = function(movement){
      spec.location += movement
    }

    that.updateStartLocation =  function(paddle){
      x = paddle.x+paddle.width/2;
    }

    that.getDimensions = function(){
      return {x, y, width, height, xSpeed, ySpeed, left, ballImage};
    }

    that.updateSpeed = function(xS, yS){
      xSpeed = xS;
      ySpeed = yS;
    }

    that.updateBallLoacation = function(elapsedTime){
      if(left){
        x -= xSpeed * velocity*(elapsedTime/1000);
      }else{
        x += xSpeed * velocity*(elapsedTime/1000);
      }if(up){
        y -= ySpeed * velocity * (elapsedTime/1000);
      }else{
        y += ySpeed *  velocity * (elapsedTime/1000);
      }
    }
    that.reverseX = function(){
      left ? left = false : left= true;
    }
    that.reverseY = function(){
      up ? up = false : up = true;
    }

    return that;
  }

  function Brick(spec){
    let that = {};
    let x = spec.x;
    let y = spec.y;
    let width = spec.width;
    let height = spec.height;
    let visible = spec.visible;
    let brickImage =spec.image;

    that.getVisible = function(){
      return visible;
    }

    that.getDimensions = function(){
      return {x, y, width, height, brickImage};
    }

    that.update = function(){
      visible = false;
    }

    return that;
  }

  return{
    Paddle: Paddle,
    Ball: Ball,
    Brick: Brick
  }
}());
