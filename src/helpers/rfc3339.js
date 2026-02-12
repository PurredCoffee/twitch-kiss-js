//@ts-check

/**
 * 
 * @param {number} n 
 * @param {number} c
 * @returns {string} 
 */
function p(n, c) {
    return n.toString().padStart(c, '0');
}
/**
 * @typedef {string & {length: T}} StringOfLen
 * @template {number} T
 */

/**
 * **YYYY**-**MM**-**DD**T**hh**:**mm**:**ss**Z
 * @param {Date} date 
 * @returns {`${string}-${string}-${string}T${string}:${string}:${string}Z`}
 */
module.exports = (date) => {
    return `${p(date.getUTCFullYear(),4)}-${p(date.getUTCMonth(),2)}-${p(date.getUTCDate(),2)}T${p(date.getUTCHours(),2)}:${p(date.getUTCMinutes(),2)}:${p(date.getUTCSeconds(),2)}Z`;
}