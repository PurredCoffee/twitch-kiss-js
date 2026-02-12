//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Bits"]} api
 */
module.exports = (twitchBot, api) => ({
    getBitsLeaderboard() {
        return api.getBitsLeaderboard();
    },
    getCheermotes() {
        return api.getCheermotes();
    },
    getExtensionTransactions() {
        return api.getExtensionTransactions();
    }
})