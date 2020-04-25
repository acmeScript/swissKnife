export const invokeNumberRange = (validate, fn, a, b, callback) => {
    const result = fn(validate, a, b);
    return result;
};

export const max = (validate, a, b) => {
    let valid = true;
    const rejected = (err, res) => {
        valid = valid && res;
    };
    validate(a,rejected);
    validate(b,rejected);
    if(!valid) throw new TypeError('Type error');
    return Math.max(a,b);
};
export const isNumber = (value,callback) => {
    if(typeof value === 'number') {
        callback(null, () => {console.log("fine")});
    } else {
        callback(new Error('Not number'))
    }
};
export const isString = (value,callback) => {
    if(typeof value === 'string'){
        callback(null,  () => {console.log("fine")})
    } else {
        callback(new Error('Not string'));
    }
}
/*
invokeNumberRange(isNumber,max,10,30, (err,result)=>{
    if(err) {
        console.log(err.message);
        return;
    }
    console.log(result);
});
console.log(invRange)
*/

module.exports = {invokeNumberRange, isNumber, isString, max}
