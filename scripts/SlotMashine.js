const SlotMashine = (function($){
  
  function setGame(){

    ButtonsManager.spin.click(function(e){
      
      e.preventDefault();

      if(ButtonsManager.isActive('spin') && Amount.getAmount() >= 5){

        ButtonsManager.wasCliked('spin');
        
        let animate_spining = () => {
          return new Promise((resolve, reject) => {

            ButtonsManager.disable('spin');
            ButtonsManager.disable('bet-up');
            ButtonsManager.disable('bet-down');
            ButtonsManager.disable('min-bet');
            ButtonsManager.disable('max-bet');

            Amount.substract(Bet.getBet());
            ButtonsManager.changeElementValue('amount', Amount.getAmount());

            Animator.spin();
            
            setTimeout(() => {
              resolve();
            }, TimeMaster.animate_spining);
          });
        };
        
        animate_spining().then(() => {
          ButtonsManager.afterSpin();
        });

      }

    });

    return this;
  }

  function setBetUp(){
    
    ButtonsManager.betUp.click(function(e){

      e.preventDefault();

      Bet.betUp();
      ButtonsManager.afterBetUp().changeElementValue('bet', Bet.getBet());
      ButtonsManager.wasCliked('bet-up');

    });

    return this;
  }

  function setBetDown(){

    ButtonsManager.betDown.click(function(e){
      
      e.preventDefault();

      Bet.betDown();
      ButtonsManager.afterBetDown().changeElementValue('bet', Bet.getBet());
      ButtonsManager.wasCliked('bet-down');

    });

    return this;
  }

  function setMaxBet(){
    TimeMaster.speedUp();
    ButtonsManager.maxBet.click(function(e){

      e.preventDefault();

      if(ButtonsManager.isActive('max-bet')){
        
        let maxPosibleBet = Bet.takeAllBets().reverse().find((b) => {
          return b <= Amount.getAmount();
        });
        let indexOfMaxPosibleBet = Bet.takeAllBets().reverse().findIndex((b) => {
          return b === maxPosibleBet;
        });

        Bet.setBet(maxPosibleBet).setBetIndex(indexOfMaxPosibleBet);
        ButtonsManager.changeElementValue('bet', maxPosibleBet)
          .disable('bet-up')
          .activate('bet-down')
          .disable('max-bet')
          .activate('min-bet')
          .wasCliked('max-bet');
      }
    });

    return this;
  }

  function setMinBet(){

    ButtonsManager.minBet.click(function(e){

      e.preventDefault();

      Bet.setBet(5).setBetIndex(0);
      ButtonsManager.changeElementValue('bet', 5)
        .activate('bet-up')
        .disable('bet-down')
        .disable('min-bet')
        .activate('max-bet')
        .wasCliked('min-bet');
    });

    return this;
  }

  function setAutoPlay(){

    ButtonsManager.autoPlay.click(function(e){
      ButtonsManager.disable('auto-play');
      AutoPlay.is_auto_play = true;
      AutoPlay.start();
    });

    return this;
  }

  function setSpeed(){

    ButtonsManager.slowDown();
    
    ButtonsManager.speed.click(function(e){

      e.preventDefault();
      
      if(ButtonsManager.speed.text() === 'Speed Up'){

        ButtonsManager.speed.text('Slow Down');
        ButtonsManager.speedUp();
      }else{

        ButtonsManager.speed.text('Speed Up');
        ButtonsManager.slowDown();
      }

    });
  }

  return {
    setGame,
    setBetUp,
    setBetDown,
    setMaxBet,
    setMinBet,
    setAutoPlay,
    setSpeed
  };

})(jQuery);