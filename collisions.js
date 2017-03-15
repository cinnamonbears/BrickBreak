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


function checkPaddle(ball, paddle){
  let b = ball.getDimensions();
  let p = paddle.getDimensions();

  if(b.y+b.height >= p.y){
    if(b.x < p.x+p.width && b.x+b.width > p.x){
      ball.reverseY();
      let mid = p.x+(p.width/2);

    }
  }

}

function checkBricks(ball, bricks, r, heights, columns){
  let b = ball.getDimensions();
  for(let i =0; i < r.length; i++){
    if(b.y >r[i] && b.y < r[i]+ heights){//} || b.y+b.height > ){
      for(let j = 0; j<columns; j++){
        if(bricks[i][j].getVisible()){
          console.log('here')
          brick = bricks[i][j].getDimensions();
          if(b.x <= brick.x+brick.width && b.x >= brick.x){
            console.log('destroy');
            bricks[i][j].update();
            ball.reverseY();
          }
        }
      }
    }
  }
}
