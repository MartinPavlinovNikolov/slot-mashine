window.addEventListener('load', function(){

  Function.prototype.extend = function(parent){

    let argumentsLength;

    if(arguments.length > 1){
      
      argumentsLength = arguments.length;

      for(let i = 1; i < argumentsLength; i += 1){
        var name = arguments[i];
        this.prototype[name] = parent.prototype[name];
      }

    }
    else{

      for(let prop in parent.prototype){
        if(parent.prototype.hasOwnProperty(prop)){
          this.prototype[prop] = parent.prototype[prop];
        }
      }

    }

    return this;

  }

  function Publisher (){
    this.subscribe = function(){};
    this.unsubscribe = function(){};
    this.publish = function(){};
  }

  Publisher.prototype = {
    publish: function publish(data){

      let subscribersLength;

      if(!this.subscribers){
        return;
      }

      subscribersLength = this.subscribers.length;

      for(let i = 0; i < subscribersLength; i += 1){
        this.subscribers[i](data);
      }

    },
    subscribe: function subscribe(handler){

      if(!this.subscribers){
        this.subscribers = [];
      }
      if(typeof handler !== 'function'){
        return;
      }

      this.subscribers.push(handler);
      return this;
    },
    unsubscribe: function unsubscribe(handler){

      let subscribersLength;

      if(!this.subscribers){
        this.subscribers = [];
      }
      if(typeof handler !== 'function'){
        return;
      }

      subscribersLength = this.subscribers.length;

      for(let i = 0; i < subscribersLength; i += 1){
        if(handler === subscribers[i]){
          this.subscribers.splice(i, 1);
          i -= 1;
        }
      }

      return self;
    }
  };

  function Person(name, age){
    let self = this;

    self.burthday = function(){
      age += 1;
      if(age === 18){
        self.publish("I can drink alcohol!");
      }
    }
  }

  Person.extend(Publisher);

  const person = new Person("Peter", 15);
  person.subscribe(function(data){
    console.log(data);
  });

  person.burthday();
  person.burthday();
  person.burthday();

});