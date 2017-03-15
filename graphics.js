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
    context.moveTo(0,0);
    context.lineTo(size-1, 0);
    context.lineTo(size-1, size-1);
    context.lineTo(0,size-1);
    context.closePath();
    context.lineWidth = 10
    //context.strokeStyle = 'rgb(196,82,211)';
    //context.stroke();
  }

  function drawBall(spec){
    context.rect(spec.x, spec.y, spec.width, spec.height);
    //context.drawImage(spec.image, spec.x, spec.y, spec.width, spec.height);
    context.lineWidth = 3;
    context.stroke();
  }

  function drawPaddle(spec){
    context.rect(spec.x, spec.y, spec.width, spec.height);
    context.lineWidth = 5;
    context.stroke();
  }

  function drawBrick(spec){
    context.beginPath();
    context.moveTo(spec.x, spec.y);
    context.lineTo(spec.x+spec.width, spec.y);
    context.lineTo(spec.x+spec.width, spec.y+spec.height);
    context.lineTo(spec.x, spec.y+spec.height);
    context.closePath();
    // context.rect(spec.x, spec.y, spec.width, spec.height);
    context.lineWidth = 3;
    context.stroke();
    //console.log('brick')
  }

  return {
    initialize: initialize,
    drawOutline: drawOutline,
    drawPaddle: drawPaddle,
    drawBall: drawBall,
    drawBrick: drawBrick,
    clear: clear,
    stroke: stroke
  };
}());
