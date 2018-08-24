function NeuralNetwork(numberOfInputs, numberOfHidden, numberOfOutputs){

  this.inputNodes = numberOfInputs;
  this.hiddenNodes = numberOfHidden;
  this.outputNodes = numberOfOutputs;

  this.weights_between_input_and_hidden = new Matrix(this.hiddenNodes, this.inputNodes);
  this.weights_between_hidden_and_output = new Matrix(this.outputNodes, this.hiddenNodes);
  this.weights_between_input_and_hidden.randomize(-1, 1);
  this.weights_between_hidden_and_output.randomize(-1, 1);

  this.bias_hidden = new Matrix(this.hiddenNodes, 1);
  this.bias_output = new Matrix(this.outputNodes, 1);
  this.bias_hidden.randomize(-1, 1);
  this.bias_output.randomize(-1, 1);

  this.learning_rate = 0.001;
}

function sigmoid(x){
  return 1 / (1 + Math.exp(-x));
}

function derivativeOfSigmoid(y){
  return y * (1 - y);
}

NeuralNetwork.prototype.feedForward = function(input_array){

  //Generating the hidden outputs
  let inputs = Matrix.fromArray(input_array);
  let hidden = Matrix.multiply(this.weights_between_input_and_hidden, inputs);
  hidden.add(this.bias_hidden);

  //activation function
  hidden.map(sigmoid);

  //Generating the output
  let output = Matrix.multiply(this.weights_between_hidden_and_output, hidden);
  output.add(this.bias_output);
  output.map(sigmoid);

  //Sending back to the caller
  return output.toArray();
}

NeuralNetwork.prototype.train = function(input_array, target_array){
  
  //Generating the hidden outputs
  let inputs = Matrix.fromArray(input_array);
  let hidden = Matrix.multiply(this.weights_between_input_and_hidden, inputs);
  hidden.add(this.bias_hidden);

  //activation function
  hidden.map(sigmoid);

  //Generating the output
  let outputs = Matrix.multiply(this.weights_between_hidden_and_output, hidden);
  outputs.add(this.bias_output);
  outputs.map(sigmoid);

  //Convert array to Matrix object
  let targets = Matrix.fromArray(target_array);

  //Calculate the error
  //ERROR = TARGETS - OUTPUTS
  let output_errors = Matrix.subtract(targets, outputs);

  //Calculate gradient
  let gradients = Matrix.map(outputs, derivativeOfSigmoid);
  gradients.multiply(output_errors);
  gradients.multiply(this.learning_rate);

  //Calculate deltas
  let hidden_transpose = Matrix.transpose(hidden);
  let weights_between_hidden_and_output_deltas = Matrix.multiply(gradients, hidden_transpose);

  //Adjust the weights by deltas
  this.weights_between_hidden_and_output.add(weights_between_hidden_and_output_deltas);
  //Adjust the bias by its deltas (witch is just the gradients)
  this.bias_output.add(gradients);

  //Calculate the hidden layer errors
  let weights_between_hidden_and_output_transposed = Matrix.transpose(this.weights_between_hidden_and_output);
  let hidden_errors = Matrix.multiply(weights_between_hidden_and_output_transposed, output_errors);

  //Calculate the hidden gradient
  let hidden_gradient = Matrix.map(hidden, derivativeOfSigmoid);
  hidden_gradient.multiply(hidden_errors);
  hidden_gradient.multiply(this.learning_rate);

  //Calculate input to hidden deltas
  let inputs_transpose = Matrix.transpose(inputs);
  let weight_input_hidden_deltas = Matrix.multiply(hidden_gradient, inputs_transpose);
  this.weights_between_input_and_hidden.add(weight_input_hidden_deltas)

  //Adjust the bias by its deltas (witch is just the gradients)
  this.bias_hidden.add(hidden_gradient);

}

let traning_data = [
  {
    inputs: [0],
    targets: [0]
  },
  {
    inputs: [1],
    targets: [1]
  },
];

let nn = new NeuralNetwork(1, 2, 1);
for(let i; i < 1000000; i++){
  let r = rand(0, 1);
  let data = traning_data[1];
  nn.train(data.inputs, data.targets);
}

console.log(nn.feedForward([0]));
console.log(nn.feedForward([0]));
console.log(nn.feedForward([0]));
console.log(nn.feedForward([1]));