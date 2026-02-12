//@ts-check
/**
 * 
 * @param {TemplateStringsArray} strings 
 * @param  {...any} params 
 * @returns {string};
 */
function url(strings, ...params) {
    console.log(strings, ...params);
    let stringarr = [...strings];
    let outstr = stringarr.shift() ?? "";
    while(params.length) {
        if(outstr?.includes('?')) {
            outstr += encodeURIComponent(params.shift()) + stringarr.shift();
        } else {
            outstr += encodeURI(params.shift()) + stringarr.shift();
        }
    }
    return outstr;
}

module.exports = {
    url
}