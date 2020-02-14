const { wrapFunction } = require('./wrapFunction');

const cloneInterface = interfaces => {
    const clone = {};
    for(const key in interfaces){
        const fn = interfaces[key];
        clone[key] = wrapFunction(key, fn);
    }
    return clone;
};

module.exports = {
    cloneInterface: cloneInterface
};