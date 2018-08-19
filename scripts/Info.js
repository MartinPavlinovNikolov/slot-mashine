var SlotMashine = SlotMashine || {};

(function(module){

  function createTables(target){

    const tables = {};
    const koeficients = module.config.options().koeficients.all;
    const points = module.config.options().koeficients.points;
    const images = ['./images/1.png', './images/2.png', './images/3.png', './images/4.png', './images/5.png', './images/6.png'];
    const numberOfRells = module.config.settings().rells;
    let imgIterator = images[Symbol.iterator]();
    const imagesLength = images.length;
    const t = $('#'+target);

    $('.box-info').each(function(c){
      $(this).remove();
    });
    

    for(let i = 0; i < imagesLength; i++){  
      $('#'+target).append('<div class="box-info"></div>');
    }

    fillTables();

    function* addImage(parent, srcCache){
      const str = `<img src='${srcCache}'>`;
      const emptyStr = `<div class='emptyImage'></div>`;
      let count = 0;
      let pointsValues = [].slice.call(Object.values(points));
      let pointValue = (pointsValues[count] * koeficients[srcCache.substr(-5, 1)]).toFixed(1);

      yield str+str+str+emptyStr+emptyStr+`<div class='info-k'><p>&nbspX ${pointValue}</p></div>`;
      count++;
      pointValue = (pointsValues[count] * koeficients[srcCache.substr(-5, 1)]).toFixed(1);

      yield str+str+str+str+emptyStr+`<div class='info-k'><p>&nbspX ${pointValue}</p></div>`;
      count++;
      pointValue = (pointsValues[count] * koeficients[srcCache.substr(-5, 1)]).toFixed(1);

      yield str+str+str+str+str+`<div class='info-k'><p>&nbspX ${pointValue}</p></div>`;
    }

    function fillTables(){
      let src = images[Symbol.iterator]();
      let srcCache;

      $('.box-info').each(function(){
        srcCache = src.next().value;
        if(srcCache === undefined){
          src = images[Symbol.iterator]();
          srcCache = src.next().value;
        }
        let generator = addImage(this, srcCache);
        for(let i = 0; i < numberOfRells -2; i++){
          $(this).append(generator.next().value);
          $(this).append('<br>');
        }
      });
    }

    return module;
  }


  module.createTables = createTables;

})(SlotMashine);