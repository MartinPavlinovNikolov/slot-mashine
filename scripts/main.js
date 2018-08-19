var SlotMashine = SlotMashine || {};

window.addEventListener('load', function(){
  SlotMashine
    .setGame()
    .setBetUp()
    .setBetDown()
    .setMinBet()
    .setMaxBet()
    .setAutoPlay()
    .setSpeed()
    .setSwitchButton()
    .listenForClickOnSpinButton()
    .listenFor_rellCounting()
    .listenFor_animateRellsStart()
    .listenFor_animateRellsEnd();
});