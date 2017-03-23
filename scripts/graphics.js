let Graphics = (function(){
  let that = {};
  let context = null;

  function initialize() {
      let canvas = document.getElementById('canvas-main');
      context = canvas.getContext('2d');

      CanvasRenderingContext2D.prototype.clear = function() {
          this.save();
          this.setTransform(1, 0, 0, 1, 0, 0);
          this.clearRect(0, 0, canvas.width, canvas.height);
          this.restore();
      };
  }

  function clear(){
    context.clear();
  }

  function stroke(){
    context.stroke();
  }

  function drawOutline(size){
    context.beginPath();
    context.moveTo(0,40);
    context.lineTo(size-1, 40);
    context.lineTo(size-1, size-1);
    context.lineTo(0,size-1);
    context.closePath();
    context.lineWidth = 10
    context.stroke();
  }

  function drawLives(lives, image){
    context.save();
    for(let i = 0; i < lives; ++i){
      console.log(lives, 30+i*30, 0, 30, 10)
      context.drawImage(image, 20+i*90, 0, 80, 20);
    }
    context.restore();
  }

  function countDown(text){
    context.save();
    context.font = '500px Arial, sans-serif';
    context.fillStyle = 'rgba(150, 0, 0, 1)';
    context.strokeStyle = 'rgba(255, 0, 0, 1)';
    context.textBaseline = 'top';
    context.fillText(text, 333, 333);
    context.strokeText(text, 333, 333);

    context.restore();
  }
  function gameOver(text){
    context.save();
    context.font = '128px Arial, sans-serif';
    context.fillStyle = 'rgba(150, 0, 0, 1)';
    context.strokeStyle = 'rgba(255, 0, 0, 1)';
    context.textBaseline = 'top';
    context.fillText(text, 200, 333);
    context.strokeText(text, 200, 333);

    context.restore();
  }

  function drawBall(spec){
    context.save();
    context.drawImage(spec.ballImage, spec.x, spec.y, spec.width+10, spec.height+15);
    context.restore();
  }

  function drawPaddle(spec){
    context.save();
    context.drawImage(spec.paddleImage, spec.x, spec.y-20, spec.width+10, spec.height+40);
    context.restore();
  }

  function drawBrick(spec){
    context.save();
    context.drawImage(spec.brickImage, spec.x, spec.y, 1000/14 -5 , 15);
    context.restore();
  }

  function drawParticles(spec){
    console.log('drawParticles')
    context.save();
    context.drawImage(spec.image,
    spec.center.x - spec.size/2,
    spec.center.y - spec.size/2,
    spec.size, spec.size);
    context.restore();
  }

  return {
    initialize: initialize,
    drawOutline: drawOutline,
    drawPaddle: drawPaddle,
    drawBall: drawBall,
    drawBrick: drawBrick,
    drawParticles: drawParticles,
    drawLives: drawLives,
    clear: clear,
    countDown: countDown,
    gameOver: gameOver,
    stroke: stroke
  };
}());
