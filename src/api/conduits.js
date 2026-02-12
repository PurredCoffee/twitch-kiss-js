//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Conduits"]} api
 */
module.exports = (twitchBot, api) => ({
    getConduits() {
        return api.getConduits();
    },
    createConduits() {
        return api.createConduits();
    },
    updateConduits() {
        return api.updateConduits();
    },
    deleteConduit() {
        return api.deleteConduit();
    },
    getConduitShards() {
        return api.getConduitShards();
    },
    updateConduitShards() {
        return api.updateConduitShards();
    }
})