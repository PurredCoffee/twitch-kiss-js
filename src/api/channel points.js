//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["ChannelPoints"]} api
 */
module.exports = (twitchBot, api) => ({
    createCustomRewards() {
        return api.createCustomRewards();
    },
    deleteCustomReward() {
        return api.deleteCustomReward();
    },
    getCustomReward() {
        return api.getCustomReward();
    },
    getCustomRewardRedemption() {
        return api.getCustomRewardRedemption();
    },
    updateCustomReward() {
        return api.updateCustomReward();
    },
    updateRedemptionStatus() {
        return api.updateRedemptionStatus();
    }
})