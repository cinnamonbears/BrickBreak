function checkBounds(ball){
  let b = ball.getDimensions();
  if(b.x < 0 || b.x+b.width > 1000){
    ball.reverseX();
  }
  if(b.y < 0){
    ball.reverseY();
  }
  if(b.y > 1000){
    console.log('Gameover')
    return true;
  }
  return false;
}

function setSpeed(mid, half, p){
  console.log('Half:  ', half, 'mid: ', mid, ' Width: ', p)
  let s = Math.abs(mid - p);
  s = Math.abs(s - half);
  s = s/half + 1;
  return s;

}

function checkPaddle(ball, paddle){
  let b = ball.getDimensions();
  let p = paddle.getDimensions();

  if(b.y+b.height >= p.y && b.y+b.height <= p.y +p.height){
    if(b.x < p.x+p.width && b.x+b.width > p.x){
      ball.reverseY();
      let thirds = p.width/3;
      let half   = p.width/2;
      let mid    = b.x + b.width/2;
      if((mid < p.x+half && !(b.left)) || (mid > p.x+half && b.left)){
        ball.reverseX();
      }
      let s = setSpeed(mid, half, p.x);
      console.log(s)
      if(mid < p.x +thirds){
        ball.updateSpeed(Math.min(2, s), 1);
      }else if(mid < p.x + 2*thirds && mid > p.x + thirds){
        ball.updateSpeed(0.25, 1.7);
      }else{
        ball.updateSpeed(Math.min(2, s), 1);
      }

    }
  }

}

function checkBricks(ball, bricks, r, heights, columns){
  let b = ball.getDimensions();
  for(let i =0; i < r.length; i++){
    if(b.y > r[i] && b.y < r[i]+ heights){//} || b.y+b.height > ){
      for(let j = 0; j<columns; j++){
        if(bricks[i][j].getVisible()){
          brick = bricks[i][j].getDimensions();
          if(!((b.x > brick.x+brick.width) || (brick.x > b.x+b.width) ||(b.y > brick.y+brick.height) ||(brick.y > b.y+b.height))){
            if(b.x <= brick.x+brick.width && b.x >= brick.x){
              bricks[i][j].update();
              ball.reverseY();
            }
          }
        }
      }
    }
  }
}
