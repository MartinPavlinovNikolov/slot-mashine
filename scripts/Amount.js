const Amount = (function(ButtonsManager){

  let _value = Number(ButtonsManager.amount.text()) * 100;

  function getAmount(){
    
    return _value;
  }

  function setAmount(amount){
    
    _value = amount;
  }

  function substract(value){
    _value -= value;

    return this;
  }

  function add(value){
    _value += value;
  }

  return {
    substract,
    add,
    getAmount,
    setAmount
  }

})(ButtonsManager);