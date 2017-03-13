let Graphics = (function(){
  let that={};
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

  return that;
}());
