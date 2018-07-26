var SlotMashine = SlotMashine || {};

(function($, module){

  function setGame(){

    function animateSpining(){
      return new Promise((resolve, reject) => {
        module.disable('spin');
        module.disable('betUp');
        module.disable('betDown');
        module.disable('minBet');
        module.disable('maxBet');
        module.substract(module.getBet());
        module.changeElementValue('amount', module.getAmount());
        module.spin();
        setTimeout(() => {
            resolve();
          }, module.config.options().timeControll.afterSpining);
        });
    }

    module.buttons.spin.click(function(e){
      e.preventDefault();
      if(module.isActive('spin') && module.getAmount() >= 5){
        module.wasCliked('spin');
        module.disable('spin');
        animateSpining()
          .then(() => {
            module.afterSpin();
          });
      }
    });
    return this;
  }

  function setBetUp(){
    module.buttons.betUp.click(function(e){
      e.preventDefault();
      module.betUp();
      module.afterBetUp().changeElementValue('bet', module.getBet());
      module.wasCliked('betUp');

    });
    return this;
  }

  function setBetDown(){
    module.buttons.betDown.click(function(e){
      e.preventDefault();
      module.betDown();
      module.afterBetDown().changeElementValue('bet', module.getBet());
      module.wasCliked('betDown');
    });
    return this;
  }

  function setMinBet(){
    module.buttons.minBet.click(function(e){
      e.preventDefault();
      module.setBet(5);
      module.changeElementValue('bet', 5)
        .activate('betUp')
        .disable('betDown')
        .disable('minBet')
        .activate('maxBet')
        .wasCliked('minBet');
    });
    return this;
  }

  function setMaxBet(){
    module.buttons.maxBet.click(function(e){
      e.preventDefault();
      if(module.isActive('maxBet')){
        let maxPosibleBet = module.takeAllBets().reverse().find((b) => {
          return b <= module.getAmount();
        });
        module.takeAllBets().reverse();
        module.setBet(maxPosibleBet);
        module.changeElementValue('bet', maxPosibleBet)
          .disable('betUp')
          .activate('betDown')
          .disable('maxBet')
          .activate('minBet')
          .wasCliked('maxBet');
      }
    });
    return this;
  }

  function setAutoPlay(){

    module.buttons.autoPlay.click(function(e){
      module.disable('autoPlay');
      module.config.options().autoPlayOn = true;
      module.autoPlay.start();
    });

    return this;
  }

  function setSpeed(){
    module.buttons.speed.click(function(e){
      e.preventDefault();
      if(module.buttons.speed.text() === 'Speed Up'){
        module.buttons.speed.text('Slow Down');
        module.time.speedUp();
      }else{
        module.buttons.speed.text('Speed Up');
        module.time.slowDown();
      }
    });
  }

  module.setGame = setGame;
  module.setBetUp = setBetUp;
  module.setBetDown = setBetDown;
  module.setMinBet = setMinBet;
  module.setMaxBet = setMaxBet;
  module.setSpeed = setSpeed;
  module.setAutoPlay = setAutoPlay;

})(jQuery, SlotMashine);