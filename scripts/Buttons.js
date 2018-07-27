var SlotMashine = SlotMashine || {};

(function(module){

  const time = (function(){
    function speedUp(){
      module.config.options().spiningAnimationsIterations = 8;
      module.config.options({
        'timeControll': {
          'rotateNextColumn': 200,
          'spinWiningImages': 800,
          'displayFreshCash': 800,
          'autoPlayStart': 3000,
          'sumOfAllAnimationsPerSpin': 1850
        }
      });
    }

    function slowDown(){
      module.config.options().spiningAnimationsIterations = 20;
      module.config.options({
        'timeControll': {
          'rotateNextColumn': 200,
          'spinWiningImages': 1800,
          'displayFreshCash': 1800,
          'autoPlayStart': 6000,
          'sumOfAllAnimationsPerSpin': 5000
        }
      });
    }
    return {
      speedUp,
      slowDown
    };
  })();

  function wasCliked(element){
    
    module.buttons[element].css({
      "transform": "translateX(-4px) translateY(5px)",
      "box-shadow": "0 0 0 0 black"
    });

    if(module.buttons[element].hasClass('active')){
      module.buttons[element].addClass('click');
      setTimeout(() => {
        module.buttons[element].removeClass('click')
      }, module.config.options().timeControll.animateOnButtonClick);
    }

    setTimeout(() => {
      module.buttons[element].css({
        "transform": "translateX(0) translateY(0)",
        "box-shadow": "-4px 5px 0 0 black"
      });
    }, 100);

    return this;
  }

  function disable(element){
    module.buttons[element].removeClass('active').addClass('disabled');
    return this;
  }

  function activate(element){
    module.buttons[element].removeClass('disabled').addClass('active');
    return this;
  }

  function isActive(element){
    return module.buttons[element].hasClass('active');
  }

  function isDisabled(element){
    return module.buttons[element].hasClass('disabled');
  }

  function _setElements(colection){
    const buttons = {};
    for(let e in module.config.settings().elements){
      if(typeof module.config.settings().elements[e] === "string"){
      buttons[e] = $('#'+ module.config.settings().elements[e]);
      }
    }
    return buttons;
  }

  function getElement(element){
    return module.buttons[element];
  }

  function afterBetUp(){
    if(module.getAmount() < (module.takeAllBets()[module.config.options().bets.current_bet_index+1]) || module.getBet() === 2000){
      module.disable('betUp');
    }
    if(module.getBet() === 10 || module.getAmount() >= (module.takeAllBets()[module.config.options().bets.current_bet_index+1])){
      module.activate('betDown');
    }
    return this;
  }

  function afterBetDown (){
    if(module.getBet() === 5){
      module.disable('betDown');
    }
    if(module.getBet() === 1600){
      module.activate('betUp');
    }
    if(module.getBet() <= module.getAmount()){
      module.activate('betUp');
    }
    return this;
  }

  function afterSpin(){

    let incoming_cash = module.getCacheIncomingCash();

    module.add(incoming_cash);
    module.changeElementValue('amount', module.getAmount());

    if(module.getAmount() >= 10){
      module.activate('betUp');
      module.activate('betDown');
      module.activate('minBet');
    }

    if(module.getAmount() >= 10 && module.getAmount() >= module.takeAllBets()[module.config.options().bets.current_bet_index + 1]){
      module.activate('maxBet');
    }

    if(module.getAmount() < 5){
      module.disable('spin');
    }else{
      module.activate('spin');
    }

    if(module.getAmount() < module.getBet()){
      module.setBet(5);
      module.changeElementValue('bet', 5);

      if(module.getAmount() > module.getBet()){
        module.activate('betUp');
        module.activate('maxBet');
      }
    }

    if(module.getBet() === 2000){
      module.disable('betUp');
      module.disable('maxBet');
    }

    if(module.getBet() === 5){
      module.disable('betDown');
    }

    return this;
  }

  function changeElementValue(target, monney){
    monney = (monney / 100).toFixed(2).toString();
    if(monney.substr(1, 1) == '.'){
      monney = '0' + monney;
    }
    module.buttons[target].text(monney);
    return this;
  }

  function speedUp(){
    module.time.speedUp();
  }

  function slowDown(){
    module.time.slowDown();
  }

  module.buttons = _setElements(module.config.settings());
  module.time = time;
  module.wasCliked = wasCliked;
  module.disable = disable;
  module.activate = activate;
  module.isActive = isActive;
  module.isDisabled = isDisabled;
  module.getElement = getElement;
  module.afterBetUp = afterBetUp;
  module.afterBetDown = afterBetDown;
  module.afterSpin = afterSpin;
  module.changeElementValue = changeElementValue;
  
})(SlotMashine);