var SlotMashine = SlotMashine || {};

(function(module){

  const AutoPlay = (function(){

    function start(){
      
      play();
      
      module.buttons.autoPlay.off();
      AutoPlay.is_auto_play = true;
      module.buttons.autoPlay.focusout(function(e){
        module.stop();
      });
    }

    function stop(){
      module.activate('auto-play');
      module.config.options().is_auto_play = false;

      module.buttons.autoPlay.off();
      module.buttons.autoPlay.click(function(e){
        module.disable('auto-play');
        module.start();
      });
    }

    function play(){
      module.buttons.spin.trigger('click');
    }

    return {
      start,
      stop,
      play
    };

  })();

  module.autoPlay = AutoPlay;

})(SlotMashine);