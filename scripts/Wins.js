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
    setTimeout(function(){
      $('#remove-me').remove();
    }, 2000);

    return this;
  }

  function animateWiningCells(cellsIds){
    if(module.config.options().incoming_cash > 0){
      const length = cellsIds.length;

      displayFreshCash();

      for(let i = 0; i < length; i++){
        let element = $('#'+module.config.options().grid.ids[cellsIds[i]]);
        element.addClass('wining');
        setTimeout(function(){
          element.removeClass('wining');
          if(i === (length - 1)){
            module.publish('animateRellsEnd');
          }
        }, 2000);
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

  function isMatch(imagesIds, firstId = null, currentId = null, passedId = null, points = null, firstRow = false, secondRow = false, thirdRow = false, firstRell = false, secondRell = false, thirdRell= false, fourthRell = false){
    if(points === null){
      points = 0;
      let first = isMatch(imagesIds, 0, 0, imagesIds[0], points, true, false, false, true) * module.config.options().koeficients.all[module.config.options().koeficients.current];
      module.config.options().koeficients.current = 1;

      let second = isMatch(imagesIds, 5, 5, imagesIds[5], points, false, true, false, true) * module.config.options().koeficients.all[module.config.options().koeficients.current];
      module.config.options().koeficients.current = 1;

      let third = isMatch(imagesIds, 10, 10, imagesIds[10], points, false, false, true, true) * module.config.options().koeficients.all[module.config.options().koeficients.current];
      module.config.options().koeficients.current = 1;

      return Math.ceil(first + second + third);
    }else{

      //check first Rell vs second Rell
      if(firstRell === true){
        module.config.options().koeficients.current = passedId;

        if(firstRow === true){
          // Row #1, Rell #1 === Row #1, Rell #2
          if(passedId === imagesIds[1]){
            points = isMatch(imagesIds, firstId, 1, passedId, points, true, false, false, false, true);
            return points;
          }
          // Row #1, Rell #1 === Row #2, Rell #2
          if(passedId === imagesIds[6]){
            points = isMatch(imagesIds, firstId, 6, passedId, points, true, false, false, false, true);
            return points;
          }
        }

        if(secondRow){
          // Row #2, Rell #1 === Row #1, Rell #2
          if(passedId === imagesIds[1]){
            points = isMatch(imagesIds, firstId, 1, passedId, points, false, true, false, false, true);
            return points;
          }
          // Row #2, Rell #1 === Row #2, Rell #2
          if(passedId === imagesIds[6]){
            points = isMatch(imagesIds, firstId, 6, passedId, points, false, true, false, false, true);
            return points;
          }
          // Row #2, Rell #1 === Row #3, Rell #2
          if(passedId === imagesIds[11]){
            points = isMatch(imagesIds, firstId, 11, passedId, points, false, true, false, false, true);
            return points;
          }
        }

        if(thirdRow){
          // Row #3, Rell #1 === Row #2, Rell #2
          if(passedId === imagesIds[6]){
            points = isMatch(imagesIds, firstId, 6, passedId, points, false, false, true, false, true);
            return points;
          }
          // Row #3, Rell #1 === Row #3, Rell #2
          if(passedId === imagesIds[11]){
            points = isMatch(imagesIds, firstId, 11, passedId, points, false, false, true, false, true);
            return points;
          }
        }
      }

      //check second Rell vs third Rell
      if(secondRell === true){
        module.config.options().koeficients.current = passedId;
        
        if(firstRow){
          // Row #1, Rell #2 === Row #1, Rell #3
          if(passedId === imagesIds[2]){
            points+=2;
            module.config.options().grid.winingIds.push(firstId);
            module.config.options().grid.winingIds.push(currentId);
            module.config.options().grid.winingIds.push(2);
            points = isMatch(imagesIds, null, null, passedId, points, true, false, false, false, false, true);
            return points;
          }
          // Row #1, Rell #2 === Row #2, Rell #3
          if(passedId === imagesIds[7]){
            points+=2;
            module.config.options().grid.winingIds.push(firstId);
            module.config.options().grid.winingIds.push(currentId);
            module.config.options().grid.winingIds.push(7);
            points = isMatch(imagesIds, null, null, passedId, points, true, false, false, false, false, true);
            return points;
          }
        }
        if(secondRow){
          // Row #2, Rell #2 === Row #1, Rell #3
          if(passedId === imagesIds[2]){
            points+=2;
            module.config.options().grid.winingIds.push(firstId);
            module.config.options().grid.winingIds.push(currentId);
            module.config.options().grid.winingIds.push(2);
            points = isMatch(imagesIds, null, null, passedId, points, false, true, false, false, false, true);
            return points;
          }
          // Row #2, Rell #2 === Row #2, Rell #3
          if(passedId === imagesIds[7]){
            points+=2;
            module.config.options().grid.winingIds.push(firstId);
            module.config.options().grid.winingIds.push(currentId);
            module.config.options().grid.winingIds.push(7);
            points = isMatch(imagesIds, null, null, passedId, points, false, true, false, false, false, true);
            return points;
          }
          // Row #2, Rell #2 === Row #2, Rell #3
          if(passedId === imagesIds[12]){
            points+=2;
            module.config.options().grid.winingIds.push(firstId);
            module.config.options().grid.winingIds.push(currentId);
            module.config.options().grid.winingIds.push(12);
            points = isMatch(imagesIds, null, null, passedId, points, false, true, false, false, false, true);
            return points;
          }
        }
        if(thirdRow){
          // Row #3, Rell #2 === Row #2, Rell #3
          if(passedId === imagesIds[7]){
            points+=2;
            module.config.options().grid.winingIds.push(firstId);
            module.config.options().grid.winingIds.push(currentId);
            module.config.options().grid.winingIds.push(7);
            points = isMatch(imagesIds, null, null, passedId, points, false, false, true, false, false, true);
            return points;
          }
          // Row #3, Rell #2 === Row #2, Rell #3
          if(passedId === imagesIds[12]){
            points+=2;
            module.config.options().grid.winingIds.push(firstId);
            module.config.options().grid.winingIds.push(currentId);
            module.config.options().grid.winingIds.push(12);
            points = isMatch(imagesIds, null, null, passedId, points, false, false, true, false, false, true);
            return points;
          }
        }
      }

      //check third Rell vs fourth Rell
      if(thirdRell === true){
        module.config.options().koeficients.current = passedId;
        
        if(firstRow){
          // Row #1, Rell #3 === Row #1, Rell #4
          if(passedId === imagesIds[3]){
            points+=3;
            module.config.options().grid.winingIds.push(3);
            points = isMatch(imagesIds, null, null, passedId, points, true, false, false, false, false, false, true);
            return points;
          }
          // Row #1, Rell #3 === Row #2, Rell #4
          if(passedId === imagesIds[8]){
            points+=3;
            module.config.options().grid.winingIds.push(8);
            points = isMatch(imagesIds, null, null, passedId, points, true, false, false, false, false, false, true);
            return points;
          }
        }
        if(secondRow){
          // Row #2, Rell #3 === Row #1, Rell #4
          if(passedId === imagesIds[3]){
            points+=3;
            module.config.options().grid.winingIds.push(3);
            points = isMatch(imagesIds, null, null, passedId, points, false, true, false, false, false, false, true);
            return points;
          }
          // Row #2, Rell #3 === Row #2, Rell #4
          if(passedId === imagesIds[8]){
            points+=3;
            module.config.options().grid.winingIds.push(8);
            points = isMatch(imagesIds, null, null, passedId, points, false, true, false, false, false, false, true);
            return points;
          }
          // Row #2, Rell #3 === Row #2, Rell #4
          if(passedId === imagesIds[13]){
            points+=3;
            module.config.options().grid.winingIds.push(13);
            points = isMatch(imagesIds, null, null, passedId, points, false, true, false, false, false, false, true);
            return points;
          }
        }
        if(thirdRow){
          // Row #3, Rell #3 === Row #2, Rell #4
          if(passedId === imagesIds[8]){
            points+=3;
            module.config.options().grid.winingIds.push(8);
            points = isMatch(imagesIds, null, null, passedId, points, false, false, true, false, false, false, true);
            return points;
          }
          // Row #3, Rell #3 === Row #2, Rell #4
          if(passedId === imagesIds[13]){
            points+=3;
            module.config.options().grid.winingIds.push(13);
            points = isMatch(imagesIds, null, null, passedId, points, false, false, true, false, false, false, true);
            return points;
          }
        }
      }

      //check fourth Rell vs fiveth Rell
      if(fourthRell === true){
        module.config.options().koeficients.current = passedId;
        
        if(firstRow){
          // Row #1, Rell #4 === Row #1, Rell #5
          if(passedId === imagesIds[4]){
            points+=4;
            module.config.options().grid.winingIds.push(4);
            return points;
          }
          // Row #1, Rell #4 === Row #2, Rell #5
          if(passedId === imagesIds[9]){
            points+=4;
            module.config.options().grid.winingIds.push(9);
            return points;
          }
        }
        if(secondRow){
          // Row #2, Rell #4 === Row #1, Rell #5
          if(passedId === imagesIds[4]){
            points+=4;
            module.config.options().grid.winingIds.push(4);
            return points;
          }
          // Row #2, Rell #4 === Row #2, Rell #5
          if(passedId === imagesIds[9]){
            points+=4;
            module.config.options().grid.winingIds.push(9);
            return points;
          }
          // Row #2, Rell #4 === Row #2, Rell #5
          if(passedId === imagesIds[14]){
            points+=4;
            module.config.options().grid.winingIds.push(14);
            return points;
          }
        }
        if(thirdRow){
          // Row #3, Rell #4 === Row #2, Rell #5
          if(passedId === imagesIds[9]){
            points+=4;
            module.config.options().grid.winingIds.push(9);
            return points;
          }
          // Row #3, Rell #4 === Row #2, Rell #5
          if(passedId === imagesIds[14]){
            points+=4;
            module.config.options().grid.winingIds.push(14);
            return points;
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