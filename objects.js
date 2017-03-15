let Objects = (function(){
  let that = {};

  function Paddle(spec){
    console.log(spec)
    let that = {};
    let x = spec.x;
    let y = spec.y;
    let height = spec.height;
    let width = spec.width;
    let speed = 300;

    that.getDimensions = function(){
      return {x, y, width, height};
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
    let width = spec.width;
    let height = spec.height;
    let velocity = spec.velocity;
    let left = true;
    let up = true;

    that.update = function(movement){
      spec.location += movement
    }

    that.getDimensions = function(){
      return {x, y, width, height};
    }

    that.updateBallLoacation = function(elapsedTime){
      if(left){
        x -= velocity*(elapsedTime/1000);
      }else{
        x += velocity*(elapsedTime/1000);
      }if(up){
        y -= velocity*(elapsedTime/1000);
      }else{
        y += velocity*(elapsedTime/1000);
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

    that.getVisible = function(){
      return visible;
    }

    that.getDimensions = function(){
      return {x, y, width, height};
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
