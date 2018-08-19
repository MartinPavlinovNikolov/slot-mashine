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

      return module;
    }

    function slowDown(){
      module.config.options({
        'timeControll': {
        'animateOnButtonClick': 200,
        'forOneFullSpinPerRell': 5,
        'delayBetweenRellsSpins': 200
        }
      });

      return module;
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
    return module;
  }

  function activate(element){
    module.buttons[element].removeClass('disabled').addClass('active');
    return module;
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

  function updateAmountOrBetUI(target, monney){
    monney = (monney / 100).toFixed(2).toString();
    if(monney.substr(1, 1) == '.'){
      monney = '0' + monney;
    }
    module.buttons[target].text(monney);

    return module;
  }

  function speedUp(){
    module.time.speedUp();

    return module;
  }

  function slowDown(){
    module.time.slowDown();
    
    return module;
  }

  module.buttons = _setElements(module.config.settings());
  module.time = time;
  module.disable = disable;
  module.activate = activate;
  module.isActive = isActive;
  module.isDisabled = isDisabled;
  module.getElement = getElement;
  module.updateAmountOrBetUI = updateAmountOrBetUI;
  
})(SlotMashine);