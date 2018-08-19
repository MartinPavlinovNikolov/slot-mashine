var SlotMashine = SlotMashine || {};
(function(module){

  function getBet(){
    return module.config.options().bets.all[module.config.options().bets.current_bet_index];
  }

  function setBet(bet){
    _setBetIndex(module.config.options().bets.all.findIndex(b => {return b===bet}));
    return module;
  }

  function betDown(){
    if(module.config.options().bets.all[_getBetIndex() - 1] !== undefined){
      _setBetIndex(_getBetIndex()-1);
    }
    return module;
  }

  function betUp(){
    if(module.config.options().bets.all[_getBetIndex() + 1] !== undefined){
      _setBetIndex(_getBetIndex()+1);
    }    
    return module;
  }

  function _setBetIndex(i){
    module.config.options().bets.current_bet_index = i;
    return module;
  }

  function _getBetIndex(){
    return module.config.options().bets.current_bet_index;
  }

  function takeAllBets(){
    return module.config.options().bets.all;
  }

  function setCacheIncomingCash(cash){
    module.config.options().incoming_cash = cash;
    return module;
  }

  function getCacheIncomingCash(){
    return module.config.options().incoming_cash;
  }

  function afterBetUp(){

    //do not have monney for bigger bet?
    if(module.getAmount() < (module.takeAllBets()[module.config.options().bets.current_bet_index+1] || module.takeAllBets()[module.takeAllBets().length-1])){
      module.disable('betUp')
        .disable('maxBet');
    }

    //the bet is second posible bet or amount are at least next bet value?
    if(module.getBet() === module.takeAllBets()[1] || module.getAmount() >= (module.takeAllBets()[module.config.options().bets.current_bet_index+1])){
      module.activate('betDown')
        .activate('minBet');
    }

    return module;
  }

  function afterBetDown(){

    //is it minimum bet?
    if(module.getBet() === 5){
      module.disable('betDown')
        .disable('minBet');
    }

    //the bet is last before posible default-max bet?
    if(module.getBet() === module.takeAllBets()[module.takeAllBets()[-2]]){
      module.activate('betUp')
        .activate('maxBet');
    }

    //it have monney to bet up?
    if(module.getBet() <= module.getAmount()){
      module.activate('betUp')
        .activate('maxBet');
    }

    return module;
  }

    module.afterBetUp = afterBetUp;
    module.afterBetDown = afterBetDown;
    module.takeAllBets = takeAllBets;
    module.getBet = getBet;
    module.setBet = setBet;
    module.betUp = betUp;
    module.betDown = betDown;
    module.setCacheIncomingCash = setCacheIncomingCash;
    module.getCacheIncomingCash = getCacheIncomingCash;
    
}(SlotMashine));