'use strict';

const metatests = require('metatests');
const lib = require('../lib/main.js') //../lib

metatests.test("Методы модулей", test => {
    test.strictSame(lib.method11(),11);
    test.strictSame(lib.method22(),22);
    test.strictSame(lib.method33(),33);
    test.strictSame(lib.method44(),44);
    test.strictSame(lib.method55(),55);
    test.strictSame(lib.method66(),66);
    test.end();
}); 