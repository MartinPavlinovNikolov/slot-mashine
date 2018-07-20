const AutoPlay = (function(){

  function start(){
    
    play();
    
    ButtonsManager.autoPlay.off();
    ButtonsManager.autoPlay.click(function(e){
      AutoPlay.stop();
    });

    setTimeout(function(){
      if(AutoPlay.is_auto_play === true){
        start();
      }
    }, TimeMaster.start);
  }

  function stop(){
    ButtonsManager.activate('auto-play');
    AutoPlay.is_auto_play = false;

    ButtonsManager.autoPlay.off();
    ButtonsManager.autoPlay.click(function(e){

      AutoPlay.is_auto_play = true;
      ButtonsManager.disable('auto-play');
      AutoPlay.start();
    });
  }

  function play(){
    ButtonsManager.spin.trigger('click');
  }

  return {
    start,
    stop,
    play
  };
})();