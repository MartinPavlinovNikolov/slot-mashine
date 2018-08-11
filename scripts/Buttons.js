var SlotMashine = SlotMashine || {};

(function(module){

  const time = (function(){
    function speedUp(){
      module.config.options({
        'timeControll': {
        'forOneFullSpinPerRell': 1,
        'delayBetweenRellsSpins': 100
        }
      });
    }

    function slowDown(){
      module.config.options({
        'timeControll': {
        'animateOnButtonClick': 200,
        'forOneFullSpinPerRell': 5,
        'delayBetweenRellsSpins': 200
        }
      });
    }
    return {
      speedUp,
      slowDown
    };
  })();

  (function(){
    $('body').on('click', 'button', function(e){
      e.preventDefault();
      const that = this;
      $(that).css({
        'transform': 'translateX(-4px) translateY(5px)',
        'box-shadow': '0 0 0 0 black'
      });
      setTimeout(function(){
        $(that).css({
          'transform': 'translateX(0) translateY(0)',
          'box-shadow': '-4px 5px 0 0 black'
        });
      }, 100);
    })
  })();

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

    //do not have monney for bigger bet?
    if(module.getAmount() < (module.takeAllBets()[module.config.options().bets.current_bet_index+1]) || module.getBet() === module.takeAllBets()[module.takeAllBets().length - 1]){
      module.disable('betUp');
      module.disable('maxBet');
    }

    //the bet is second posible bet or monney are at least next bet value?
    if(module.getBet() === module.takeAllBets()[1] || module.getAmount() >= (module.takeAllBets()[module.config.options().bets.current_bet_index+1])){
      module.activate('betDown');
      module.activate('minBet');
    }
    return this;
  }

  function afterBetDown (){

    //is it minimum bet?
    if(module.getBet() === 5){
      module.disable('betDown');
      module.disable('minBet');
    }

    //the bet is last before posible default-max bet?
    if(module.getBet() === module.takeAllBets()[module.takeAllBets()[-2]]){
      module.activate('betUp');
      module.activate('maxBet');
    }

    //it have monney to bet up?
    if(module.getBet() <= module.getAmount()){
      module.activate('betUp');
      module.activate('maxBet');
    }
    return this;
  }

  function updateAmountOrBetUI(target, monney){
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
  module.disable = disable;
  module.activate = activate;
  module.isActive = isActive;
  module.isDisabled = isDisabled;
  module.getElement = getElement;
  module.afterBetUp = afterBetUp;
  module.afterBetDown = afterBetDown;
  module.updateAmountOrBetUI = updateAmountOrBetUI;
  
})(SlotMashine);