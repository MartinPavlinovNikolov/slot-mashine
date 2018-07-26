var SlotMashine = SlotMashine || {};

(function(module){

  const AutoPlay = (function(){

    function start(){
      play();
      module.buttons.autoPlay.off();
      AutoPlay.is_auto_play = true;
      module.buttons.autoPlay.on('focusout click', function(e){
        module.autoPlay.stop();
      });
    }

    function stop(){
      module.activate('autoPlay');
      module.config.options().is_auto_play = false;
      module.buttons.autoPlay.off();
      module.buttons.autoPlay.click(function(e){
        module.disable('autoPlay');
        module.autoPlay.start();
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