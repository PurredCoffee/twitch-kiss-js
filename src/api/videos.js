//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Videos"]} api
 */
module.exports = (twitchBot, api) => ({
    getVideos() {
        return api.getVideos();
    },
    deleteVideos() {
        return api.deleteVideos();
    }
})