//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["HypeTrain"]} api
 */
module.exports = (twitchBot, api) => ({
    getHypeTrainStatus() {
        return api.getHypeTrainStatus();
    }
})