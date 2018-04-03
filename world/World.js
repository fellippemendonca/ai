'use strict';

const random = require('../lib/random');


module.exports = World;

function World(hSize, vSize) {
  this.hSize = hSize;
  this.vSize = vSize;
  this.matrix;
}

World.prototype.try = function (x, y) {
  
  let self = this;

  let result = 0;
  switch (self.matrix[x][y]){
    case '#': result = -1; break;
    case 'X': result = -1; break;
    case '*': result = 1; break;
    default: result = 0;
  }
  self.draw();
  return result;

}


World.prototype.plot = function (x, y, value) {
  
  let self = this;
  
  if (self.try(x, y) > -1) {
    self.matrix[x][y] = value;
  }
  self.draw();
  

}


World.prototype.generateArea = function () {
  
  let self = this;

  self.matrix = [];
  
    for (let i = 0; i < self.vSize; i++) {
      self.matrix[i] = [];
      
      for (let j = 0; j < self.hSize; j++) {
        
        if (i === 0 || i === self.vSize-1 || j === 0 || j === self.hSize-1) {
          self.matrix[i][j] = '#';
        
        } else {
          self.matrix[i][j] = ' ';
        }
  
      }
  
    }
}

World.prototype.generateObstacles = function (number) {
  
  let self = this;

  
    for (let i = 0; i < self.vSize; i++) {
      
      for (let j = 0; j < self.hSize; j++) {

        if (number > 0 && random(1,5) == 1 ) {
          self.matrix[i][j] = '#';
          number--;
        }
  
      }
  
    }
}

World.prototype.draw = function () {

  let self = this;

  console.clear();
  for (let i = 0; i < self.matrix.length; i++) {
    let line = '';
    for (let j = 0; j < self.matrix[i].length; j++) {
      line += self.matrix[i][j];
    }
    console.log(line);
  }
}

