var SlotMashine = SlotMashine || {};

(function(module){

  function startSpining(iterations = module.config.options().spiningAnimationsIterations){
    let that = this,
    movementDown = Number(that.element.css('top').replace('px', ''))+Number(that.element.css('height').replace('px', ''));

    if(iterations !== 0){

      that.element.animate({
        top: movementDown,
      }, module.config.options().movementDown, function(){
        that.setPositions($('#' + that.element.prop('id')).position().top, $('#' + that.element.prop('id')).position().left);
        if(that.position.top > module.config.options().screenHeigth){
          that.element.css({top: $('#'+module.config.settings().elements.stoppers.aboveFirstRow).position().top});
          that.element.children().remove();
          that.element.append("<img src='images/" + Math.ceil(Math.random()*Math.ceil(6)) + ".png'></img>");
        }
        iterations--;

        if(iterations === 0){
          let img_number = that.element.children().first().prop('src').substr(-5, 1);
          let id = that.element.prop('id');
          if(that.position.top > ($('#'+module.config.settings().elements.stoppers.thirdRow).position().top - 50) && that.position.top < ($('#'+module.config.settings().elements.stoppers.bottom).position().top - 50)){
            module.config.options().grid.rows.third.push(img_number);
            module.config.options().grid.ids.third.push(id);
          }else if(that.position.top > ($('#'+module.config.settings().elements.stoppers.secondRow).position().top - 50) && that.position.top < ($('#'+module.config.settings().elements.stoppers.thirdRow).position().top - 50)){
            module.config.options().grid.rows.second.push(img_number);
            module.config.options().grid.ids.second.push(id);
          }else if(that.position.top > ($('#'+module.config.settings().elements.stoppers.firstRow).position().top - 50) && that.position.top < ($('#'+module.config.settings().elements.stoppers.secondRow).position().top - 50)){
            module.config.options().grid.rows.first.push(img_number);
            module.config.options().grid.ids.first.push(id);
          }

          if(that.element.prop('id') === module.config.options().grid.lastAnimatedElementId){
//auto-play is turn on?
alert('end');
if(module.config.options().is_auto_play === true){
  module.autoPlay.start();
}
            module.setCacheIncomingCash(Math.ceil(colectLines(module.config.options().grid) * module.getBet()));
            linghtWiningImages(module.config.options().grid.winingIds);
            
            if(module.getCacheIncomingCash() !== 0){
              displayFreshCash(module.getCacheIncomingCash());
            }

            module.config.options({
              'grid': {
                'rows': {
                  'first': [],
                  'second': [],
                  'third': []
                },
                'ids': {
                  'first': [],
                  'second': [],
                  'third': []
                },
                'winingIds': []
              }
            });
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

  function spin(col = 1){
    setTimeout(function(){
      if(col <= module.config.options().grid.colsNumber){
        let row = module.config.options().grid.rowsNumber - 1;
        while(row >= 0){
          module.rows[`row${row}col${col}`].startSpining();
          row--;
        }
        col++;
        spin(col);
      }
    }, module.config.options().timeControll.rotateNextColumn);
  }

  function linghtWiningImages(ids){
    for(let id of ids){
      let target = $('#' + id).children().first();
      target.addClass('wining');
      setTimeout(function(){
        target.removeClass('wining');
      }, module.config.options().timeControll.linghtWiningImages);
    }
    return this;
  }

  function displayFreshCash(monney){
    monney = (monney / 100).toFixed(2).toString();
    if(monney.substr(1, 1) == '.'){
      monney = '0' + monney;
    }
    $('body').append('<h2 id="remove-me" class="displayWiningCash">+ ' + monney + '!</h2>');
    setTimeout(function(){
      $('#remove-me').remove();
    }, module.config.options().timeControll.displayFreshCash);
    return this;
  }
  
  function colectLines(arg){
    const CaschePositions = {
      '_1_1': arg.rows.first[0],
      '_1_2': arg.rows.first[1],
      '_1_3': arg.rows.first[2],
      '_1_4': arg.rows.first[3],
      '_1_5': arg.rows.first[4],
      '_2_1': arg.rows.second[0],
      '_2_2': arg.rows.second[1],
      '_2_3': arg.rows.second[2],
      '_2_4': arg.rows.second[3],
      '_2_5': arg.rows.second[4],
      '_3_1': arg.rows.third[0],
      '_3_2': arg.rows.third[1],
      '_3_3': arg.rows.third[2],
      '_3_4': arg.rows.third[3],
      '_3_5': arg.rows.third[4]
    };
    const CascheIds = {
      '_1_1': arg.ids.first[0],
      '_1_2': arg.ids.first[1],
      '_1_3': arg.ids.first[2],
      '_1_4': arg.ids.first[3],
      '_1_5': arg.ids.first[4],
      '_2_1': arg.ids.second[0],
      '_2_2': arg.ids.second[1],
      '_2_3': arg.ids.second[2],
      '_2_4': arg.ids.second[3],
      '_2_5': arg.ids.second[4],
      '_3_1': arg.ids.third[0],
      '_3_2': arg.ids.third[1],
      '_3_3': arg.ids.third[2],
      '_3_4': arg.ids.third[3],
      '_3_5': arg.ids.third[4]  
    };

    function hasMaches(points = null, row = null, key = null, first_col_cache){
      
      if(points === null){
        
        let first = hasMaches(0, CaschePositions._1_1, '_1_1') * module.config.options().koeficients.current;
        module.config.options().koeficients.current = 0;
        let second = hasMaches(0, CaschePositions._2_1, '_2_1') * module.config.options().koeficients.current;
        module.config.options().koeficients.current = 0;
        let third = hasMaches(0, CaschePositions._3_1, '_3_1') * module.config.options().koeficients.current;
        module.config.options().koeficients.current = 0;
        return first + second + third;
      }

    //check first vs second cols
      // Row #1, Col #1 === Row #1, Col #2
      if(key === Object.keys(CaschePositions)[0] && row === CaschePositions._1_2){
        points =  hasMaches(points, CaschePositions._1_2, '_1_2', CascheIds[Object.keys(CaschePositions)[0]]);
      }
      // Row #1, Col #1 === Row #2, Col #2
      if(key === Object.keys(CaschePositions)[0] && row === CaschePositions._2_2){
        points =  hasMaches(points, CaschePositions._2_2, '_2_2', CascheIds[Object.keys(CaschePositions)[0]]);
      }

      // Row #2, Col #1 === Row #1, Col #2
      if(key === Object.keys(CaschePositions)[5] && row === CaschePositions._1_2){
        points =  hasMaches(points, CaschePositions._1_2, '_1_2', CascheIds[Object.keys(CaschePositions)[5]]);
      }
      // Row #2, Col #1 === Row #2, Col #2
      if(key === Object.keys(CaschePositions)[5] && row === CaschePositions._2_2){
        points =  hasMaches(points, CaschePositions._2_2, '_2_2', CascheIds[Object.keys(CaschePositions)[5]]);
      }
      // Row #2, Col #1 === Row #3, Col #2
      if(key === Object.keys(CaschePositions)[5] && row === CaschePositions._3_2){
        points =  hasMaches(points, CaschePositions._3_2, '_3_2', CascheIds[Object.keys(CaschePositions)[5]]);
      }

      // Row #3, Col #1 === Row #2, Col #2
      if(key === Object.keys(CaschePositions)[10] && row === CaschePositions._2_2){
        points =  hasMaches(points, CaschePositions._2_2, '_2_2', CascheIds[Object.keys(CaschePositions)[10]]);
      }
      // Row #3, Col #1 === Row #3, Col #2
      if(key === Object.keys(CaschePositions)[10] && row === CaschePositions._3_2){
        points =  hasMaches(points, CaschePositions._3_2, '_3_2', CascheIds[Object.keys(CaschePositions)[10]]);
      }

    //check second vs third cols
      // Row #1, Col #2 === Row #1, Col #3
      if(key === Object.keys(CaschePositions)[1] && row === CaschePositions._1_3){
        module.config.options().grid.winingIds.push(first_col_cache);
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[1]]);
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[2]]);
        module.config.options().koeficients.current = module.config.options().koeficients.all[row];
        points =  hasMaches(points, CaschePositions._1_3, '_1_3') + 1;
      }
      // Row #1, Col #2 === Row #2, Col #3
      if(key === Object.keys(CaschePositions)[1] && row === CaschePositions._2_3){
        module.config.options().grid.winingIds.push(first_col_cache);
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[1]]);
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[7]]);
        module.config.options().koeficients.current = module.config.options().koeficients.all[row];
        points =  hasMaches(points, CaschePositions._2_3, '_2_3') + 1;
      }

      // Row #2, Col #2 === Row #1, Col #3
      if(key === Object.keys(CaschePositions)[6] && row === CaschePositions._1_3){
        module.config.options().grid.winingIds.push(first_col_cache);
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[6]]);
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[2]]);
        module.config.options().koeficients.current = module.config.options().koeficients.all[row];
        points =  hasMaches(points, CaschePositions._1_3, '_1_3') + 1;
      }
      // Row #2, Col #2 === Row #2, Col #3
      if(key === Object.keys(CaschePositions)[6] && row === CaschePositions._2_3){
        module.config.options().grid.winingIds.push(first_col_cache);
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[6]]);
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[7]]);
        module.config.options().koeficients.current = module.config.options().koeficients.all[row];
        points =  hasMaches(points, CaschePositions._2_3, '_2_3') + 1;
      }
      // Row #2, Col #2 === Row #3, Col #3
      if(key === Object.keys(CaschePositions)[6] && row === CaschePositions._3_3){
        module.config.options().grid.winingIds.push(first_col_cache);
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[6]]);
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[12]]);
        module.config.options().koeficients.current = module.config.options().koeficients.all[row];
        points =  hasMaches(points, CaschePositions._3_3, '_3_3') + 1;
      }

      // Row #3, Col #2 === Row #2, Col #3
      if(key === Object.keys(CaschePositions)[11] && row === CaschePositions._2_3){
        module.config.options().grid.winingIds.push(first_col_cache);
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[11]]);
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[7]]);
        module.config.options().koeficients.current = module.config.options().koeficients.all[row];
        points =  hasMaches(points, CaschePositions._2_3, '_2_3') + 1;
      }
      // Row #3, Col #2 === Row #3, Col #3
      if(key === Object.keys(CaschePositions)[11] && row === CaschePositions._3_3){
        module.config.options().grid.winingIds.push(first_col_cache);
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[11]]);
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[12]]);
        module.config.options().koeficients.current = module.config.options().koeficients.all[row];
        points =  hasMaches(points, CaschePositions._3_3, '_3_3') + 1;
      }

    //check third vs fourth cols
      // Row #1, Col #3 === Row #1, Col #4
      if(key === Object.keys(CaschePositions)[2] && row === CaschePositions._1_4){
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[3]]);
        points =  hasMaches(points, CaschePositions._1_4, '_1_4') + 2;
      }
      // Row #1, Col #3 === Row #2, Col #4
      if(key === Object.keys(CaschePositions)[2] && row === CaschePositions._2_4){
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[8]]);
        points =  hasMaches(points, CaschePositions._2_4, '_2_4') + 2;
      }

      // Row #2, Col #3 === Row #1, Col #4
      if(key === Object.keys(CaschePositions)[7] && row === CaschePositions._1_4){
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[3]]);
        points =  hasMaches(points, CaschePositions._1_4, '_1_4') + 2;
      }
      // Row #2, Col #3 === Row #2, Col #4
      if(key === Object.keys(CaschePositions)[7] && row === CaschePositions._2_4){
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[8]]);
        points =  hasMaches(points, CaschePositions._2_4, '_2_4') + 2;
      }
      // Row #2, Col #3 === Row #3, Col #4
      if(key === Object.keys(CaschePositions)[7] && row === CaschePositions._3_4){
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[13]]);
        points =  hasMaches(points, CaschePositions._3_4, '_3_4') + 2;
      }

      // Row #3, Col #3 === Row #2, Col #4
      if(key === Object.keys(CaschePositions)[12] && row === CaschePositions._2_4){
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[8]]);
        points =  hasMaches(points, CaschePositions._2_4, '_2_4') + 2;
      }
      // Row #3, Col #3 === Row #3, Col #4
      if(key === Object.keys(CaschePositions)[12] && row === CaschePositions._3_4){
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[13]]);
        points =  hasMaches(points, CaschePositions._3_4, '_3_4') + 2;
      }

    //check fourth vs fiveth cols
      // Row #1, Col #4 === Row #1, Col #5
      if(key === Object.keys(CaschePositions)[3] && row === CaschePositions._1_5){
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[4]]);
        points =  hasMaches(points, CaschePositions._1_5, '_1_5') + 3;
      }
      // Row #1, Col #4 === Row #2, Col #5
      if(key === Object.keys(CaschePositions)[3] && row === CaschePositions._2_5){
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[9]]);
        points =  hasMaches(points, CaschePositions._2_5, '_2_5') + 3;
      }

      // Row #2, Col #4 === Row #1, Col #5
      if(key === Object.keys(CaschePositions)[8] && row === CaschePositions._1_5){
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[4]]);
        points =  hasMaches(points, CaschePositions._1_5, '_1_5') + 3;
      }
      // Row #2, Col #4 === Row #2, Col #5
      if(key === Object.keys(CaschePositions)[8] && row === CaschePositions._2_5){
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[9]]);
        points =  hasMaches(points, CaschePositions._2_5, '_2_5') + 3;
      }
      // Row #2, Col #4 === Row #3, Col #5
      if(key === Object.keys(CaschePositions)[8] && row === CaschePositions._3_5){
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[14]]);
        points =  hasMaches(points, CaschePositions._3_5, '_3_5') + 3;
      }

      // Row #3, Col #4 === Row #2, Col #5
      if(key === Object.keys(CaschePositions)[13] && row === CaschePositions._2_5){
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[9]]);
        points =  hasMaches(points, CaschePositions._2_5, '_2_5') + 3;
      }
      // Row #3, Col #4 === Row #3, Col #5
      if(key === Object.keys(CaschePositions)[13] && row === CaschePositions._3_5){
        module.config.options().grid.winingIds.push(CascheIds[Object.keys(CaschePositions)[14]]);
        points =  hasMaches(points, CaschePositions._3_5, '_3_5') + 3;
      }

      return points;
    }

    return hasMaches();
  }

  module.spin = spin;
  module.rows = {};
  (function(){
    for(let i = 1; i <= module.config.options().grid.colsNumber; i++){
      for(let j = 0; j <= (module.config.options().grid.colsNumber - 1); j++){
        let element = $("#row-"+`${j}`+"-col-"+`${i}`);

        Object.defineProperty(module.rows, `row${j}col${i}`, {
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
  })();

})(SlotMashine);