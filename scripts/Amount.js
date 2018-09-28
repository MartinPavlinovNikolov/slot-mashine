var SlotMashine = SlotMashine || {};
(function(module){

  function getAmount(){    
    return module.config.options().monneyValues.amount;
  }

  function setAmount(amount){
    module.config.options().monneyValues.amount = amount;
    return module;
  }

  function substract(value){
    module.config.options().monneyValues.amount -= value;
    return module;
  }

  function add(value){
    module.config.options().monneyValues.amount += value;
    return module;
  }
    module.substract = substract;
    module.add = add;
    module.getAmount = getAmount;
    module.setAmount = setAmount;

})(SlotMashine);