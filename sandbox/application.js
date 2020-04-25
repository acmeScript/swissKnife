'use strict';
//const {lib} = require('./main.js');

//<<<<<<<<<<Dependency Locator list>>>>>>>>>>>>>>
const fs = require('fs');
const net = require('net');
console.dir(require.main, {depth: 0});
//<<<<<<<<<<----------------------->>>>>>>>>>>>>>
/*
console.log("<<<<<<<<<<<<level: 0 -------------------------------\n")
console.dir(this, {depth:0})
console.log("<<<<<<<<<<<<level: 0 end-------------------------------\n")
console.log("<<<<<<<<<<<<level: 1 global-------------------------------\n")
console.dir({global},{depth:0});
*/

console.log("<<<<<<<<<<<<level: 1 global end-------------------------------\n")
console.log("<<<<<<<level:1 fs----------------------------------\n")
console.dir({fs},{depth: 2});
console.log("<<<<<<<level:1 fs end-------------------------------\n")
console.log("<<<<<<<level:1 net----------------------------------\n")
console.dir({net},{depth: 2});
console.log("<<<<<<<level:1 net end-------------------------------\n")

//console.dir({api},{depth: 2});

module.exports = () => {
    api.fs.readFile('./README.md', (err, data) => {
        if(err){
            console.log(err.message);
        }
        api.console.log(data.toString());
    });
    api.timers.setTimeout((arg)=>{
        if(!arg){
            api.console.log('Обернутая функция без аргументов');
        } else {
            api.console.log('Обернутая функция c аргументами' + arg);
        }
    },5000);
    //setTimeout(()=>{console.log("Стандартная функция")},100)
    console.log("From lexical scope")
}