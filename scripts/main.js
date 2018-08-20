var SlotMashine = SlotMashine || {};

window.addEventListener('load', function(){
  SlotMashine
    .setGame()
    .listenForBetUp()
    .listenForBetDown()
    .listenForMinBet()
    .listenForMaxBet()
    .listenForAutoPlay()
    .listenForSpeed()
    .listenForSwitchButton()
    .listenForClickOnSpinButton()
    .listenFor_rellCounting()
    .listenFor_animateRellsStart()
    .listenFor_animateRellsEnd();
});