var SlotMashine = SlotMashine || {};

(function(module){

  function switchGame(){
    const text = module.buttons.switch;
    if(module.config.settings().rells === 5){
      text.text(module.config.settings().game3X3);
    }else{
      text.text(module.config.settings().game3X5);
    }

    const screen = document.getElementById('screen');
    screen.innerHTML = '';
    module.config.settings().rells = module.config.settings().rells === 3?5:3;
    module.createTables('info-table');
    module.loadScreen();
  }

  module.switchGame = switchGame;

})(SlotMashine);