var SlotMashine = SlotMashine || {};

(function($, module){

  module.createTables('info-table');

  module.on('animateRellsStart', function(data){
    module.disable('spin');
    module.disable('betUp');
    module.disable('betDown');
    module.disable('minBet');
    module.disable('maxBet');
    module.substract(module.getBet());
    module.updateAmountOrBetUI('amount', module.getAmount());
  });

  module.on('rellCounting', function(counter){
    if(counter === module.config.settings().rells){
      setTimeout(function(){
        let elms = $('.carousel');
        for(let e of elms){
          $(e).css({
            "animation": ''
          });
        }

        module.checkForWiningLines();
      }, module.config.options().timeControll.forOneFullSpinPerRell * 1000);
    }
  });

  module.on('animateRellsEnd', function(data){

    const incoming_cash = module.getCacheIncomingCash();

    module.add(incoming_cash);
    module.updateAmountOrBetUI('amount', module.getAmount());

    //monney are greater then second posible bet?
    if(module.getAmount() >= module.takeAllBets()[1]){
      module.activate('betUp');
      module.activate('betDown');
      module.activate('minBet');
    }

    //is it posible to rise the bet?
    if(module.getAmount() >= module.takeAllBets()[1] && module.getAmount() >= module.takeAllBets()[module.config.options().bets.current_bet_index + 1]){
      module.activate('maxBet');
    }

    //run out of monney or still play?
    if(module.getAmount() < module.takeAllBets()[0]){
      module.disable('spin');
    }else{
      module.activate('spin');
    }

    //monney are less then the current bet?
    if(module.getAmount() < module.getBet()){
      module.setBet(module.takeAllBets()[0]);
      module.updateAmountOrBetUI('bet', module.takeAllBets()[0]);

      //is posible to rise the bet?
      if(module.getAmount() > module.getBet()){
        module.activate('betUp');
        module.activate('maxBet');
      }
    }

    //is not posible to rise the bet?
    if(module.getBet() === module.takeAllBets()[module.takeAllBets().length - 1]){
      module.disable('betUp');
      module.disable('maxBet');
    }

    //monney are the minimum posible bet?
    if(module.getBet() === module.takeAllBets()[0]){
      module.disable('betDown');
    }

    //is auto-play on?
    module.config.options().rellsIsSpining = false;
    if(module.config.options().autoPlayOn === true){
      module.autoPlay.start();
    }
  });

  function setGame(){

    module.loadScreen();
    module.setKeyFrame();

    module.buttons.spin.click(function(e){
      e.preventDefault();

      let elms = $('.wining');
      $('#remove-me').remove();
      elms.each(function(){
        $(this).removeClass('wining');
      });

      if(module.config.options().rellsIsSpining === false && module.isActive('spin') && module.getAmount() >= 5){
        module.config.options().rellsIsSpining = true;
        module.disable('spin');
        module.setKeyFrame();
        module.animateRellsStart();
      }
    });
    return this;
  }

  function setBetUp(){
    module.buttons.betUp.click(function(e){
      e.preventDefault();
      if(module.isActive('betUp')){
        module.betUp();
        module.afterBetUp().updateAmountOrBetUI('bet', module.getBet());
      }
    });
    return this;
  }

  function setBetDown(){
    module.buttons.betDown.click(function(e){
      e.preventDefault();
      if(module.isActive('betDown')){
        module.betDown();
        module.afterBetDown().updateAmountOrBetUI('bet', module.getBet());
      }
    });
    return this;
  }

  function setMinBet(){
    module.buttons.minBet.click(function(e){
      e.preventDefault();
      module.setBet(module.takeAllBets()[0]);
      module.updateAmountOrBetUI('bet', module.takeAllBets()[0])
        .activate('betUp')
        .disable('betDown')
        .disable('minBet')
        .activate('maxBet');
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
        module.updateAmountOrBetUI('bet', maxPosibleBet)
          .disable('betUp')
          .activate('betDown')
          .disable('maxBet')
          .activate('minBet');
      }
    });
    return this;
  }

  function setAutoPlay(){

    module.buttons.autoPlay.click(function(e){
      module.config.options().autoPlayOn = true;
      module.disable('autoPlay');
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