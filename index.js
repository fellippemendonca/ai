'use strict';

const World = require('./world/World');
const Body = require('./world/Body');
const Ai = require('./ai/Ai');


let world = new World(20, 15);
let body = new Body(world);
let ai = new Ai(body);


//let user2 = new User(world);
//let ai2 = new Ai(user2);



world.generateArea();
world.generateObstacles(300);

world.plot(2,11, 'X')




body.plot(10,8) 
//user2.plot(20,20) 

ai.awake();
//ai2.awake();


//
//setInterval(() => { console.log(user.move('up')) }, 300);

//setInterval(() => { world.moveUser('left') }, 1000);
//setInterval(() => { world.moveUser('down') }, 1000);



world.draw();
