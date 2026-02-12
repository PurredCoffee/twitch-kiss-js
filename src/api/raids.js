//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Raids"]} api
 */
module.exports = (twitchBot, api) => ({
    startARaid() {
        return api.startARaid();
    },
    cancelARaid() {
        return api.cancelARaid();
    }
})