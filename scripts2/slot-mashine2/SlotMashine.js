const Config = {
  'options': {
    'elementsText': {
      'amount': '20.00',
      'bet': '00.05'
    },
    'monneyValues': {
      'amount': 2000,
      'bet': 5
    },
    'bets': {
      'all': [
        5, 10, 20, 40, 80, 160, 200, 400, 800, 1600, 2000
      ],
      'current_bet_index': 0
    },
    'koeficients': {
      'all': {
        '1': 0.4,
        '2': 0.6,
        '3': 0.8,
        '4': 1,
        '5': 1.2,
        '6': 1.4
      },
      'current': 0
    },
    'timeControll': {
      'animateOnButtonClick': 200,
      'rotateNextColumn': 200,
      'displayFreshCash': 1800,
      'autoPlayStart': 6000,
      'sumOfAllAnimationsPerSpin': 5000
    },
    'spiningAnimationsIterations': 20,
    'autoPlayOn': false
  },
  'settings': {
    'elements': {
      'bet': 'bet',
      'betUp': 'bet-up',
      'betDown': 'bet-down',
      'spin': 'spin',
      'amount': 'amount',
      'maxBet': 'max-bet',
      'minBet': 'min-bet',
      'autoPlay': 'auto-play',
      'speed': 'speed',
      'stoppers': {
        'aboveFirstRow': 'stopper1',
        'firstRow': 'stopper2',
        'secondRow': 'stopper3',
        'thirdRow': 'stopper4',
        'bottom': 'stopper5'
      }
    },
    'incoming_cash': 0
  }
};

var SlotMashine = SlotMashine || {};

(function(/*$*/){

  function options(newOptions){

    if(newOptions === undefined){
      throw new Error("SlotMashine.options() expect object!");
    }

    for(let option in newOptions){
      if(SlotMashine.config.options[option] === undefined){
        throw new Error(`Option: "${option}" do not exist!`);
      }
      if(typeof SlotMashine.config.options[option] === "object" && typeof newOptions[option] !== "object"){
        throw new Error(`Option: "${option}" must be a object that contains!`);
      }
    }

    for(let option in SlotMashine.config.options){
      if(typeof SlotMashine.config.options[option] === "object" || typeof SlotMashine.config.options[option] === "Object"){
      }else{
        SlotMashine.config.options[option] = newOptions[option] === undefined ? SlotMashine.config.options[option] : newOptions[option];
      }
    }
  }
  
  /*function animateSpining(){

    return new Promise((resolve, reject) => {

      this.disable('spin');
      this.disable('bet-up');
      this.disable('bet-down');
      this.disable('min-bet');
      this.disable('max-bet');

      this.substract(Bet.getBet());
      this.changeElementValue('amount', this.getAmount());

      this.spin();

      setTimeout(() => {
          resolve();
        }, this.animate_spining);
      });

  }*/

  /*function setGame(){

    this.spin.click(function(e){
      
      e.preventDefault();

      if(this.isActive('spin')){

        disableAllButtons()
          .then(blinkSpinButton())
          .then(substractBetFromAmount())
          .then(startSpiningAnimation())
          .then(checkForWins())
          .then(animateWiningImages())
          .then(displayFreshCash())
          .then(sumWinsWithAmount())
          .then(updateUserAmount())
          .then(updateUserBet())
          .then(updateButtonsStates())
          .then(resetEverything())
          .then(autoPlay());
      }
    });

    return this;
  }*/
  SlotMashine.config = Config;
  SlotMashine.options = options;
  /*SlotMashine.setGame = setGame();*/

})(/*jQuery*/);

SlotMashine.options({"autoPlayOn": true, "elementsText": {});
console.log(SlotMashine.config.options);