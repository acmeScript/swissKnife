import metatests from 'metatests';
import lib from '../lib/main';

metatests.test("Методы модулей", test => {
    test.strictSame(lib.invokeNumberRange(lib.isNumber,lib.max,10,20),20);
    test.strictSame(lib.method33(),33);
    test.strictSame(lib.method44(),44);
    test.strictSame(lib.method55(),55);
    test.strictSame(lib.method66(),66);
    test.end();
}); 