const Rows = (function(){

  function startSpining(iterations = TimeMaster.iterations){
    
    let that = this,
    movementDown = Number(that.element.css('top').replace('px', ''))+Number(that.element.css('height').replace('px', ''));

    if(iterations !== 0){

      that.element.animate({
        top: movementDown,
      }, 130, function(){

        that.setPositions($('#' + that.element.prop('id')).position().top, $('#' + that.element.prop('id')).position().left);
        if(that.position.top > 400){
          
          that.element.css({top: Stopper.aboveFirstRow});
          that.element.children().remove();
          that.element.append("<img src='images/" + Math.ceil(Math.random()*Math.ceil(6)) + ".png'></img>");
        }
        iterations--;

        if(iterations === 0){
          let img_number = that.element.children().first().prop('src').substr(-5, 1);
          let id = that.element.prop('id');

          if(that.position.top > (Stopper.thirdRow - 50) && that.position.top < (Stopper.bottom - 50)){
            grid.rows.third.push(img_number);
            grid.ids.third.push(id);
          }else if(that.position.top > (Stopper.secondRow - 50) && that.position.top < (Stopper.thirdRow - 50)){
            grid.rows.second.push(img_number);
            grid.ids.second.push(id);
          }else if(that.position.top > (Stopper.firstRow - 50) && that.position.top < (Stopper.secondRow - 50)){
            grid.rows.first.push(img_number);
            grid.ids.first.push(id);
          }

          if(that.element.prop('id') === 'row-1-col-5'){
            
            Bet.setCacheIncomingCash(Math.ceil(Animator.colectLines(grid) * Bet.getBet()));
            Animator.linghtWiningImages(grid.wining_ids);
            if(Bet.getCacheIncomingCash() !== 0){
              Animator.displayFreshCash(Bet.getCacheIncomingCash());
            }

            grid.rows.first = [];
            grid.rows.second = [];
            grid.rows.third = [];
            grid.ids.first = [];
            grid.ids.second = [];
            grid.ids.third = [];
            grid.wining_ids = [];
          }
        }

        that.startSpining(iterations);
      });
    }
  }

  function setPositions(top, left){
    this.position.top = top;
    this.position.left = left;

    return this;
  }
  
  const Rows = {};

  for(let i = 1; i <=5; i++){
    for(let j = 0; j <= 4; j++){
      let element = $("#row-"+`${j}`+"-col-"+`${i}`);

      Object.defineProperty(Rows, `row${j}col${i}`, {
        'value': {
          'element': element,
          'position': {
            'top': element.position().top,
            'left': element.position().left
          },
          'startSpining': startSpining,
          'setPositions': setPositions
        }
      });
    }
  }

  return Rows;
})();