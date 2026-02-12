//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["EventSub"]} api
 */
module.exports = (twitchBot, api) => ({
    createEventSubSubscription() {
        return api.createEventSubSubscription();
    },
    deleteEventSubSubscription() {
        return api.deleteEventSubSubscription();
    },
    getEventSubSubscriptions() {
        return api.getEventSubSubscriptions();
    }
})