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
      'currentGame': '3X3',
      'games': {
        '3X3': {
          'koeficients': {
            'points': {
              'forThreeLines': 2,
              'forFourLines': 3,
              'forFiveLines': 4
            },
            'all': {
              '1': 0.2,
              '2': 0.4,
              '3': 0.6,
              '4': 0.8,
              '5': 1,
              '6': 1.2
            },
            'current': 1
          }
        },
        '3X5': {
          'koeficients': {
            'points': {
              'forThreeLines': 1,
              'forFourLines': 2,
              'forFiveLines': 3
            },
            'all': {
              '1': 0.2,
              '2': 0.4,
              '3': 0.6,
              '4': 0.8,
              '5': 1,
              '6': 1.2
            },
            'current': 1
          }
        }
      },
      'timeControll': {
        'animateOnButtonClick': 200,
        'forOneFullSpinPerRell': 3,
        'delayBetweenRellsSpins': 200,
        'delayForWiningImagesAnimationOnAutoPlay': 1500
      },
      'grid': {
        'cells': [[], [], []],
        'winingIds': [],
        'ids': []
      },
      'autoPlayOn': false,
      'incoming_cash': 0,
      'screenHeigth': 400,
      'keyFrameStart': '-100',
      'keyFrameEnd': '-400',
      'translateZ': 0,
      'rellsIsSpining': false
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
        'switch': 'switch'
      },
      'rells': 3,
      'imagesPerRell': 18,
      'game3X3': '3X3',
      'game3X5': '3X5'
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