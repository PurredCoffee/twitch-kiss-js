//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Polls"]} api
 */
module.exports = (twitchBot, api) => ({
    getPolls() {
        return api.getPolls();
    },
    createPoll() {
        return api.createPoll();
    },
    endPoll() {
        return api.endPoll();
    }
})