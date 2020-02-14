'use strict';

const metatests = require('metatests');
const lib = require('../lib/main.js') //../lib

metatests.test('Колличество экспортированных модулей', test => {
    test.strictSame(Object.keys(lib).length, 9);
    test.end();
});
metatests.test('Колличество типов экспортированных библиотек', test => {
    for(const key in lib){
        const fn = lib[key];
        test.strictSame(typeof fn, 'function');
    }
    test.end(); 
});