//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Search"]} api
 */
module.exports = (twitchBot, api) => ({
    searchCategories() {
        return api.searchCategories();
    },
    searchChannels() {
        return api.searchChannels();
    }
})