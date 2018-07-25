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
    
    if(element.hasClass('active')){
      element.removeClass('active').addClass('click');
      setTimeout(() => {
        element.removeClass('click').addClass('active')}, module.config.options().timeControll.animateOnButtonClick);
      }
    return this;
  }

  function disable(element){
    element.removeClass('active').addClass('disabled');
    return this;
  }

  function activate(element){
    element.removeClass('disabled').addClass('active');
    return this;
  }

  function isActive(element){
    return element.hasClass('active');
  }

  function isDisabled(element){
    return element.hasClass('disabled');
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
    /*
    if(Amount.getAmount() < (Bet.takeAllBets()[Bet.getBetIndex()+1]) || Bet.getBet() === 2000){
      this.disable('bet-up');
    }

    if(Bet.getBet() === 10 || Amount.getAmount() >= (Bet.takeAllBets()[Bet.getBetIndex()+1])){
      this.activate('bet-down');
    }

    return this;*/
  }

  function afterBetDown (){
    
    /*if(Bet.getBet() === 5){
      this.disable('bet-down');
    }

    if(Bet.getBet() === 1600){
      this.activate('bet-up');
    }

    if(Bet.getBet() <= Amount.getAmount()){
      this.activate('bet-up');
    }

    return this;*/
  }

  function afterSpin(){

    /*let incoming_cash = Bet.getCacheIncomingCash();

    Amount.add(incoming_cash);

    this.changeElementValue('amount', Amount.getAmount());

    if(Amount.getAmount() >= 10){
      this.activate('bet-up');
      this.activate('bet-down');
      this.activate('min-bet');
    }

    if(Amount.getAmount() >= 10 && Amount.getAmount() >= Bet.takeAllBets()[Bet.getBetIndex()+1]){
      this.activate('max-bet');
    }

    if(Amount.getAmount() < 5){
      this.disable('spin');
    }else{
      this.activate('spin');
    }

    if(Amount.getAmount() < Bet.getBet()){
      Bet.setBet(5).setBetIndex(0);
      this.changeElementValue('bet', 5);

      if(Amount.getAmount() > Bet.getBet()){
        this.activate('bet-up');
        this.activate('max-bet');
      }
    }

    if(Bet.getBet() === 2000){
      this.disable('bet-up');
      this.disable('max-bet');
    }

    if(Bet.getBet() === 5){
      ButtonsManager.disable('bet-down');
    }

    return this;*/
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