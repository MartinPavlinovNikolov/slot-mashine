var SlotMashine = SlotMashine || {};
(function(module){

  function getAmount(){    
    return module.config.options().monneyValues.amount;
  }

  function setAmount(amount){
    module.config.options().monneyValues.amount = amount;
    return this;
  }

  function substract(value){
    module.config.options().monneyValues.amount -= value;
    return this;
  }

  function add(value){
    module.config.options().monneyValues.amount += value;
    return this;
  }
    module.substract = substract;
    module.add = add;
    module.getAmount = getAmount;
    module.setAmount = setAmount;

})(SlotMashine);