let counter = 0;
const wrapFunction = (key, fn) => {
    counter++;
    console.log(`Обертка для Global Objects.${key} Под номером: ${counter}`);
    return (...args) => {
        console.log(`Called wrapper for ${key}`);
        console.dir({args});
        if(args.length > 0){
            let callback = args[args.length - 1];
            if(typeof callback === 'function'){
                args[args.length - 1] = (...args) => {
                    console.log(`Функция с аргументами:  ${key}`);
                    callback(...args);
                };
            } else {
                callback = null;
            }
        }
        console.log(`Вызов ${key}`);
        console.dir(args);
        const result = fn(...args);
        console.log(`Обертка для: ${key}`);
        console.log({result});
        return result;
    }
}
module.exports = {wrapFunction:wrapFunction}