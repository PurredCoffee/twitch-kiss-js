//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["GuestStar"]} api
 */
module.exports = (twitchBot, api) => ({
    getChannelGuestStarSettings() {
        return api.getChannelGuestStarSettings();
    },
    updateChannelGuestStarSettings() {
        return api.updateChannelGuestStarSettings();
    },
    getGuestStarSession() {
        return api.getGuestStarSession();
    },
    createGuestStarSession() {
        return api.createGuestStarSession();
    },
    endGuestStarSession() {
        return api.endGuestStarSession();
    },
    getGuestStarInvites() {
        return api.getGuestStarInvites();
    },
    sendGuestStarInvite() {
        return api.sendGuestStarInvite();
    },
    deleteGuestStarInvite() {
        return api.deleteGuestStarInvite();
    },
    assignGuestStarSlot() {
        return api.assignGuestStarSlot();
    },
    updateGuestStarSlot() {
        return api.updateGuestStarSlot();
    },
    deleteGuestStarSlot() {
        return api.deleteGuestStarSlot();
    },
    updateGuestStarSlotSettings() {
        return api.updateGuestStarSlotSettings();
    }
})