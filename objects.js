let Objects = (function(){
  let that = {};

  function Paddle(spec){
    console.log(spec)
    let that = {};
    let x = spec.x;
    let y = spec.y;
    let height = spec.height;
    let width = spec.width;

    that.getDimensions = function(){
      return {x, y, width, height};
    }

    that.moveLeft = function(time){
      if(x >= 0){
        x -= 200*(time / 1000);
      }
    }

    that.moveRight = function(time){
      if(x <= 1000-width){
        x += 200*(time / 1000);
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
    let speed = 0;

    that.update = function(movement){
      spec.location += movement
    }

    return that;
  }

  function Brick(spec){
    let that = {};
    let x = spec.x;
    let y = spec.y;
    let width = spec.width;
    let height = spec.height;
    let exists = true;

    that.update = function(broken){
      if(broken){
        exists = false;
      }
    }
  }

  return{
    Paddle: Paddle,
    Ball: Ball,
    Brick: Brick
  }
}());
