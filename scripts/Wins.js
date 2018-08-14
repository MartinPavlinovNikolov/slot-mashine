var SlotMashine = SlotMashine || {};

(function(module){

  function activateWiningImages(){
    setWiningImagesIds();
  }

  function setImages(element){
    module.config.options().grid.cells[0].push($(element.children[1]));
    module.config.options().grid.cells[1].push($(element.children[0]));
    module.config.options().grid.cells[2].push($(element.lastElementChild));

    return module;
  }

  function displayFreshCash(){
    monney = (module.config.options().incoming_cash / 100).toFixed(2).toString();

    if(monney.substr(1, 1) == '.'){
      monney = '0' + monney;
    }

    $('body').append('<h2 id="remove-me" class="displayWiningCash">+ ' + monney + '!</h2>');

    return this;
  }

  function animateWiningCells(cellsIds){
    if(module.config.options().incoming_cash > 0){
      const length = cellsIds.length;

      displayFreshCash();

      for(let i = 0; i < length; i++){
        let element = $('#'+module.config.options().grid.ids[cellsIds[i]]);
        element.addClass('wining');
        if(i === (length - 1)){
          if(module.config.options().autoPlayOn === true){
            setTimeout(function(){
              module.publish('animateRellsEnd');
            }, module.config.options().timeControll.delayForWiningImagesAnimationOnAutoPlay);
          }else{
            module.publish('animateRellsEnd');
          }
        }
      }
    }else{
      module.publish('animateRellsEnd');
    }
    module.config.options().grid.ids = [];
  }

  function checkForWiningLines(){
    const images = [];
    const srcs = [];
    let winingMonney = 0;
    module.config.options().grid.cells[0].forEach(image => {
      images.push(image);
    });
    module.config.options().grid.cells[1].forEach(image => {
      images.push(image);
    });
    module.config.options().grid.cells[2].forEach(image => {
      images.push(image);
    });
    images.forEach(img=>{
      srcs.push(img.prop('src').substr(-5, 1));
      module.config.options().grid.ids.push(img.prop('id'));
    });

    module.config.options().incoming_cash = isMatch(srcs.join(''));
    winingIds = module.config.options().grid.winingIds;
    module.config.options().grid.winingIds = [];
    module.config.options().grid.cells = [[], [], []];

    animateWiningCells(winingIds);
  }

  function isMatch(
      imagesIds,
      firstRellSrc = null,
      prevSrcNumber = null,
      srcNumber = null,
      points = null,
      comingFromFirstRow = false,
      comingFromSecondRow = false,
      comingFromThirdRow = false,
      comingFromFirstRell = false,
      comingFromSecondRell = false,
      comingFromThirdRell= false,
      comingFromFourthRell = false
    ){

    const indexes = module.config.settings().rells === 5?[
      0, 5, 10, 1, 6, 11, 2, 7, 12, 3, 8, 13, 4, 9, 14
    ]:[
      0, 3, 6, 1, 4, 7, 2, 5, 8
    ];

    if(points === null){
      points = 0;
      let first = isMatch(imagesIds, indexes[0], indexes[0], imagesIds[indexes[0]], points, true, false, false, true) * module.config.options().koeficients.all[module.config.options().koeficients.current] * module.getBet();
      module.config.options().koeficients.current = 1;

      let second = isMatch(imagesIds, indexes[1], indexes[1], imagesIds[indexes[1]], points, false, true, false, true) * module.config.options().koeficients.all[module.config.options().koeficients.current] * module.getBet();
      module.config.options().koeficients.current = 1;

      let third = isMatch(imagesIds, indexes[2], indexes[2], imagesIds[indexes[2]], points, false, false, true, true) * module.config.options().koeficients.all[module.config.options().koeficients.current] * module.getBet();
      module.config.options().koeficients.current = 1;

      return Math.ceil(first + second + third);
    }else{

      //check first Rell vs second Rell
      if(comingFromFirstRell){
        module.config.options().koeficients.current = srcNumber;

        if(comingFromFirstRow){
          // Row #1, Rell #1 === Row #1, Rell #2
          if(srcNumber === imagesIds[indexes[3]]){
            points = isMatch(imagesIds, firstRellSrc, indexes[3], srcNumber, points, true, false, false, false, true);
          }
          // Row #1, Rell #1 === Row #2, Rell #2
          if(srcNumber === imagesIds[indexes[4]]){
            points = isMatch(imagesIds, firstRellSrc, indexes[4], srcNumber, points, false, true, false, false, true);
          }
        }

        if(comingFromSecondRow){
          // Row #2, Rell #1 === Row #1, Rell #2
          if(srcNumber === imagesIds[indexes[3]]){
            points = isMatch(imagesIds, firstRellSrc, indexes[3], srcNumber, points, true, false, false, false, true);
          }
          // Row #2, Rell #1 === Row #2, Rell #2
          if(srcNumber === imagesIds[indexes[4]]){
            points = isMatch(imagesIds, firstRellSrc, indexes[4], srcNumber, points, false, true, false, false, true);
          }
          // Row #2, Rell #1 === Row #3, Rell #2
          if(srcNumber === imagesIds[indexes[5]]){
            points = isMatch(imagesIds, firstRellSrc, indexes[5], srcNumber, points, false, false, true, false, true);
          }
        }

        if(comingFromThirdRow){
          // Row #3, Rell #1 === Row #2, Rell #2
          if(srcNumber === imagesIds[indexes[4]]){
            points = isMatch(imagesIds, firstRellSrc, indexes[4], srcNumber, points, false, true, false, false, true);
          }
          // Row #3, Rell #1 === Row #3, Rell #2
          if(srcNumber === imagesIds[indexes[5]]){
            points = isMatch(imagesIds, firstRellSrc, indexes[5], srcNumber, points, false, false, true, false, true);
          }
        }
      }

      //check second Rell vs third Rell
      if(comingFromSecondRell){
        module.config.options().koeficients.current = srcNumber;
        
        if(comingFromFirstRow){
          // Row #1, Rell #2 === Row #1, Rell #3
          if(srcNumber === imagesIds[indexes[6]]){
            points+= module.config.options().koeficients.points.forThreeLines;
            module.config.options().grid.winingIds.push(firstRellSrc);
            module.config.options().grid.winingIds.push(prevSrcNumber);
            module.config.options().grid.winingIds.push(indexes[6]);
            if(module.config.settings().rells === indexes[6]){

            points = isMatch(imagesIds, null, null, srcNumber, points, true, false, false, false, false, true);
            }
          }
          // Row #1, Rell #2 === Row #2, Rell #3
          if(srcNumber === imagesIds[indexes[7]]){
            points+= module.config.options().koeficients.points.forThreeLines;
            module.config.options().grid.winingIds.push(firstRellSrc);
            module.config.options().grid.winingIds.push(prevSrcNumber);
            module.config.options().grid.winingIds.push(indexes[7]);
            if(module.config.settings().rells === 5){

            points = isMatch(imagesIds, null, null, srcNumber, points, false, true, false, false, false, true);
            }
          }
        }
        if(comingFromSecondRow){
          // Row #2, Rell #2 === Row #1, Rell #3
          if(srcNumber === imagesIds[indexes[6]]){
            points+= module.config.options().koeficients.points.forThreeLines;
            module.config.options().grid.winingIds.push(firstRellSrc);
            module.config.options().grid.winingIds.push(prevSrcNumber);
            module.config.options().grid.winingIds.push(indexes[6]);
            if(module.config.settings().rells === 5){

            points = isMatch(imagesIds, null, null, srcNumber, points, true, false, false, false, false, true);
            }
          }
          // Row #2, Rell #2 === Row #2, Rell #3
          if(srcNumber === imagesIds[indexes[7]]){
            points+= module.config.options().koeficients.points.forThreeLines;
            module.config.options().grid.winingIds.push(firstRellSrc);
            module.config.options().grid.winingIds.push(prevSrcNumber);
            module.config.options().grid.winingIds.push(indexes[7]);
            if(module.config.settings().rells === 5){

            points = isMatch(imagesIds, null, null, srcNumber, points, false, true, false, false, false, true);
            }
          }
          // Row #2, Rell #2 === Row #2, Rell #3
          if(srcNumber === imagesIds[indexes[8]]){
            points+= module.config.options().koeficients.points.forThreeLines;
            module.config.options().grid.winingIds.push(firstRellSrc);
            module.config.options().grid.winingIds.push(prevSrcNumber);
            module.config.options().grid.winingIds.push(indexes[8]);
            if(module.config.settings().rells === 5){

            points = isMatch(imagesIds, null, null, srcNumber, points, false, false, true, false, false, true);
            }
          }
        }
        if(comingFromThirdRow){
          // Row #3, Rell #2 === Row #2, Rell #3
          if(srcNumber === imagesIds[indexes[7]]){
            points+= module.config.options().koeficients.points.forThreeLines;
            module.config.options().grid.winingIds.push(firstRellSrc);
            module.config.options().grid.winingIds.push(prevSrcNumber);
            module.config.options().grid.winingIds.push(indexes[7]);
            if(module.config.settings().rells === 5){

            points = isMatch(imagesIds, null, null, srcNumber, points, false, true, false, false, false, true);
            }
          }
          // Row #3, Rell #2 === Row #2, Rell #3
          if(srcNumber === imagesIds[indexes[8]]){
            points+= module.config.options().koeficients.points.forThreeLines;
            module.config.options().grid.winingIds.push(firstRellSrc);
            module.config.options().grid.winingIds.push(prevSrcNumber);
            module.config.options().grid.winingIds.push(indexes[8]);
            if(module.config.settings().rells === 5){

            points = isMatch(imagesIds, null, null, srcNumber, points, false, false, true, false, false, true);
            }
          }
        }
      }

      //check third Rell vs fourth Rell
      if(comingFromThirdRell){
        module.config.options().koeficients.current = srcNumber;
        
        if(comingFromFirstRow){
          // Row #1, Rell #3 === Row #1, Rell #4
          if(srcNumber === imagesIds[indexes[9]]){
            points+= module.config.options().koeficients.points.forFourLines - module.config.options().koeficients.points.forThreeLines;
            module.config.options().grid.winingIds.push(indexes[9]);
            points = isMatch(imagesIds, null, null, srcNumber, points, true, false, false, false, false, false, true);
          }
          // Row #1, Rell #3 === Row #2, Rell #4
          if(srcNumber === imagesIds[indexes[10]]){
            points+= module.config.options().koeficients.points.forFourLines - module.config.options().koeficients.points.forThreeLines;
            module.config.options().grid.winingIds.push(indexes[10]);
            points = isMatch(imagesIds, null, null, srcNumber, points, false, true, false, false, false, false, true);
          }
        }
        if(comingFromSecondRow){
          // Row #2, Rell #3 === Row #1, Rell #4
          if(srcNumber === imagesIds[indexes[9]]){
            points+= module.config.options().koeficients.points.forFourLines - module.config.options().koeficients.points.forThreeLines;
            module.config.options().grid.winingIds.push(indexes[9]);
            points = isMatch(imagesIds, null, null, srcNumber, points, true, false, false, false, false, false, true);
          }
          // Row #2, Rell #3 === Row #2, Rell #4
          if(srcNumber === imagesIds[indexes[10]]){
            points+= module.config.options().koeficients.points.forFourLines - module.config.options().koeficients.points.forThreeLines;
            module.config.options().grid.winingIds.push(indexes[10]);
            points = isMatch(imagesIds, null, null, srcNumber, points, false, true, false, false, false, false, true);
          }
          // Row #2, Rell #3 === Row #2, Rell #4
          if(srcNumber === imagesIds[indexes[11]]){
            points+= module.config.options().koeficients.points.forFourLines - module.config.options().koeficients.points.forThreeLines;
            module.config.options().grid.winingIds.push(indexes[11]);
            points = isMatch(imagesIds, null, null, srcNumber, points, false, false, true, false, false, false, true);
          }
        }
        if(comingFromThirdRow){
          // Row #3, Rell #3 === Row #2, Rell #4
          if(srcNumber === imagesIds[indexes[10]]){
            points+= module.config.options().koeficients.points.forFourLines - module.config.options().koeficients.points.forThreeLines;
            module.config.options().grid.winingIds.push(indexes[10]);
            points = isMatch(imagesIds, null, null, srcNumber, points, false, true, false, false, false, false, true);
          }
          // Row #3, Rell #3 === Row #2, Rell #4
          if(srcNumber === imagesIds[indexes[11]]){
            points+= module.config.options().koeficients.points.forFourLines - module.config.options().koeficients.points.forThreeLines;
            module.config.options().grid.winingIds.push(indexes[11]);
            points = isMatch(imagesIds, null, null, srcNumber, points, false, false, true, false, false, false, true);
          }
        }
      }

      //check fourth Rell vs fiveth Rell
      if(comingFromFourthRell){
        module.config.options().koeficients.current = srcNumber;
        
        if(comingFromFirstRow){
          // Row #1, Rell #4 === Row #1, Rell #5
          if(srcNumber === imagesIds[indexes[12]]){
            points+= module.config.options().koeficients.points.forFiveLines - module.config.options().koeficients.points.forFourLines;
            module.config.options().grid.winingIds.push(indexes[12]);
          }
          // Row #1, Rell #4 === Row #2, Rell #5
          if(srcNumber === imagesIds[indexes[13]]){
            points+= module.config.options().koeficients.points.forFiveLines - module.config.options().koeficients.points.forFourLines;
            module.config.options().grid.winingIds.push(indexes[13]);
          }
        }
        if(comingFromSecondRow){
          // Row #2, Rell #4 === Row #1, Rell #5
          if(srcNumber === imagesIds[indexes[12]]){
            points+= module.config.options().koeficients.points.forFiveLines - module.config.options().koeficients.points.forFourLines;
            module.config.options().grid.winingIds.push(indexes[12]);
          }
          // Row #2, Rell #4 === Row #2, Rell #5
          if(srcNumber === imagesIds[indexes[13]]){
            points+= module.config.options().koeficients.points.forFiveLines - module.config.options().koeficients.points.forFourLines;
            module.config.options().grid.winingIds.push(indexes[13]);
          }
          // Row #2, Rell #4 === Row #2, Rell #5
          if(srcNumber === imagesIds[indexes[14]]){
            points+= module.config.options().koeficients.points.forFiveLines - module.config.options().koeficients.points.forFourLines;
            module.config.options().grid.winingIds.push(indexes[14]);
          }
        }
        if(comingFromThirdRow){
          // Row #3, Rell #4 === Row #2, Rell #5
          if(srcNumber === imagesIds[indexes[13]]){
            points+= module.config.options().koeficients.points.forFiveLines - module.config.options().koeficients.points.forFourLines;
            module.config.options().grid.winingIds.push(indexes[13]);
          }
          // Row #3, Rell #4 === Row #2, Rell #5
          if(srcNumber === imagesIds[indexes[14]]){
            points+= module.config.options().koeficients.points.forFiveLines - module.config.options().koeficients.points.forFourLines;
            module.config.options().grid.winingIds.push(indexes[14]);
          }
        }
      }

      return points;
    }
  }

  module.setImages = setImages;
  module.checkForWiningLines = checkForWiningLines;
  module.activateWiningImages = activateWiningImages;
})(SlotMashine);