var SlotMashine = SlotMashine || {};

(function(module){

  let incrementingRotationX = -360;

  function setKeyFrame(){

    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'keyFrame';

    let keyFrame = '@keyframes spinTheRells{\
      1%, 10%{\
        transform: translateZ(-A_DYNAMIC_VALUEpx) rotateX(calc(+2deg));\
      }\
      95%,99%{\
        transform: translateZ(-A_DYNAMIC_VALUEpx) rotateX(calc('+incrementingRotationX+'deg - 2deg));\
      }\
      100%{\
        transform: translateZ(-A_DYNAMIC_VALUEpx) rotateX('+incrementingRotationX+'deg);\
      }\
    }';

    style.innerHTML = keyFrame.replace(/A_DYNAMIC_VALUE/g, module.config.options().translateZ);

    if(!head.children['keyFrame']){
      head.appendChild(style);
    }else{
      $('#keyFrame').remove();
      head.appendChild(style);
    }

    return module;
  }

  function loadScreen(){

    const imgWidth = $('#screen').css('width').replace('px', '') / module.config.settings().rells;
    const imgHeight = $('#screen').css('height').replace('px', '') / 3;
    const addToRotateX = 360 / module.config.settings().imagesPerRell;

    let perspectiveOrigin = module.config.settings().perspectiveOrigins;
    let zIndexs = module.config.settings().rellsZIndexes;
    let iPersOrig = zIndexs.length-1;
    let rotateX = 0;
    
    //todo: relocate this 2 lines in separate fnction in slotmashine.js
    module.updateAmountOrBetUI('amount', 2000);
    module.updateAmountOrBetUI('bet', 5);

    module.config.options().translateZ = imgHeight/(2*Math.tan(Math.PI/module.config.settings().imagesPerRell));

    if(module.config.settings().rells === 3){
      perspectiveOrigin.pop();
      perspectiveOrigin.shift();
      zIndexs.pop();
      zIndexs.shift();
    }

    for(let i = 1; i <= module.config.settings().rells; i++){
      $('#screen').append(`<div class="scene${i}"></div>`);
      $(`.scene${i}`).append('<div class="carousel"></div>');
      $(`.scene${i}`).css({
          "display": "inline-block",
          "border": "1px solid #ccc",
          "margin": "0",
          "padding": "0",
          "position": "relative",
          "width": `${imgWidth}px`,
          "height": `${imgHeight}`,
          "perspective": "1000px",
          "z-index": zIndexs[i-1],
          "perspective-origin": perspectiveOrigin[i-1]
      });
      $('.carousel').css({
          "width": "100%",
          "height": "100%",
          "position": "absolute",
          "transform": `translateZ(-${module.config.options().translateZ}px)`,
          "transform-style": "preserve-3d"
      });
      for(let j = 1;j <= module.config.settings().imagesPerRell; j++){
        $(`.scene${i} .carousel`).append('<img src="./images/'+(Math.floor(Math.random() * (6) + 1))+'.png" class="carousel__cell" id="'+i+'-'+j+'">');
      }
      for(let j = 1; j <= $(`.scene${i} .carousel .carousel__cell`).length; j++){
        $(`.scene${i} .carousel .carousel__cell`).filter(`:nth-child(${j})`).css({
          "transform": `rotateX(${rotateX}deg) translateZ(${module.config.options().translateZ}px)`
        });

        rotateX += addToRotateX;
        if(rotateX === 360){
            rotateX = 0;
        }
      }
    }

    $('.carousel__cell').css({
      "position": "absolute",
      "width": "${imgWidth}px",
      "height": "${imgHeight}px",
      "left": "0",
      "top": "0"
    });

    return module;
  }

  function animateRellsStart(){
    module.publish('animateRellsStart');

    let current_rel = 0;
    let elms = $('.carousel');
    for(let e of elms){
      current_rel++;
      setTimeout(function(){
        $(e).css({
          "animation": `spinTheRells ${module.config.options().timeControll.forOneFullSpinPerRell}s linear forwards`
        });
        
      }, current_rel * module.config.options().timeControll.delayBetweenRellsSpins);

      if(current_rel === module.config.settings().rells){
        setTimeout(function(){
          let current_rel_copy = current_rel;
          for(let e of elms){
            $(e).css({
              "animation": ''
            });
          }

          module.checkForWiningLines();

        }, module.config.options().timeControll.forOneFullSpinPerRell*1000+1500);
      }

      //replace images in the middle of the animation. It hapen when the images are in back side of the rells.
      replaceImagesInSpiningRellsAnimation(e, (((current_rel-1) * module.config.options().timeControll.delayBetweenRellsSpins)+module.config.options().timeControll.forOneFullSpinPerRell*1000/2));
    }
  }

  function replaceImagesInSpiningRellsAnimation(element, time){
    
    setTimeout(()=>{
      $(element).each(function(){
        let newImgSRC = "./images/"+(Math.floor(Math.random() * (6) + 1))+".png";
        $(this.children[0]).attr('src', newImgSRC);
        newImgSRC = "./images/"+(Math.floor(Math.random() * (6) + 1))+".png";
        $(this.children[1]).attr('src', newImgSRC);
        newImgSRC = "./images/"+(Math.floor(Math.random() * (6) + 1))+".png";
        $(this.lastElementChild).attr('src', newImgSRC);
      });

      module.setImages(element);

    }, time);

    return module;
  }
  
  module.animateRellsStart = animateRellsStart;
  module.loadScreen = loadScreen;
  module.setKeyFrame = setKeyFrame;

})(SlotMashine);