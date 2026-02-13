
/**
 * check if color is correctly formatted
 * @param {string} color
 * @param {boolean} allowTransparency
 * @returns {`boolean`}
 */
module.exports = (color, allowTransparency) => {
    if(typeof color != 'string') return false;
    if(allowTransparency) return /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(color);
    return /^#[0-9A-Fa-f]{6}$/.test(color);
}