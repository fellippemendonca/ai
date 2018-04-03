'use strict';

const random = require('../lib/random');

module.exports = Ai;

function Ai(user) {
  this.clock = 500;
  this.user = user;
  this.memory = {
    amigdala: random,
    current: [''],
    possible: {},
    success: {},
    failure: {}
  };
  this.actions = [ 'north', 'south', 'west', 'east' ];
}


Ai.prototype.process = function (type) {
  
  let self = this;

  let actions = [];

  for( let idx in self.memory[type]) {
    self.user.sense === self.memory[type][idx].sense ? actions.push(self.memory[type][idx].action) : false;
  }

  return actions;
}



Ai.prototype.think = function (saw) {
  
  let self = this;

  let conclusion

  let successMoves = discardElements(self.process('success'), [`${self.memory.current[0].action}`]) ;
  let failureMoves = self.process('failure');

  if (successMoves.length > 0) {
    conclusion = successMoves;

  } else if (failureMoves.length > 0) {
    conclusion = discardElements(self.actions, failureMoves);

  } else {
    conclusion = self.actions;
  }

  return conclusion[random(0,conclusion.length)];

}


Ai.prototype.memorize = function (step) {

  let self = this;
 
  let date = new Date();
  let time = date.getTime();
  let memoryKey = self.user.sense+step.action;

  
  self.memory.current.push(step);
  self.memory.current.length > 20 ? self.memory.current.shift() : false;


  if (step.result > 0) {
    self.memory.success[memoryKey] = step;
  } else if (step.result == 0) {
    // to be defined
  } else {
    self.memory.failure[memoryKey] = step;
  }

}


Ai.prototype.act = function (action) {  

  let self = this;

  let result = {
    sense: self.user.sense,
    action: action,
    result: self.user.move(action)
  };

  //if ();
  
  return result;
  
}


Ai.prototype.awake = function () {
  
  let self = this;

  let saw, thought, effect, memory;

  setInterval(() => {

    saw = self.user.sense;
    thought = self.think(saw);
    effect = self.act(thought);
    memory = self.memorize(effect);
  
    //self.memorize(self.act(self.think()));
    console.log(`thought: ${thought}, effect: ${effect.result}, memory: ${memory}`);
    console.log(self.memory.current);
    console.log(`success: ${Object.keys(self.memory.success).length}` );
    console.log(`failure: ${Object.keys(self.memory.failure).length}` );

    //console.log(self.memory.current[0].action)

    //console.log(self.memory.success );


  }, self.clock);
}

function discardElements(list, elements) { //console.log(elements, list);
  let newList = [];
  for(let i = 0; i < list.length; i++) {
    if(elements.indexOf(list[i]) === -1) {
      newList.push(list[i]);
    }
  }
  return newList;
}
