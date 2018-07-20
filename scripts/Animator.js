const Animator = (function(){

  function spin(col = 1){

    setTimeout(function(){

      if(col <= 5){

        let row = 4;
        while(row >= 0){

          Animator.Rows[`row${row}col${col}`].startSpining();           
          row--;
        }
        col++;
        Animator.spin(col);
      }
    }, TimeMaster.spin);
  }

  function linghtWiningImages(ids){

    for(let id of ids){
      let target = $('#' + id).children().first();
      target.addClass('wining');
      setTimeout(function(){
        target.removeClass('wining');
      }, TimeMaster.linghtWiningImages);
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
    }, TimeMaster.displayFreshCash);

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
        
        let first = hasMaches(0, CaschePositions._1_1, '_1_1') * koeficent.current;
        koeficent.current = 0;
        let second = hasMaches(0, CaschePositions._2_1, '_2_1') * koeficent.current;
        koeficent.current = 0;
        let third = hasMaches(0, CaschePositions._3_1, '_3_1') * koeficent.current;
        koeficent.current = 0;
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
        grid.wining_ids.push(first_col_cache);
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[1]]);
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[2]]);
        koeficent.current = koeficent.avalible[row];
        points =  hasMaches(points, CaschePositions._1_3, '_1_3') + 1;
      }
      // Row #1, Col #2 === Row #2, Col #3
      if(key === Object.keys(CaschePositions)[1] && row === CaschePositions._2_3){
        grid.wining_ids.push(first_col_cache);
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[1]]);
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[7]]);
        koeficent.current = koeficent.avalible[row];
        points =  hasMaches(points, CaschePositions._2_3, '_2_3') + 1;
      }

      // Row #2, Col #2 === Row #1, Col #3
      if(key === Object.keys(CaschePositions)[6] && row === CaschePositions._1_3){
        grid.wining_ids.push(first_col_cache);
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[6]]);
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[2]]);
        koeficent.current = koeficent.avalible[row];
        points =  hasMaches(points, CaschePositions._1_3, '_1_3') + 1;
      }
      // Row #2, Col #2 === Row #2, Col #3
      if(key === Object.keys(CaschePositions)[6] && row === CaschePositions._2_3){
        grid.wining_ids.push(first_col_cache);
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[6]]);
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[7]]);
        koeficent.current = koeficent.avalible[row];
        points =  hasMaches(points, CaschePositions._2_3, '_2_3') + 1;
      }
      // Row #2, Col #2 === Row #3, Col #3
      if(key === Object.keys(CaschePositions)[6] && row === CaschePositions._3_3){
        grid.wining_ids.push(first_col_cache);
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[6]]);
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[12]]);
        koeficent.current = koeficent.avalible[row];
        points =  hasMaches(points, CaschePositions._3_3, '_3_3') + 1;
      }

      // Row #3, Col #2 === Row #2, Col #3
      if(key === Object.keys(CaschePositions)[11] && row === CaschePositions._2_3){
        grid.wining_ids.push(first_col_cache);
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[11]]);
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[7]]);
        koeficent.current = koeficent.avalible[row];
        points =  hasMaches(points, CaschePositions._2_3, '_2_3') + 1;
      }
      // Row #3, Col #2 === Row #3, Col #3
      if(key === Object.keys(CaschePositions)[11] && row === CaschePositions._3_3){
        grid.wining_ids.push(first_col_cache);
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[11]]);
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[12]]);
        koeficent.current = koeficent.avalible[row];
        points =  hasMaches(points, CaschePositions._3_3, '_3_3') + 1;
      }

    //check third vs fourth cols
      // Row #1, Col #3 === Row #1, Col #4
      if(key === Object.keys(CaschePositions)[2] && row === CaschePositions._1_4){
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[3]]);
        points =  hasMaches(points, CaschePositions._1_4, '_1_4') + 2;
      }
      // Row #1, Col #3 === Row #2, Col #4
      if(key === Object.keys(CaschePositions)[2] && row === CaschePositions._2_4){
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[8]]);
        points =  hasMaches(points, CaschePositions._2_4, '_2_4') + 2;
      }

      // Row #2, Col #3 === Row #1, Col #4
      if(key === Object.keys(CaschePositions)[7] && row === CaschePositions._1_4){
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[3]]);
        points =  hasMaches(points, CaschePositions._1_4, '_1_4') + 2;
      }
      // Row #2, Col #3 === Row #2, Col #4
      if(key === Object.keys(CaschePositions)[7] && row === CaschePositions._2_4){
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[8]]);
        points =  hasMaches(points, CaschePositions._2_4, '_2_4') + 2;
      }
      // Row #2, Col #3 === Row #3, Col #4
      if(key === Object.keys(CaschePositions)[7] && row === CaschePositions._3_4){
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[13]]);
        points =  hasMaches(points, CaschePositions._3_4, '_3_4') + 2;
      }

      // Row #3, Col #3 === Row #2, Col #4
      if(key === Object.keys(CaschePositions)[12] && row === CaschePositions._2_4){
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[8]]);
        points =  hasMaches(points, CaschePositions._2_4, '_2_4') + 2;
      }
      // Row #3, Col #3 === Row #3, Col #4
      if(key === Object.keys(CaschePositions)[12] && row === CaschePositions._3_4){
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[13]]);
        points =  hasMaches(points, CaschePositions._3_4, '_3_4') + 2;
      }

    //check fourth vs fiveth cols
      // Row #1, Col #4 === Row #1, Col #5
      if(key === Object.keys(CaschePositions)[3] && row === CaschePositions._1_5){
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[4]]);
        points =  hasMaches(points, CaschePositions._1_5, '_1_5') + 3;
      }
      // Row #1, Col #4 === Row #2, Col #5
      if(key === Object.keys(CaschePositions)[3] && row === CaschePositions._2_5){
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[9]]);
        points =  hasMaches(points, CaschePositions._2_5, '_2_5') + 3;
      }

      // Row #2, Col #4 === Row #1, Col #5
      if(key === Object.keys(CaschePositions)[8] && row === CaschePositions._1_5){
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[4]]);
        points =  hasMaches(points, CaschePositions._1_5, '_1_5') + 3;
      }
      // Row #2, Col #4 === Row #2, Col #5
      if(key === Object.keys(CaschePositions)[8] && row === CaschePositions._2_5){
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[9]]);
        points =  hasMaches(points, CaschePositions._2_5, '_2_5') + 3;
      }
      // Row #2, Col #4 === Row #3, Col #5
      if(key === Object.keys(CaschePositions)[8] && row === CaschePositions._3_5){
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[14]]);
        points =  hasMaches(points, CaschePositions._3_5, '_3_5') + 3;
      }

      // Row #3, Col #4 === Row #2, Col #5
      if(key === Object.keys(CaschePositions)[13] && row === CaschePositions._2_5){
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[9]]);
        points =  hasMaches(points, CaschePositions._2_5, '_2_5') + 3;
      }
      // Row #3, Col #4 === Row #3, Col #5
      if(key === Object.keys(CaschePositions)[13] && row === CaschePositions._3_5){
        grid.wining_ids.push(CascheIds[Object.keys(CaschePositions)[14]]);
        points =  hasMaches(points, CaschePositions._3_5, '_3_5') + 3;
      }

      return points;
    }

    return hasMaches();
  }

  return {
    spin,
    Rows,
    colectLines,
    linghtWiningImages,
    displayFreshCash
  };
})();