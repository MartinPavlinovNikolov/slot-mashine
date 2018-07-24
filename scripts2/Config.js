const Config = {
  'options': {
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
      'displayFreshCash': 1800,
      'autoPlayStart': 6000,
      'sumOfAllAnimationsPerSpin': 5000
    },
    'spiningAnimationsIterations': 20,
    'autoPlayOn': false
  },
  'settings': {
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
    'incoming_cash': 0
  }
};