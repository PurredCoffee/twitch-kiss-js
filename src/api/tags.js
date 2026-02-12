//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Tags"]} api
 */
module.exports = (twitchBot, api) => ({
    getAllStreamTags() {
        return api.getAllStreamTags();
    },
    getStreamTags() {
        return api.getStreamTags();
    }
})