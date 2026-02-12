//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Subscriptions"]} api
 */
module.exports = (twitchBot, api) => ({
    getBroadcasterSubscriptions() {
        return api.getBroadcasterSubscriptions();
    },
    checkUserSubscription() {
        return api.checkUserSubscription();
    }
})