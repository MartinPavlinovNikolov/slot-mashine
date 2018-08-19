var SlotMashine = SlotMashine || {};

(function(module){

  function switchGame(){
    
    if(module.config.settings().rells === 5){
      module.buttons.switch.text(module.config.settings().game3X3);
    }else{
      module.buttons.switch.text(module.config.settings().game3X5);
    }

    const screen = document.getElementById('screen');
    screen.innerHTML = '';
    module.config.settings().rells = module.config.settings().rells === 3?5:3;
    module.createTables('info-table')
      .loadScreen();

    return module;
  }

  module.switchGame = switchGame;

})(SlotMashine);