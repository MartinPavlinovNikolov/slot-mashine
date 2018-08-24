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

Matrix.subtract = function(A, B){
    
  let result = new Matrix(A.rows, A.cols);

  for(let i = 0; i < result.rows; i++){
    for(let j = 0; j < result.cols; j++){
      result.data[i][j] = A.data[i][j] - B.data[i][j];
    }
  }

  return result;
}

Matrix.prototype.toArray = function(){
  let array = [];
  for(let i = 0; i < this.rows; i++){
    for(let j = 0; j < this.cols; j++){
      array.push(this.data[i][j]);
    }
  }
  return array;
}

Matrix.fromArray = function(array){
  let m = new Matrix(array.length, 1);
  for(let i = 0; i < array.length; i++){
    m.data[i][0] = array[i];
  }
  return m;
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

Matrix.map = function(matrix, func){
  let result = new Matrix(matrix.rows, matrix.cols);
  for(let i = 0; i < matrix.rows; i++){
    for(let j = 0; j < matrix.cols; j++){
      let value = matrix.data[i][j];
      result.data[i][j] = func(value, i, j);
    }
  }

  return result;
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

Matrix.transpose = function(matrix){
  
  const result = new Matrix(matrix.cols, matrix.rows);

  for(let i = 0; i < matrix.rows; i++){
    for(let j = 0; j < matrix.cols; j++){
      result.data[j][i] = matrix.data[i][j];
    }
  }

  return result;
}