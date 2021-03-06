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
    let rotateX = 0;

    module.config.options().translateZ = imgHeight/(2*Math.tan(Math.PI/module.config.settings().imagesPerRell));

    for(let i = 1; i <= module.config.settings().rells; i++){
      $('#screen').append(`<div class="scene${i}"></div>`);
      $(`.scene${i}`).css({
          "display": "inline-block",
          "margin": "0",
          "padding": "0",
          "position": "relative",
          "width": `${imgWidth}px`,
          "height": `${imgHeight}`,
      }).append('<div class="carousel"></div>');
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
    let rellCounter = 0;
    let elms = $('.carousel');
    for(let e of elms){
      current_rel++;
      setTimeout(function(){
        $(e).css({
          "animation": `spinTheRells ${module.config.options().timeControll.forOneFullSpinPerRell}s linear forwards`
        });
        rellCounter++;
        module.publish('rellCounting', rellCounter);
        
      }, current_rel * module.config.options().timeControll.delayBetweenRellsSpins);

      //replace images in the middle of the animation. It hapen when the images are in back side of the rells.
      replaceImagesInSpiningRellsAnimation(e, (((current_rel-1) * module.config.options().timeControll.delayBetweenRellsSpins)+module.config.options().timeControll.forOneFullSpinPerRell*1000/2));
    }

    return module;
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