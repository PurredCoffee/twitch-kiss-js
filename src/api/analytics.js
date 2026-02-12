//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Analytics"]} api
 */
module.exports = (twitchBot, api) => ({
    getExtensionAnalytics() {
        return api.getExtensionAnalytics();
    },
    getGameAnalytics() {
        return api.getGameAnalytics();
    }
})