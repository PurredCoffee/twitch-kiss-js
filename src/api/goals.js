//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Goals"]} api
 */
module.exports = (twitchBot, api) => ({
    getCreatorGoals() {
        return api.getCreatorGoals();
    }
})