var SlotMashine = SlotMashine || {};

(function(module){

  const AutoPlay = (function(){

    function start(){
      module.buttons.autoPlay.off();
      module.buttons.autoPlay.on('focusout click', function(e){
        module.activate('autoPlay');
        module.autoPlay.stop();
      });
      play();
    }

    function stop(){
      module.config.options().autoPlayOn = false;
      module.buttons.autoPlay.off();
      module.buttons.autoPlay.click(function(e){
        module.config.options().autoPlayOn = true;
        module.disable('autoPlay');
        module.autoPlay.start();
      });
    }

    function play(){
      if(module.config.options().rellsIsSpining === false){
        module.buttons.spin.trigger('click');
      }
    }

    return {
      start,
      stop,
      play
    };

  })();

  module.autoPlay = AutoPlay;

})(SlotMashine);