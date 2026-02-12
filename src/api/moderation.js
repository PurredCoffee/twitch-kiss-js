//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Moderation"]} api
 */
module.exports = (twitchBot, api) => ({
    checkAutoModStatus() {
        return api.checkAutoModStatus();
    },
    manageHeldAutoModMessages() {
        return api.manageHeldAutoModMessages();
    },
    getAutoModSettings() {
        return api.getAutoModSettings();
    },
    updateAutoModSettings() {
        return api.updateAutoModSettings();
    },
    getBannedUsers() {
        return api.getBannedUsers();
    },
    banUser() {
        return api.banUser();
    },
    unbanUser() {
        return api.unbanUser();
    },
    getUnbanRequests() {
        return api.getUnbanRequests();
    },
    resolveUnbanRequests() {
        return api.resolveUnbanRequests();
    },
    getBlockedTerms() {
        return api.getBlockedTerms();
    },
    addBlockedTerm() {
        return api.addBlockedTerm();
    },
    removeBlockedTerm() {
        return api.removeBlockedTerm();
    },
    deleteChatMessages() {
        return api.deleteChatMessages();
    },
    getModeratedChannels() {
        return api.getModeratedChannels();
    },
    getModerators() {
        return api.getModerators();
    },
    addChannelModerator() {
        return api.addChannelModerator();
    },
    removeChannelModerator() {
        return api.removeChannelModerator();
    },
    getVIPs() {
        return api.getVIPs();
    },
    addChannelVIP() {
        return api.addChannelVIP();
    },
    removeChannelVIP() {
        return api.removeChannelVIP();
    },
    updateShieldModeStatus() {
        return api.updateShieldModeStatus();
    },
    getShieldModeStatus() {
        return api.getShieldModeStatus();
    },
    warnChatUser() {
        return api.warnChatUser();
    },
    addSuspiciousStatusToChatUser() {
        return api.addSuspiciousStatusToChatUser();
    },
    removeSuspiciousStatusFromChatUser() {
        return api.removeSuspiciousStatusFromChatUser();
    }
})