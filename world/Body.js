'use strict';

module.exports = Body;

function Body(world) {
  this.world = world;
  this.position = {
    d: 0,
    x: 10,
    y: 10
  };
  this.sense = '';
}

Body.prototype.move = function (direction) {
  
  let self = this;

  let x;
  let y;

  switch(direction) {
    case 'north': x = self.position.x - 1; y = self.position.y; break;
    case 'south': x = self.position.x + 1; y = self.position.y; break;
    case 'east': y = self.position.y + 1; x = self.position.x; break;
    case 'west': y = self.position.y - 1; x = self.position.x; break;
    default : false;
  }
   
  let result = self.world.try(x, y);
  
  if (result > -1) {
    self.world.plot(self.position.x, self.position.y, ' ');
    self.plot(x, y);
  }

  return result;
  
}

Body.prototype.plot = function (x, y) {
  
  let self = this;
  
  self.position.x = x;
  self.position.y = y;

  self.sense = self.tact(1);

  return self.world.plot(x, y, '@');
}


Body.prototype.view = function (field) {
  
  let self = this;

  let image = '';

  let max = field+field;

  let initX = self.position.x - field;
  let initY = self.position.y - field;

  for (let i = 0; i <= max; i++) {
    for (let j = 0; j <= max; j++) {
      image = image + self.world.matrix[i+initX][j+initY];
    }
  }

  return image;


}

Body.prototype.tact = function (field) {

  let self = this;

  let image = '';

  let max = field+field;

  let initX = self.position.x - field;
  let initY = self.position.y - field;

  for (let i = 0; i <= max; i++) {
    for (let j = 0; j <= max; j++) {
      image = image + self.world.matrix[i+initX][j+initY];
    }
  }

  return image;


}
