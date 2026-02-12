//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Teams"]} api
 */
module.exports = (twitchBot, api) => ({
    getChannelTeams() {
        return api.getChannelTeams();
    },
    getTeams() {
        return api.getTeams();
    }
})