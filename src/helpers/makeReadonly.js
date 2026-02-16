/**
 * 
 * @param {T} obj
 * @returns {{readonly [x in keyof ReturnType<T>]: ReturnType<T>[x]}}
 * @template {() => {}} T 
 */
module.exports = (obj) => {
    try {
        const x = {};
        Object.defineProperties(
            x, 
            Object.entries(Object.getOwnPropertyDescriptors(obj)).map(([name, value]) => {
                value.writable = false;
                if(typeof value.value == 'object' && value.value) {
                    value.value = mkr(value.value);
                }
                return [name, value];
            }).reduce((p, c) => {p[c[0]] = c[1]; return p}, {})
        );
        return x;
    } catch(e) {
        throw TypeError('Twitch data malformed! Please report this bug! ' + JSON.stringify(v));
    }
}