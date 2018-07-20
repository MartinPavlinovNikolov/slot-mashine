const TimeMaster = {
  'wasCliked': 200,
  'spin': 200,
  'linghtWiningImages': 1800,
  'displayFreshCash': 1800,
  'start': 6000,
  'animate_spining': 4450,
  'iterations': 20,
  'speedUp': (function(){
    this.spin = 40;
    this.linghtWiningImages = 800;
    this.displayFreshCash = 800;
    this.start = 3000;
    this.animate_spining = 1850;
    this.iterations = 8;
  }),
  'slowDown': (function(){
    this.spin = 200;
    this.linghtWiningImages = 1800;
    this.displayFreshCash = 1800;
    this.start = 6000;
    this.animate_spining = 4450;
    this.iterations = 20;
  })
};