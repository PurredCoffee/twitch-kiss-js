
/**
 * @typedef {`${string}-${string}-${string}-${string}-${string}`} UUID
 */

/**
 * @type {() => UUID}
 */
//@ts-expect-error
const getID = (process.isBun) ? Bun.randomUUIDv7 : require('crypto').randomUUID;

module.exports = {
    getID
}