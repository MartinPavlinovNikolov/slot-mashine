function Matrix(rows, cols){

  this.data = [];
  this.rows = rows;
  this.cols = cols;

  for(let i = 0; i < this.rows; i++){
    this.data[i] = [];
    for(let j = 0; j < this.cols; j++){
      this.data[i][j] = 0;
    }
  }

  return this;
}

function rand(from, to){
  const r = Math.floor(Math.random()*(1+to-from))+from;
  return r;
}

Matrix.multiply = function(a, b){
    
  if(a.cols !== b.rows){
    throw new Error('Columns of data A must match the number of rows in data B!')
  }

  const result = new Matrix(a.rows, b.cols);
  let sum;

  for(let i = 0; i < result.rows; i++){
    for(let j = 0; j < result.cols; j++){
      sum = 0;
      for(let k = 0; k < a.cols; k++){
        sum += a.data[i][k] * b.data[k][j];
      }
      result.data[i][j] = sum;
    }
  }

  return result;
}

Matrix.prototype.multiply = function(multiplyer){
  for(let i = 0; i < this.rows; i++){
    for(let j = 0; j < this.cols; j++){
      this.data[i][j] *= multiplyer;
    }
  }

  return this;
}

Matrix.prototype.map = function(func){
  for(let i = 0; i < this.rows; i++){
    for(let j = 0; j < this.cols; j++){
      let value = this.data[i][j];
      this.data[i][j] = func(value, i, j);
    }
  }

  return this;
}

Matrix.prototype.add = function(adder){

  if(adder instanceof Matrix){
    
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.data[i][j] += adder.data[i][j];
      }
    }

  }else{
    
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.data[i][j] += adder;
      }
    }

  }

  return this;
}

Matrix.prototype.randomize = function(from, to){
  for(let i = 0; i < this.rows; i++){
    for(let j = 0; j < this.cols; j++){
      this.data[i][j] = rand(from, to);
    }
  }

  return this;
}

Matrix.prototype.transpose = function(){
  
  const result = new Matrix(this.cols, this.rows);

  for(let i = 0; i < this.rows; i++){
    for(let j = 0; j < this.cols; j++){
      result.data[j][i] = this.data[i][j];
    }
  }

  return result;
}