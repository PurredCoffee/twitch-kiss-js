//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Channels"]} api
 */
module.exports = (twitchBot, api) => ({
    getChannelInformation() {
        return api.getChannelInformation();
    },
    modifyChannelInformation() {
        return api.modifyChannelInformation();
    },
    getChannelEditors() {
        return api.getChannelEditors();
    },
    getFollowedChannels() {
        return api.getFollowedChannels();
    },
    getChannelFollowers() {
        return api.getChannelFollowers();
    }
})