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

  function getAllBets(){
    return module.config.options().bets.all;
  }

  function getBeforeLastPosibleBet(){
    return module.getAllBets()[module.getAllBets()[-2]];
  }

  function getSecondPosibleBet(){
    return module.getAllBets()[1];
  }

  function getTheSmallestPosibleBet(){
    return module.getAllBets()[0];
  }

  function getTheBiggestPosibleBet(){
    return module.getAllBets()[module.getAllBets().length-1];
  }

  function setCacheIncomingCash(cash){
    module.config.options().incoming_cash = cash;
    return module;
  }

  function getCacheIncomingCash(){
    return module.config.options().incoming_cash;
  }

  function getNextPosibleBet(){
    return (module.getAllBets()[module.config.options().bets.current_bet_index+1] === undefined
      ? module.getTheBiggestPosibleBet()
      : module.getAllBets()[module.config.options().bets.current_bet_index+1]);
  }

  function afterBetUp(){
    //is it biggest bet?
    if(module.getBet() === module.getTheBiggestPosibleBet()){
      module.disable('betUp')
        .disable('maxBet');
    }

    //do not have monney for bigger bet?
    if(module.getAmount() < module.getNextPosibleBet()){
      module.disable('betUp')
        .disable('maxBet');
    }

    //the bet is second posible bet or amount are at least next bet value?
    if(module.getBet() === module.getSecondPosibleBet() || module.getAmount() >= module.getNextPosibleBet()){
      module.activate('betDown')
        .activate('minBet');
    }

    return module;
  }

  function afterBetDown(){

    //is it minimum bet?
    if(module.getBet() === module.getTheSmallestPosibleBet()){
      module.disable('betDown')
        .disable('minBet');
    }

    //the bet is last before posible default-max bet?
    if(module.getBet() === module.getBeforeLastPosibleBet()){
      module.activate('betUp')
        .activate('maxBet');
    }

    //it have monney to bet up?
    if(module.getAmount() > module.getBet()){
      module.activate('betUp')
        .activate('maxBet');
    }

    return module;
  }

    module.afterBetUp = afterBetUp;
    module.afterBetDown = afterBetDown;
    module.getAllBets = getAllBets;
    module.getBeforeLastPosibleBet = getBeforeLastPosibleBet;
    module.getSecondPosibleBet = getSecondPosibleBet;
    module.getTheSmallestPosibleBet = getTheSmallestPosibleBet;
    module.getTheBiggestPosibleBet = getTheBiggestPosibleBet;
    module.getNextPosibleBet = getNextPosibleBet;
    module.getBet = getBet;
    module.setBet = setBet;
    module.betUp = betUp;
    module.betDown = betDown;
    module.setCacheIncomingCash = setCacheIncomingCash;
    module.getCacheIncomingCash = getCacheIncomingCash;
    
}(SlotMashine));