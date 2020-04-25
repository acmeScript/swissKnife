import metatests from 'metatests';
import lib from '../lib/main';

metatests.test('Колличество экспортированных модулей', test => {
    test.strictSame(Object.keys(lib).length, 10);
    test.end();
});
metatests.test('Колличество типов экспортированных библиотек', test => {
    for(const key in lib){
        const fn = lib[key];
        test.strictSame(typeof fn, 'function');
    }
    test.end(); 
});
