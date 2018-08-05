var SlotMashine = SlotMashine || {};

(function(module){

  const Config = {
    '_options': {
      'elementsText': {
        'amount': '20.00',
        'bet': '00.05'
      },
      'monneyValues': {
        'amount': 2000,
        'bet': 5
      },
      'bets': {
        'all': [
          5, 10, 20, 40, 80, 160, 200, 400, 800, 1600, 2000
        ],
        'current_bet_index': 0
      },
      'koeficients': {
        'all': {
          '1': 0.4,
          '2': 0.6,
          '3': 0.8,
          '4': 1,
          '5': 1.2,
          '6': 1.4
        },
        'current': 0
      },
      'timeControll': {
        'animateOnButtonClick': 200,
        'rotateNextColumn': 200,
        'spinWiningImages': 1800,
        'displayFreshCash': 1800,
        'autoPlayStart': 6000,
        'sumOfAllAnimationsPerSpin': 5000,
        'movementDown': 130,
        'afterSpining': 10000,
        'forOneFullSpinPerRell': 5,
        'delayBetweenRellsSpins': 200
      },
      'grid': {
        'colsNumber': 5,
        'rowsNumber': 5,
        'rows': {
          'first': [],
          'second': [],
          'third': []
        },
        'ids': {
          'first': [],
          'second': [],
          'third': []
        },
        'winingIds': [],
        'lastAnimatedElementId': 'row-1-col-5'
      },
      'spiningAnimationsIterations': 20,
      'autoPlayOn': false,
      'incoming_cash': 0,
      'screenHeigth': 400,
      'keyFrameStart': '-100',
      'keyFrameEnd': '-400',
      'translateZ': 0
    },
    '_settings': {
      'elements': {
        'bet': 'bet',
        'betUp': 'bet-up',
        'betDown': 'bet-down',
        'spin': 'spin',
        'amount': 'amount',
        'maxBet': 'max-bet',
        'minBet': 'min-bet',
        'autoPlay': 'auto-play',
        'speed': 'speed',
        'stoppers': {
          'aboveFirstRow': 'stopper1',
          'firstRow': 'stopper2',
          'secondRow': 'stopper3',
          'thirdRow': 'stopper4',
          'bottom': 'stopper5'
        }
      },
      'rells': 5,
      'imagesPerRell': 36,
      'perspectiveOrigins': ["250%", "150%", "50%", "-50%", "-150%"],
      'rellsZIndexes': [10, 20, 50, 40, 30]
    },
    'options': options,
    'settings': settings,
    '__console': __console
  };

  function _isObject(param){
    if(param instanceof Object){
      return true;
    }
    return false;
  }

  function _isArray(param){
    if(param instanceof Array){
      return true;
    }
    return false; 
  }

  function _isUndefined(param){
    if(param === undefined){
      return true;
    }
    return false;
  }

  function _replace(params){
    let types = [];
    for(let option in params){
      if(_isUndefined(Config._options[option])){
        throw new Error(`Option: "${option}" do not exist!`);
      }
      if(_isObject(Config._options[option]) && !_isObject(params[option])){
        for(let o in Config._options[option]){
          types.push(typeof Config._options[option][o]);
        }
        if(Object.keys(Config._options[option]).length > 1){
          types = types.join(', ').replace(/,(?=[^,]*$)/, ' and');
        }
        throw new Error(`Option: "${option}" must be a object that contains ${types}!`);
      }
      if(_isObject(Config._options[option])){
        _replaceObject(Config._options[option], params[option]);
      }else{
        _replaceValue(Config._options, params, option);
      }
    }
  }

  function _replaceValue(older, newest, option){
    if(typeof older[option] !== typeof newest[option]){
      const typeOld = typeof older[option];
      const typeNew = typeof newest[option];
      throw new Error(`2Option: "${option}" must be a object that contains ${typeOld}! ${typeNew} was given`);
    }
    older[option] = _isUndefined(newest[option]) ? older[option] : newest[option];
  }

  function _replaceObject(older, newest){
    let typeOfOlderOption, typeOfNewestOption;
    for(let option in newest){
      if(_isUndefined(older[option])){
        throw new Error(`Option: "${option}" do not exist!`);
      }
      if(!_isArray(older[option]) && _isArray(newest[option])){
        typeOfOlderOption = typeof older[option];
        throw new Error(`Option: "${option}" must be a ${typeOfOlderOption}! Array was given!`);
      }
      if(_isArray(older[option]) && !_isArray(newest[option])){
        typeOfNewestOption = typeof newest[option];
        throw new Error(`Option: "${option}" must be a Array! ${typeOfNewestOption} was given!`);
      }
      if(typeof older[option] !== typeof newest[option]){
        typeOfOlderOption = typeof older[option];
        typeOfNewestOption = typeof newest[option];
        throw new Error(`Option: "${option}" must be a ${typeOfOlderOption}! ${typeOfNewestOption} was given!`);
      }
      if(_isObject(older[option])){
        _replaceObject(older[option], newest[option]);
      }else{
        _replaceValue(older, newest, option);
      }
    }
  }

  function options(newOptions = null){
    const type = typeof newOptions;
    if(!_isObject(newOptions) && newOptions !== null){
      throw new Error(`SlotMashine.options() expect object! ${type} was given!`);
    }

    if(newOptions === null){
      return Config._options;
    }else{
      _replace(newOptions);
    }
    return Config;
  }

  function settings(){
    return Config._settings;
  }

  function __console(){
    console.log(Config._options);
    return Config;
  }

  module.config = Config;

})(SlotMashine);