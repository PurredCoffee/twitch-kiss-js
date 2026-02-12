//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Streams"]} api
 */
module.exports = (twitchBot, api) => ({
    getStreamKey() {
        return api.getStreamKey();
    },
    getStreams() {
        return api.getStreams();
    },
    getFollowedStreams() {
        return api.getFollowedStreams();
    },
    createStreamMarker() {
        return api.createStreamMarker();
    },
    getStreamMarkers() {
        return api.getStreamMarkers();
    }
})