//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Entitlements"]} api
 */
module.exports = (twitchBot, api) => ({
    getDropsEntitlements() {
        return api.getDropsEntitlements();
    },
    updateDropsEntitlements() {
        return api.updateDropsEntitlements();
    }
})