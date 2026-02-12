//@ts-check

/**
 * 
 * @param {any} proto 
 * @param {string} className 
 * @returns 
 */
function isInstance(proto, className) {
    do {
        if (proto && proto.constructor && proto.constructor.name === className)
            return true;
    } while (proto = Object.getPrototypeOf(proto));

    return false;
}

/**
 * 
 * @param  {...[any, string, 'bigint'|'boolean'|'function'|'number'|'object'|'string'|'symbol'|'undefined'|{constructor:{name:string}}|{name:string}]} args
 */
module.exports = (...args) => {
    args.forEach(arg => {
        if(typeof arg[2] === 'string') {
            if(typeof arg[0] !== arg[2]) throw TypeError(`${arg[1]} is not of type ${arg[2]}, it is instead ${typeof arg[0]}: ${arg[0]}`);
        } else {
            //@ts-ignore
            if(!isInstance(arg[0], arg[2].constructor?.name ?? arg[2].name)) throw TypeError(`${arg[1]} is not of type ${arg[2].constructor?.name ?? arg[2].name}, it is instead ${arg[0]?.constructor?.name}: ${arg[0]}`);
        }
    });
}