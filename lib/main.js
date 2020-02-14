'use strict';
const lib = {};
['submodul1','submodul2','submodul3','cloneInterface','wrapFunction','sandbox'].forEach((name)=>{
    const sub = require(`./${name}.js`);
    Object.assign(lib, sub);
    console.log(sub)
})
console.log(Object.keys(lib).join(', '));
module.exports = lib;