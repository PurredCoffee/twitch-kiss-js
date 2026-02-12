//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Charity"]} api
 */
module.exports = (twitchBot, api) => ({
    getCharityCampaign() {
        return api.getCharityCampaign();
    },
    getCharityCampaignDonations() {
        return api.getCharityCampaignDonations();
    }
})