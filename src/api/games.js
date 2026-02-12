//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Games"]} api
 */
module.exports = (twitchBot, api) => ({
    getTopGames() {
        return api.getTopGames();
    },
    getGames() {
        return api.getGames();
    }
})