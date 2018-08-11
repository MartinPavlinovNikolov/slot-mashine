var SlotMashine = SlotMashine || {};

(function(module){

  function activateWiningImages(){
    setWiningImagesIds();
  }

  function setWiningImagesIds(){
    const MockColection = {};
    const $colection = $('.carousel__cell');
    $colection.each(function(){
      if($(this).position().top < 0){
        console.log($(this));
        console.log($(this).position().top);
        $(this).css({'border':'2px solid red'});
      }
    });
    return module;
  }

  module.activateWiningImages = activateWiningImages;
})(SlotMashine);