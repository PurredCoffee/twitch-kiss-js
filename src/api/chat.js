//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Chat"]} api
 */
module.exports = (twitchBot, api) => ({
    getChatters() {
        return api.getChatters();
    },
    getChannelEmotes() {
        return api.getChannelEmotes();
    },
    getGlobalEmotes() {
        return api.getGlobalEmotes();
    },
    getEmoteSets() {
        return api.getEmoteSets();
    },
    getChannelChatBadges() {
        return api.getChannelChatBadges();
    },
    getGlobalChatBadges() {
        return api.getGlobalChatBadges();
    },
    getChatSettings() {
        return api.getChatSettings();
    },
    getSharedChatSession() {
        return api.getSharedChatSession();
    },
    getUserEmotes() {
        return api.getUserEmotes();
    },
    updateChatSettings() {
        return api.updateChatSettings();
    },
    sendChatAnnouncement() {
        return api.sendChatAnnouncement();
    },
    sendAShoutout() {
        return api.sendAShoutout();
    },
    sendChatMessage() {
        return api.sendChatMessage();
    },
    getUserChatColor() {
        return api.getUserChatColor();
    },
    updateUserChatColor() {
        return api.updateUserChatColor();
    }
})