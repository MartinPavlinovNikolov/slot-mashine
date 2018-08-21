var SlotMashine = SlotMashine || {};

(function(module){

  const Matrix = function(rows, cols){
    
    const matrix = {};

    for(let i = 0; i < rows; i++){
      for(let j = 0; j < cols; j++){
        matrix[i][j] = 0;
      } 
    }

    return matrix;
  }

  module.matrix = Matrix;
})(SlotMashine);