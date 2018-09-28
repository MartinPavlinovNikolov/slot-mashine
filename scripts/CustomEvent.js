var SlotMashine = SlotMashine || {};

(function(module){

  module.subscribers = {};

  function publish(type, data){
    if(typeof type !== 'string'){
      return;
    }
    type = type.split(' ');
    for(let i = 0; i < type.length; i++){
      for(let t of module.subscribers[type[i]]){
        module.subscribers[type[i]].forEach((f)=>f(data));
      }
    }

    return module;
  }

  function subscribe(type, handler){
    if(typeof type !== 'string'){
      return;
    }
    type = type.split(' ');
    if(typeof handler !== 'function'){
      return;
    }
    for(let i = 0; i < type.length; i++){
      if(!module.subscribers[type[i]]){
        module.subscribers[type[i]] = [];
      }
      if(module.subscribers[type[i]].some(el=>el.toString() === handler.toString())){
        return module;
      }
      module.subscribers[type[i]].push(handler);
    }

    return module;
  }

  function unsubscribe(type){
    if(typeof type !== 'string'){
      return;
    }
    type = type.split(' ');
    for(let i = 0; i < type.length; i += 1){
      module.subscribers[type[i]].map(function(f, ind){
        module.subscribers[type[i]].splice(ind, 1);
      });
    }
    
    return module;
  }

  module.publish = publish;
  module.on = subscribe;//syntatic shugar
  module.subscribe = subscribe;
  module.off = unsubscribe;//syntatic shugar
  module.unsubscribe = unsubscribe;
})(SlotMashine);