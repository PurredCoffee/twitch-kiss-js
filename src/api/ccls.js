//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["CCLs"]} api
 */
module.exports = (twitchBot, api) => ({
    getContentClassificationLabels() {
        return api.getContentClassificationLabels();
    }
})