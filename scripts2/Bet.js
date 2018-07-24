const Bet = (function(){

  const _bets = {
    'all':[
      5, 10, 20, 40, 80, 160, 200, 400, 800, 1600, 2000
    ],
    'current_bet_index': 0,
    'getBetIndex': () => (_bets.current_bet_index),
    'setBetIndex': (i) => (_bets.current_bet_index = i)
  };

  let incoming_cash = 0;

  function getBet(){
    return _bets.all[_bets.current_bet_index];
  }

  function setBet(bet){

    _bets.setBetIndex(this.takeAllBets().findIndex(_bet => {
      return _bet === bet;
    }));

    return this;
  }

  function betDown(){

    if(ButtonsManager.isActive('bet-down')){

      this.setBetIndex(this.getBetIndex()-1);

      return this;
    }
  }

  function betUp(){

    if(ButtonsManager.isActive('bet-up')){

      this.setBetIndex(this.getBetIndex()+1);

    }

    return this;
  }

  function setBetIndex(i){
    _bets.setBetIndex(i);
  }

  function getBetIndex(){
    return _bets.getBetIndex();
  }

  function takeAllBets(){
    return _bets.all;
  }

  function setCacheIncomingCash(cash){

    incoming_cash = cash;

    return this;
  }

  function getCacheIncomingCash(){

    return incoming_cash;
  }

  return {
    takeAllBets,
    getBet,
    setBet,
    setBetIndex,
    getBetIndex,
    betUp,
    betDown,
    setCacheIncomingCash,
    getCacheIncomingCash
  };
}());