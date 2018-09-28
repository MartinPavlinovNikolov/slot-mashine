var SlotMashine = SlotMashine || {};

(function($, module){

  function listenFor_animateRellsStart(){
    module.on('animateRellsStart', function(data){
      module.disable('spin')
        .disable('betUp')
        .disable('betDown')
        .disable('minBet')
        .disable('maxBet')
        .substract(module.getBet())
        .updateAmountOrBetUI('amount', module.getAmount());
    });

    return module;
  }

  function listenFor_rellCounting(){
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

    return module;
  }

  function listenFor_animateRellsEnd(){

    module.on('animateRellsEnd', function(data){
      const incoming_cash = module.getCacheIncomingCash();
      module.add(incoming_cash)
        .updateAmountOrBetUI('amount', module.getAmount());
      
      //monney are greater or equal then second posible bet?
      if(module.getAmount() >= module.getSecondPosibleBet()){
        module.activate('betDown')
          .activate('minBet');
      }

      //is it posible to rise the bet?
      if(module.getAmount() >= module.getSecondPosibleBet() && module.getAmount() >= module.getNextPosibleBet()){
        module.activate('maxBet')
          .activate('betUp');
      }

      //run out of monney or still play?
      if(module.getAmount() < module.getTheSmallestPosibleBet()){
        module.disable('spin');
      }else{
        module.activate('spin');
      }

      //monney are less then the current bet?
      if(module.getAmount() < module.getBet()){
        module.setBet(module.getTheSmallestPosibleBet())
          .updateAmountOrBetUI('bet', module.getTheSmallestPosibleBet());

        //is posible to rise the bet?
        if(module.getAmount() > module.getBet()){
          module.activate('betUp')
            .activate('maxBet');
        }
      }

      //is not posible to rise the bet?
      if(module.getBet() === module.getTheBiggestPosibleBet()){
        module.disable('betUp')
          .disable('maxBet');
      }

      //monney are the minimum posible bet?
      if(module.getBet() === module.getTheSmallestPosibleBet()){
        module.disable('betDown')
          .disable('minBet');
      }

      //is auto-play on?
      module.config.options().rellsIsSpining = false;
      if(module.config.options().autoPlayOn === true){
        module.autoPlay.start();
      }
    });

    return module;
  }

  function listenForSwitchButton(){
    module.buttons.switch.on('click', function(e){
      e.preventDefault();
      module.switchGame();
    });

    return module;
  }

  function setGame(){

    module.createTables('info-table');

    if(module.config.settings().rells === 5){
      module.buttons.switch.text(module.config.settings().game3X5);
    }else{
      module.buttons.switch.text(module.config.settings().game3X3);
    }
    module.updateAmountOrBetUI('amount', 2000)
      .updateAmountOrBetUI('bet', 5)
      .loadScreen()
      .setKeyFrame();

    return module;
  }

  function listenForClickOnSpinButton(){
    module.buttons.spin.click(function(e){
      e.preventDefault();

      let elms = $('.wining');
      $('#remove-me').remove();
      elms.each(function(){
        $(this).removeClass('wining');
      });

      if(module.config.options().rellsIsSpining === false && module.isActive('spin') && module.getAmount() >= 5){
        module.config.options().rellsIsSpining = true;
        module.disable('spin')
          .setKeyFrame()
          .animateRellsStart();
      }
    });

    return module;
  }

  function listenForBetUp(){
    module.buttons.betUp.click(function(e){
      e.preventDefault();
      if(module.isActive('betUp')){
        module.betUp()
          .afterBetUp()
          .updateAmountOrBetUI('bet', module.getBet());
      }
    });

    return module;
  }

  function listenForBetDown(){
    module.buttons.betDown.click(function(e){
      e.preventDefault();
      if(module.isActive('betDown')){
        module.betDown()
          .afterBetDown()
          .updateAmountOrBetUI('bet', module.getBet());
      }
    });

    return module;
  }

  function listenForMinBet(){
    module.buttons.minBet.click(function(e){
      e.preventDefault();
      module.setBet(module.getAllBets()[0]);
      module.updateAmountOrBetUI('bet', module.getAllBets()[0])
        .activate('betUp')
        .disable('betDown')
        .disable('minBet')
        .activate('maxBet');
    });

    return module;
  }

  function listenForMaxBet(){
    module.buttons.maxBet.click(function(e){
      e.preventDefault();
      if(module.isActive('maxBet')){
        let maxPosibleBet = module.getAllBets().reverse().find((b) => {
          return b <= module.getAmount();
        });
        module.getAllBets().reverse();
        module.setBet(maxPosibleBet)
          .updateAmountOrBetUI('bet', maxPosibleBet)
          .disable('betUp')
          .activate('betDown')
          .disable('maxBet')
          .activate('minBet');
      }
    });
    
    return module;
  }

  function listenForAutoPlay(){

    module.buttons.autoPlay.click(function(e){
      module.config.options().autoPlayOn = true;
      module.disable('autoPlay')
        .autoPlay.start();
    });

    return module;
  }

  function listenForSpeed(){
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

    return module;
  }

  module.setGame = setGame;
  module.listenForClickOnSpinButton = listenForClickOnSpinButton;
  module.listenForBetUp = listenForBetUp;
  module.listenForBetDown = listenForBetDown;
  module.listenForMinBet = listenForMinBet;
  module.listenForMaxBet = listenForMaxBet;
  module.listenForSpeed = listenForSpeed;
  module.listenForAutoPlay = listenForAutoPlay;
  module.listenFor_rellCounting = listenFor_rellCounting;
  module.listenFor_animateRellsStart = listenFor_animateRellsStart;
  module.listenFor_animateRellsEnd = listenFor_animateRellsEnd;
  module.listenForSwitchButton = listenForSwitchButton;

})(jQuery, SlotMashine);