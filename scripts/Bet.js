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
    module.takeAllBets = takeAllBets;
    module.getBet = getBet;
    module.setBet = setBet;
    module.betUp = betUp;
    module.betDown = betDown;
    module.setCacheIncomingCash = setCacheIncomingCash;
    module.getCacheIncomingCash = getCacheIncomingCash;
    
}(SlotMashine));