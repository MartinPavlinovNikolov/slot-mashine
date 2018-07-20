const ButtonsManager = (function(){

  setElement('bet', 'bet');
  setElement('betUp', 'bet-up');
  setElement('betDown', 'bet-down');
  setElement('spin', 'spin');
  setElement('amount', 'amount');
  setElement('maxBet', 'max-bet');
  setElement('minBet', 'min-bet');
  setElement('autoPlay', 'auto-play');
  setElement('speed', 'speed');

  function wasCliked(element_id){
    
    let element = $('#'+element_id);
    
    if(element.hasClass('active')){
      element.removeClass('active').addClass('click');
      setTimeout(() => {element.removeClass('click').addClass('active')}, TimeMaster.wasClicked);
    }


    return this;
  }

  function disable(element_id){
    $('#'+element_id).removeClass('active').addClass('disabled');

    return this;
  }

  function activate(element_id){
    $('#'+element_id).removeClass('disabled').addClass('active');

    return this;
  }

  function isActive(element_id){
    return $('#'+element_id).hasClass('active');
  }

  function isDisabled(element_id){
    return $('#'+element_id).hasClass('disabled');
  }

  function setElement(property, element_id){
    this[property] = $('#'+element_id);

    return this;
  }

  function getElement(element){
    return this[element];
  }

  function afterBetUp(){
    
    if(Amount.getAmount() < (Bet.takeAllBets()[Bet.getBetIndex()+1]) || Bet.getBet() === 2000){
      this.disable('bet-up');
    }

    if(Bet.getBet() === 10 || Amount.getAmount() >= (Bet.takeAllBets()[Bet.getBetIndex()+1])){
      this.activate('bet-down');
    }

    return this;
  }

  function afterBetDown (){
    
    if(Bet.getBet() === 5){
      this.disable('bet-down');
    }

    if(Bet.getBet() === 1600){
      this.activate('bet-up');
    }

    if(Bet.getBet() <= Amount.getAmount()){
      this.activate('bet-up');
    }

    return this;
  }

  function afterSpin(){

    let incoming_cash = Bet.getCacheIncomingCash();

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

    return this;
  }

  function changeElementValue(target, monney){

    monney = (monney / 100).toFixed(2).toString();

    if(monney.substr(1, 1) == '.'){
      monney = '0' + monney;
    }

    ButtonsManager[target].text(monney);

    return this;
  }

  function speedUp(){
    TimeMaster.speedUp();
  }

  function slowDown(){
    TimeMaster.slowDown();
  }

  return {
    amount,
    bet,
    betUp,
    betDown,
    spin,
    minBet,
    maxBet,
    speed,
    wasCliked,
    disable,
    activate,
    isActive,
    isDisabled,
    setElement,
    getElement,
    afterBetUp,
    afterBetDown,
    afterSpin,
    changeElementValue,
    autoPlay,
    speedUp,
    slowDown
  };
})();